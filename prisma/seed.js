import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany(); // Optional: clear existing products

  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Earbuds",
        description: "High-quality wireless earbuds with noise cancellation.",
        price: 99.99,
        image:
          "https://images.unsplash.com/photo-1606813902917-08fb66d18c2f?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Smartwatch",
        description:
          "Track your health and fitness with this sleek smartwatch.",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with powerful bass.",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1587574293340-ec28a6ec66e9?auto=format&fit=crop&w=600&q=80",
      },
    ],
  });

  console.log("✅ Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
