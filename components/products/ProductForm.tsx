import { prisma } from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

async function getCategories() {
    return await prisma.category.findMany();
}

type ProductFormProps = {
    product?: Product
}

export default async function ProductForm({ product }: ProductFormProps) {

    const categories = await getCategories();

    return (
        <>
            <div className="space-y-2">
                <label className="text-slate-800" htmlFor="name">
                    Nombre:
                </label>
                <input className="block w-full p-3 bg-slate-100"
                    defaultValue={product?.name}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nombre Producto"
                />
            </div>

            <div className="space-y-2">
                <label className="text-slate-800" htmlFor="price">
                    Precio:
                </label>
                <input className="block w-full p-3 bg-slate-100"
                    defaultValue={product?.price}
                    id="price"
                    name="price"
                    placeholder="Precio Producto"
                />
            </div>

            <div className="space-y-2">
                <label className="text-slate-800" htmlFor="categoryId">
                    Categoría:
                </label>
                <select className="block w-full p-3 bg-slate-100"
                    defaultValue={product?.categoryId}
                    id="categoryId"
                    name="categoryId"
                >
                    <option value="">-- Seleccione --</option>
                    {
                        categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)
                    }
                </select>
            </div>
            <ImageUpload image={product?.image} />
        </>
    )
}