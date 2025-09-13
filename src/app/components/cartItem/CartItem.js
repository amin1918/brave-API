"use client"
import { useCartStore } from "@/app/store/CartStore";
import Container from "../container/Container";

function CartItem() {
    const addItem = useCartStore(state => state.addItem)
    const decreaseItem = useCartStore(state => state.decreaseItem)
    const removeItem = useCartStore(state => state.removeItem)
  
    return (
        <Container>

            <div className="shadow rounded-md p-4 flex flex-col sm:flex-row gap-4 items-center bg-white">
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 flex justify-center items-center">
                    <img
                        src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png"
                        alt="Sample Product"
                        className="object-contain w-full h-full rounded-md"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center gap-1">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800">Sample Product</h2>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                        This is a sample description of the product. It will be replaced later.
                    </p>
                    <span className="max-w-fit mt-1 text-[10px] sm:text-xs px-2 py-1 bg-stone-200 rounded-lg ">Category</span>
                </div>

                {/* Price */}
                <div className="flex flex-col justify-center items-center text-sm text-gray-800 gap-1">
                    <span className="font-semibold">Per: $25</span>
                    <span className="font-bold">Total: $50</span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                    <button className="w-6 h-6 text-sm bg-gray-200 rounded">+</button>
                    <span className="text-sm">2</span>
                    <button className="w-6 h-6 text-sm bg-gray-200 rounded">-</button>
                </div>

                {/* Remove Button */}
                <div>
                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">Remove</button>
                </div>
            </div>
        </Container>
    );
}

export default CartItem;
