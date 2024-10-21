import { create } from "zustand";

import { Product } from "@prisma/client";
import { OrderItem } from "./types";

type Store = {
    order: OrderItem[],
    addToOrder: (producto: Product) => void,
    increaseQuantity: (productoId: Product['id']) => void,
    decreaseQuantity: (productoId: Product['id']) => void,
    removeItem: (productoId: Product['id']) => void,
    clearOrder: () => void
};

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const { categoryId, image, ...data } = product;
        let order: OrderItem[] = [];

        if (get().order.find(item => item.id === product.id)) {
            order = get().order.map((item) => {
                if (item.id === product.id) {
                    return {
                        ...product,
                        quantity: item.quantity + 1,
                        subtotal: (item.quantity + 1) * product.price
                    };
                }
                return item;
            });
        } else {
            order = [
                ...get().order,
                {
                    ...data,
                    quantity: 1,
                    subtotal: 1 * product.price
                }
            ];
        }
        set(() => ({ order }));
    },
    increaseQuantity: (productId: Product['id']) => {
        set((state) => ({
            order: state.order.map((item) => {
                if (item.id === productId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: (item.quantity + 1) * item.price
                    };
                }
                return item;
            })
        }));
    },
    decreaseQuantity: (productId: Product['id']) => {
        set((state) => ({
            order: state.order.map((item) => {
                if (item.id === productId && item.quantity > 1) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                        subtotal: (item.quantity - 1) * item.price
                    };
                }
                return item;
            })
        }));
    },
    removeItem: (productId: Product['id']) => {
        set((state) => ({
            order: state.order.filter((item) => item.id!== productId)
        }));
    },
    clearOrder: () => {
        set(() => ({ order: [] }));
    }
}));
