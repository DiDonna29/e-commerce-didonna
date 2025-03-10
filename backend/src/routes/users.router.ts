import { Request, Response, Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateUserLogin from "../middlewares/userLogin.middleware";
import { getUserOrderById, getUserOrders, login, registerUser } from "../controllers/user.controller";
import checkLogin from "../middlewares/checkLogin.middleware";
import { OrderRepository } from "../repositories/order.repository";

const usersRouter = Router();

usersRouter.post("/register", validateUserRegister, registerUser);

usersRouter.post("/login", validateUserLogin, login);

// usersRouter.get("/orders", checkLogin, async (req: Request, res: Response) => {
//   const { userId } = req.body;
//   const orders = await OrderRepository.find({
//     relations: ["products"],
//     where: { user: { id: userId } },
//   });

//   res.send(orders);
// });

usersRouter.get("/orders", checkLogin, getUserOrders); // Obtener todas las órdenes del usuario
usersRouter.get("/orders/:orderId", checkLogin, getUserOrderById); // Obtener una orden específica por su ID


export default usersRouter;