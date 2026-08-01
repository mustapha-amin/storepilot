export interface CreateProductDto {
    name: string;
    quantity: number;
    categoryId: string;
}

export interface CreateCategoryDto {
    name: string
}

export interface UpdateProductDto {
    id: string;
    name: string;
    quantity: number;
}