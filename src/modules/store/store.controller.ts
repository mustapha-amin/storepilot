import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as storeService from "./store.service";
import { CreateCategoryDto, CreateProductDto, UpdateProductDto } from "./store.dto";
import { successResponse } from "../../shared/interfaces/response";

export async function createCategory(req: Request, res: Response) {
    const data = req.body as CreateCategoryDto;
    const category = await storeService.createCategory(data);

    return res.status(StatusCodes.CREATED).json(successResponse("Category created successfully", category));
}

export async function fetchProductCategories(req: Request, res: Response) {
    const categories = await storeService.fetchProductCategories();

    return res.status(StatusCodes.OK).json(successResponse("Categories fetched successfully", categories));
}

export async function fetchCategoryByID(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const category = await storeService.fetchCategoryByID(id);

    return res.status(StatusCodes.OK).json(successResponse("Category fetched successfully", category));
}

export async function deleteProductCategory(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const deletedCategory = await storeService.deleteProductCategory(id);

    return res.status(StatusCodes.OK).json(successResponse("Category deleted successfully", deletedCategory));
}

export async function updateProductCategory(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const { name } = req.body as CreateCategoryDto;

    const updatedCategory = await storeService.updateProductCategory(id, name);

    return res.status(StatusCodes.OK).json(successResponse("Category updated successfully", updatedCategory));
}

export async function createProduct(req: Request, res: Response) {
    const data = req.body as CreateProductDto;
    const product = await storeService.createProduct(data);

    return res.status(StatusCodes.CREATED).json(successResponse("Product created successfully", product));
}

export async function fetchProducts(req: Request, res: Response) {
    const products = await storeService.fetchProducts();

    return res.status(StatusCodes.OK).json(successResponse("Products fetched successfully", products));
}

export async function fetchProductByID(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const product = await storeService.fetchProductByID(id);

    return res.status(StatusCodes.OK).json(successResponse("Product fetched successfully", product));
}

export async function fetchProductsByCategoryID(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const category = await storeService.fetchCategoryByID(id);
    const products = await storeService.fetchProductsByCategoryID(id);

    return res.status(StatusCodes.OK).json(successResponse("Products fetched successfully", products));
}

export async function deleteProduct(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const deletedProduct = await storeService.deleteProduct(id);

    return res.status(StatusCodes.OK).json(successResponse("Product deleted successfully", deletedProduct));
}

export async function updateProduct(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const data = req.body as UpdateProductDto;
    const updatedProduct = await storeService.updateProduct(id, data);

    return res.status(StatusCodes.OK).json(successResponse("Product updated successfully", updatedProduct));
}
