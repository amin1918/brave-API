const { create } = require("zustand");

export const useCartStore = create((set) => ({
    items: [],







    addItem: (product) => set((state) => {
        const existing = state.items.find(item => item.id == product.id)
        if (existing) {
            return {
                items: state.items.map(item => item.id == product.id ? { ...item, qty: qty = item.qty + 1 } : item)
            }
        }
        return { items: [...state.items, { ...product, qty: 1 }] };
    }),
    decreaseItem: (id) => set((state) => ({
        items: state.items
            .map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
            .filter(i => i.qty > 0)
    })),
    removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
    }))

}))