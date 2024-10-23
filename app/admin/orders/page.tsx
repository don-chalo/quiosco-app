'use client'

import useSWR from "swr";

import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";
import { toast } from "react-toastify";

function OrdersPage() {
    const url = '/admin/orders/api';
    const fetcher = () => fetch(url)
        .then(res => res.json());

    const { data, mutate, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, { refreshInterval: 60000, revalidateOnFocus: false });

    const updateOrders = (orderId: number) => {
        mutate(data?.filter(item => item.id !== orderId))
        .catch(() => toast.error('No fue posible marcar la orden como completada'));
    };

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (data) return (
        <>
            <Heading>Administrar ordenes</Heading>
            {
                data.length ?
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                        {
                            data.map(order => <OrderCard key={order.id} order={order} onCompleted={updateOrders} />)
                        }
                    </div>
                    :
                    <p className="text-center">No hay ordenes pendientes</p>
            }
        </>
    );
}

export default OrdersPage;
