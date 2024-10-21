import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
    return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
    const skip = pageSize * (page - 1);
    const products = await prisma.product.findMany({
        include: {
            category: true
        },
        orderBy: [
            { category: { name: "asc" } },
            { name: "asc" }
        ],
        skip,
        take: pageSize
    });
    return products;
};

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {
    const currentPage = +searchParams.page || 1;
    const pageSize = 10;
    if (currentPage < 0) {
        redirect('/admin/products');
    }
    const [products, totalProducts] = await Promise.all([
        getProducts(currentPage, pageSize),
        productCount()
    ]);
    const totalPages = Math.ceil(totalProducts / pageSize);
    if (currentPage > totalPages) {
        redirect('/admin/products');
    }

    return (
        <>
            <Heading>Administrar Productos</Heading>
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <Link className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3" href="/admin/products/new">
                    Crear Producto
                </Link>
                <ProductSearchForm />
            </div>
            <ProductTable products={products} totalProducts={totalProducts} />
            <ProductsPagination currentPage={currentPage} totalPages={totalPages} />
        </>
    );
}

export default ProductsPage;