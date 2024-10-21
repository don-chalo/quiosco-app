'use client'

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { createProduct } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";

function AddProductForm({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: Number(formData.get('price')),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        };
        const result = ProductSchema.safeParse(data);
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message);
                console.log(issue);
            });
            return;
        }
        const response = await createProduct(result.data);

        if (response?.errors) {
            response.errors.forEach((issue) => {
                toast.error(issue.message);
            });
            return;
        }

        toast.success("Producto registrado correctamente");
        router.push("/admin/products");
    };

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form className="space-y-5" action={handleSubmit}>
                { children }
                <input className="bg-indigo-600 hover:bg-indigo-800 text-white w-full m-3 p-3 uppercase font-bold cursor-pointer"
                    type="submit"
                    value="Registrar Producto" />
            </form>
        </div>
    );
}

export default AddProductForm;