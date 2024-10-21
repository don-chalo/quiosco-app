'use client'

import { useMemo } from "react";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { createorder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

function OrderSummary() {
    const { order, clearOrder } = useStore();
    const total = useMemo(
        () => order.reduce((total, item) => total + item.subtotal, 0),
        [order]
    );

    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        };
        const result = OrderSchema.safeParse(data);
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message);
            });
            return;
        }
        const response = await createorder(data);
        if (response?.errors) {
            response.errors.forEach((error) => {
                toast.error(error.message);
            });
        } else {
            toast.success('¡Orden creada!');
            clearOrder();
        }
    };

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
            {
                order.length === 0 ?
                    <p className="text-center my-10">El carrito está vacío</p>:
                    <div className="mt-5">
                        {
                            order.map((item) => <ProductDetails key={item.id} item={item} />)
                        }
                        <p className="text-2xl mt-20 text-center">
                            Total a pagar {''}
                            <span className="font-bold">{formatCurrency(total)}</span>
                        </p>

                        <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
                            <input className="bg-white border border-gray-100 p-2 w-full"
                                name="name"
                                placeholder="Tu nombre"
                                type="text" />
                            <input className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                                type="submit"
                                value="Confirmar Pedido" />
                        </form>
                    </div>
            }
        </aside>
    );
}

export default OrderSummary;