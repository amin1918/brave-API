"use client";
import { useCartStore } from "@/app/store/CartStore";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";

function ProductItem({ QuickLook, info, handleQuickLook, cartData }) {

  const addItem = useCartStore(state => state.addItem)
  const addedItems = useCartStore(state => state.items)
  const [cartDataSet, setCartDataSet] = useState([])


  useEffect(() => {
    setCartDataSet(cartData);
  }, [cartData]);

  const handleAddToCart = async (product) => {

    const exists = addedItems.find(i => i.id === product.id);
    if (exists) {
      await fetch(`http://localhost:8001/cart/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: exists.qty + 1 })
      });
    } else {
      await fetch(`http://localhost:8001/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, qty: 1 })
      });
    }

    addItem(product);
  };




  return (
    <div className="border border-stone-200 rounded-xl w-full group/mom overflow-hidden duration-200 ease-linear hover:shadow-lg flex flex-col h-full">

      {/* Image Section */}
      <div className=" relative w-full aspect-square overflow-hidden rounded-t-xl group/image flex items-center justify-center p-4 bg-white">

        <img
          src={info.image}
          alt={info.title}
          className="max-w-full max-h-full  object-contain transition-transform duration-300 group-hover/image:scale-105"
        />


        {/* Save Button */}
        <div className="absolute right-3 top-3">
          <button className="rounded-md p-2 bg-slate-100 opacity-0 transform translate-y-2 transition-all duration-300 ease-linear group-hover/image:opacity-100 group-hover/image:translate-y-0">
            <FiHeart size={15} />
          </button>
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-[-20px] w-full px-6">
          <button
            onClick={() => { QuickLook(true), handleQuickLook(info) }}
            className="w-full  font-semibold text-[13px] h-8 bg-black text-white rounded-md transform transition-transform duration-300 group-hover/image:-translate-y-8 hover:cursor-pointer"
          >
            Quick View
          </button>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-black/10 bg-opacity- opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-t-xl "></div>
      </div>

      {/* Intro Section */}
      <div className="flex flex-col flex-1 my-4 mx-4">
        {/* Title & Category */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-sm sm:text-base line-clamp-2">{info.title}</h1>
          <span className="border rounded-lg font-bold text-[10px] px-2 py-1">
            {info.category}
          </span>
        </div>

        {/* Price */}
        <h1 className="py-2 font-extrabold text-base sm:text-lg">{info.price}</h1>

        {/* Select Options */}
        <div className="flex gap-2 mb-2">
          <select className="flex-1 text-[9px] sm:text-xs text-stone-500 bg-slate-100 rounded-md h-7">
            <option>Size</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
          <select className="flex-1 text-[9px] sm:text-xs text-stone-500 bg-slate-100 rounded-md h-7">
            <option>Color</option>
            <option>Black</option>
            <option>Navy</option>
            <option>Gray</option>
          </select>
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-center mt-auto">
          <button onClick={() =>  addItem(info)} className="rounded-md w-full h-7 text-white bg-zinc-500 text-xs sm:text-sm hover:cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
