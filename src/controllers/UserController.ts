import { Request, Response } from 'express';
import { AppDataSource } from "../index"
import { User } from '../entity/User';

export const getUsers = async (req: Request, res: Response) => {
  const users = await AppDataSource.manager.find(User);
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await  AppDataSource.manager.findOneBy(User,{id:parseInt(req.params.id)});
  res.json(user);
};

