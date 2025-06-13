import { Request, Response, NextFunction } from "Express";

type FunctionType = (req: Request, res: Response, next: NextFunction) => any;

export default FunctionType;
