import { Router } from "express";
import {
    createCategory,
    createProduct,
    deleteProduct,
    deleteProductCategory,
    fetchCategoryByID,
    fetchProductByID,
    fetchProductCategories,
    fetchProducts,
    fetchProductsByCategoryID,
    updateProduct,
    updateProductCategory,
} from "./store.controller";

const storeRouter = Router();

storeRouter.post("/categories", createCategory);
storeRouter.get("/categories", fetchProductCategories);
storeRouter.get("/categories/:id", fetchCategoryByID);
storeRouter.delete("/categories/:id", deleteProductCategory);
storeRouter.patch("/categories/:id", updateProductCategory);

storeRouter.post("/products", createProduct);
storeRouter.get("/products", fetchProducts);
storeRouter.get("/products/:id", fetchProductByID);
storeRouter.get("/categories/:id/products", fetchProductsByCategoryID);
storeRouter.delete("/products/:id", deleteProduct);
storeRouter.patch("/products/:id", updateProduct);

export default storeRouter;
