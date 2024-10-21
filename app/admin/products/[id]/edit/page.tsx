import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
    const product = await prisma.product.findUnique({
        where: { id }
    });
    if (!product) {
        notFound();
    }
    return product;
}

async function EditProduct({ params }: { params: { id: string } }) {
    const product = await getProduct(+params.id);
    return (
        <>
            <Heading>Editar Producto: { product.name }</Heading>
            <GoBackButton />
            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>
        </>
    );
}

export default EditProduct;