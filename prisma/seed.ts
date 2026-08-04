import { prisma } from "../src/shared/db/prisma.js";

const seedData: { category: string; products: { name: string; quantity: number }[] }[] = [
    {
        category: "Electronics",
        products: [
            { name: "Smartphone", quantity: 50 },
            { name: "Laptop", quantity: 30 },
            { name: "Wireless Earbuds", quantity: 120 },
            { name: "Smartwatch", quantity: 75 },
            { name: "Bluetooth Speaker", quantity: 90 },
        ],
    },
    {
        category: "Home Appliances",
        products: [
            { name: "Microwave Oven", quantity: 40 },
            { name: "Air Fryer", quantity: 60 },
            { name: "Vacuum Cleaner", quantity: 25 },
            { name: "Electric Kettle", quantity: 100 },
        ],
    },
    {
        category: "Groceries",
        products: [
            { name: "Basmati Rice 5kg", quantity: 200 },
            { name: "Olive Oil 1L", quantity: 150 },
            { name: "Whole Wheat Flour 2kg", quantity: 180 },
            { name: "Instant Coffee 200g", quantity: 220 },
        ],
    },
    {
        category: "Fashion",
        products: [
            { name: "Cotton T-Shirt", quantity: 300 },
            { name: "Denim Jeans", quantity: 140 },
            { name: "Running Shoes", quantity: 80 },
            { name: "Leather Belt", quantity: 110 },
        ],
    },
];

async function main() {
    console.log("Seeding database...");

    for (const { category, products } of seedData) {
        const productCategory = await prisma.productCategory.upsert({
            where: { name: category },
            update: {},
            create: { name: category },
        });

        const existingCount = await prisma.product.count({
            where: { categoryId: productCategory.id },
        });

        if (existingCount > 0) {
            console.log(`- "${category}" already has products, skipping.`);
            continue;
        }

        await prisma.product.createMany({
            data: products.map((product) => ({
                ...product,
                categoryId: productCategory.id,
            })),
        });

        console.log(`- Seeded "${category}" with ${products.length} products.`);
    }

    console.log("Seeding complete.");
}

main()
    .catch((error) => {
        console.error("Seeding failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
