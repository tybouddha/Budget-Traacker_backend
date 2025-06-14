import { Request, Response, NextFunction } from "express";

type FunctionType = (req: Request, res: Response, next: NextFunction) => any;

export default FunctionType;
