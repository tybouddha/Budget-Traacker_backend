import request from "supertest";
import express, { Express } from "express";
import mongoose from "mongoose";
import usersRouter from "../../routes/users";
import User from "../../models/user";
import dotenv from "dotenv";
import {
  connectTestDB,
  disconnectTestDB,
  clearTestDB,
} from "../../models/connection.test";
dotenv.config();
import {
  describe,
  expect,
  it,
  beforeAll,
  afterAll,
  beforeEach,
} from "@jest/globals";
import { Request, Response, NextFunction } from "express";

const app: Express = express();
app.use(express.json());
app.use("/users", usersRouter);

describe("Users Routes", () => {
  beforeAll(async () => {
    // Augmentation du timeout à 30 secondes
    jest.setTimeout(30000);
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  describe("POST /users/signup", () => {
    it("devrait créer un nouvel utilisateur avec des données valides", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      const response = await request(app).post("/users/signup").send(userData);

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(true);
      expect(response.body.username).toBe(userData.username);
      expect(response.body.email).toBe(userData.email);
      expect(response.body.token).toBeDefined();
      expect(response.body.message).toBe("Compte enregistré avec succès");
    });

    it("devrait refuser la création avec un email invalide", async () => {
      const userData = {
        username: "testuser",
        email: "invalid-email",
        password: "password123",
      };

      const response = await request(app).post("/users/signup").send(userData);

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(false);
      expect(response.body.error).toBe("Format d'email invalide.");
    });

    it("devrait refuser la création avec des champs manquants", async () => {
      const userData = {
        username: "testuser",
        // email manquant
        password: "password123",
      };

      const response = await request(app).post("/users/signup").send(userData);

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(false);
      expect(response.body.error).toBe("Champs manquant ou mal renseigné");
    });

    it("devrait refuser la création d'un utilisateur déjà existant", async () => {
      // Créer d'abord un utilisateur
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      await request(app).post("/users/signup").send(userData);

      // Essayer de créer le même utilisateur
      const response = await request(app).post("/users/signup").send(userData);

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(false);
      expect(response.body.error).toBe("Utilisateur existe déjà!");
    });
  });
});
