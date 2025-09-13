const { create } = require("zustand");

export const useCartStore = create((set, get) => ({
    items: [],
    loadCart: async () => {
        const res = await fetch("http://localhost:8001/cart");
        const data = await res.json();
        set({ items: data });
    },
    addItem: (product) => {
        const items = get().items;
        const existing = items.find(i => i.id === product.id);
        if (existing) { 
            // first update items 
            set({ items: items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) });
            // update db
            fetch(`http://localhost:8001/cart/${product.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ qty: existing.qty + 1 })
            });
        } else {
            set({ items: [...items, { id: product.id, qty: 1 }] });
            fetch("http://localhost:8001/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: product.id, qty: 1 })
            });
        }
    },

    decreaseItem: (id) => {
        const { items } = get();
        const existing = items.find(i => i.id === id);
        if (!existing) return;
        if (existing.qty > 1) {
            set({ items: items.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i) });
            fetch(`http://localhost:8001/cart/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ qty: existing.qty - 1 })
            });
        } else {
            set({ items: items.filter(i => i.id !== id) });
            fetch(`http://localhost:8001/cart/${id}`, { method: "DELETE" });
        }
    },
    removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter(i => i.id !== id) });
        fetch(`http://localhost:8001/cart/${id}`, { method: "DELETE" });
    }
}));
