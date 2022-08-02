import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  res.setHeader("my-header", "123");
  res.status(200).send("test2");
};
