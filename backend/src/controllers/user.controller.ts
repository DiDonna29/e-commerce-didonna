import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  getUserOrderByIdService,
  getUserOrdersService,
  loginUserService,
  registerUserService,
} from "../services/user.service";

export const registerUser = catchedController(
  async (req: Request, res: Response) => {
    const { email, password, name, address, phone } = req.body;
    const newUser = await registerUserService({
      email,
      password,
      name,
      address,
      phone,
    });
    res.status(201).send(newUser);
  }
);

export const login = catchedController(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password });
  res.status(200).send({
    login: true,
    user: user.user,
    token: user.token,
  });
});

export const getUserOrders = catchedController(
  async (req: Request, res: Response) => {
    const { userId } = req.body; // userId se obtiene del middleware checkLogin
    const orders = await getUserOrdersService(userId);
    res.status(200).send(orders);
  }
);

export const getUserOrderById = catchedController(
  async (req: Request, res: Response) => {
    const { userId } = req.body; // userId se obtiene del middleware checkLogin
    const { orderId } = req.params; // orderId se obtiene de los parámetros de la ruta
    const order = await getUserOrderByIdService(userId, Number(orderId));
    res.status(200).send(order);
  }
);