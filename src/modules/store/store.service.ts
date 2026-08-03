import { ProductCategory } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/db/prisma.js";
import { ConflictError, NotFoundError } from "../../shared/errors/api_errors.js";
import { CreateCategoryDto, CreateProductDto, UpdateProductDto } from "./store.dto.js";

export async function createCategory(data: CreateCategoryDto) {
    return await prisma.productCategory.create({
        data
    })
}

export async function fetchProductCategories() {
    const categories = await prisma.productCategory.findMany({
        include: {
            _count: {
                select: {
                    products:true
                }
            },
        }
    })

    return categories.map(({ _count, ...category }) => ({
        ...category,
        productCount: _count.products,
    }));
}

export async function fetchCategoryByID(id: string) {
    const category = await prisma.productCategory.findUnique({
        where: {
            id
        }
    })

    if (!category) {
        throw new NotFoundError("Category not found")
    }

    return category
}

export async function deleteProductCategory(id: string) {
    const category = await prisma.productCategory.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    products: true
                }
            }
        }
    })

    if (!category) {
        throw new NotFoundError("Category not found")
    }

    if (category._count.products > 0) {
        throw new ConflictError("Cannot delete a category that contains products.")
    }

    return await prisma.productCategory.delete({
        where: {
            id
        }
    })
}

export async function updateProductCategory(id: string, name: string) {
    const category = await fetchCategoryByID(id)
    if (!category) {
        throw new NotFoundError("Category not found")
    }
    return await prisma.productCategory.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}



export async function createProduct(data: CreateProductDto) {
    const category = await prisma.productCategory.findUnique({
        where: {
            id: data.categoryId
        }
    })
    if (!category) {
        throw new NotFoundError("Category not found")
    }
    return await prisma.product.create({
        data
    })
}

export async function fetchProducts() {
    return await prisma.product.findMany()
}

export async function fetchProductByID(id: string) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if (!product) {
        throw new NotFoundError("Product not found")
    }

    return product
}

export async function fetchProductsByCategoryID(id: string) {
    return await prisma.product.findMany({
        where: {
            categoryId: id
        }
    })
}

export async function deleteProduct(id: string) {
    return await prisma.product.delete({
        where: {
            id
        }
    })
}

export async function updateProduct(id: string, data: UpdateProductDto) {
    return await prisma.product.update({
        where: {
            id
        },
        data
    })
}

