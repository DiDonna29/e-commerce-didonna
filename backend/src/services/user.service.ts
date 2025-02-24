import LoginUserDto from "../dtos/loginUser.dto";
import RegisterUserDto from "../dtos/registerUser.dto";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/user.repository";
import { ClientError } from "../utils/errors";
import {
  checkPasswordService,
  createCredentialService,
} from "./credential.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import { OrderRepository } from "../repositories/order.repository";
import { Order } from "../entities/Order";

export const checkUserExists = async (email: string): Promise<boolean> => {
  const user = await UserRepository.findOneBy({ email });
  return !!user;
};

export const registerUserService = async (
  registerUserDto: RegisterUserDto
): Promise<User> => {
  const user = await UserRepository.create(registerUserDto);
  await UserRepository.save(user);
  const credential = await createCredentialService({
    password: registerUserDto.password,
  });
  user.credential = credential;
  await UserRepository.save(user);
  return user;
};

export const loginUserService = async (
  loginUserDto: LoginUserDto
): Promise<{ token: string; user: User }> => {
  const user: User | null = await UserRepository.findOne({
    where: {
      email: loginUserDto.email,
    },
    relations: ["credential", "orders"],
  });
  if (!user) throw new Error("User not found");
  if (
    await checkPasswordService(loginUserDto.password, user.credential.password)
  ) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return {
      user,
      token,
    };
  } else {
    throw new ClientError("Invalid password");
  }
};

export const getUserOrdersService = async (
  userId: number
): Promise<Order[]> => {
  const orders = await OrderRepository.find({
    relations: ["products"], // Incluir los productos relacionados
    where: { user: { id: userId } }, // Filtrar por el ID del usuario
  });

  return orders;
};

export const getUserOrderByIdService = async (
  userId: number,
  orderId: number
): Promise<Order> => {
  const order = await OrderRepository.findOne({
    relations: ["products"], // Incluir los productos relacionados
    where: { id: orderId, user: { id: userId } }, // Filtrar por orderId y userId
  });

  if (!order) {
    throw new ClientError("Order not found or does not belong to the user");
  }

  return order;
};