'use server'

import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export async function completeOrder(formData: FormData) {
    try {
        const data = {
            orderId: formData.get('order-id')
        };
        const result = OrderIdSchema.safeParse(data);

        if (result.success) {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    orderReadyAt: new Date(Date.now()),
                    status: true
                }
            });
            revalidatePath('/admin/orders');
        } else {
            console.log('result.error', JSON.stringify(result.error));
        }
    } catch(error) {
        console.log('catch', JSON.stringify(error));
    }
}
