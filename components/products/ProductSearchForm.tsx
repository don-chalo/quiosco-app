'use client'

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { SearchSchema } from "@/src/schema";

function ProductSearchForm() {
    const router = useRouter();
    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        };
        const result = SearchSchema.safeParse(data);
        if (!result.success) {
            result.error?.issues.map(issue => {
                toast.success(issue.message);
            });
            return;
        }
        router.push(`/admin/products/search?search=${result.data.search}`);
    };
    return (
        <form action={handleSearchForm} className="flex items-center">
            <input
                className="p-2 placeholder-gray-400 w-full"
                name="search"
                placeholder="Buscar producto"
                type="text"
            />
            <input
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
                type="submit"
                value="Buscar"
            />
        </form>
    );
}

export default ProductSearchForm;