import { Router } from "express";
import { getProducts, getProductById } from "../controllers/product.controller";
import { preLoadProducts } from "../helpers/preLoadProducts";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/preloadProducts", async (req, res) => {
  try {
    await preLoadProducts();
    res.status(200).json({ message: "Products preloaded successfully." });
  } catch (error) {
    console.error("Error preloading products:", error);
    res.status(500).json({ message: "Failed to preload products." });
  }
});

export default router;
