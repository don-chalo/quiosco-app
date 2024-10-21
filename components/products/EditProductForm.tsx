'use client'

import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

import { updateProduct } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schema";

function EditProductForm({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const params = useParams();
    const id = +params.id;
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
        const response = await updateProduct(result.data, id);

        if (response?.errors) {
            response.errors.forEach((issue) => {
                toast.error(issue.message);
            });
            return;
        }

        toast.success("Producto actualizado correctamente");
        router.push("/admin/products");
    };

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form className="space-y-5" action={handleSubmit}>
                { children }
                <input className="bg-indigo-600 hover:bg-indigo-800 text-white w-full m-3 p-3 uppercase font-bold cursor-pointer"
                    type="submit"
                    value="Guardar Cambios" />
            </form>
        </div>
    );
}

export default EditProductForm;