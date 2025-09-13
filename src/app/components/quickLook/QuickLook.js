function QuickLook({QuickLook, info}) {
    return (
        <div className="w-screen h-screen z-50 bg-black/60 flex items-center justify-center p-4 " onClick={()=>QuickLook(false)}>
            
            <div className="w-full sm:m-0 max-w-sm md:max-w-md bg-white pb-5 pt-6 px-6 rounded-md  shadow-lg ">
                <div className="flex justify-between">
                    <h1 className="text-lg font-bold mb-4">    {info.title}    </h1>
                    <button className="text-xs h-5 hover:cursor-pointer" onClick={()=>QuickLook(false)}>✕</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex justify-center aspect-square">
                        <div className="w-full">
                            <img
                                src={info.image}
                                alt="Product"
                                className="object-cover w-full rounded-md"
                            />
                        </div>
                    </div>

                    {/* info*/}
                    <div className="flex flex-col">
                        <div>
                            <h2 className="text-xl font-bold">{info.price} </h2>
                            <span className="inline-block mt-1 rounded-lg font-bold text-[10px] px-2 py-1 bg-stone-50">
                                {info.category}
                            </span>
                        </div>

                        <p className="mt-2 text-xs  rounded-lg font-medium px-2  line-clamp-10">
                            {info.description}
                        </p>

                        <div className="mt-4 flex flex-col gap-2">
                            <label className="text-xs font-medium"> size </label>
                            <select className="text-xs text-stone-500 bg-slate-100 rounded-md h-7">
                                <option>Select Size</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                            </select>

                            <label className="text-xs font-medium">Color</label>
                            <select className="text-xs text-stone-500 bg-slate-100 rounded-md h-7">
                                <option>Select Color</option>
                                <option>Black</option>
                                <option>Navy</option>
                                <option>Gray</option>
                            </select>
                        </div>

                        <button className="mt-4 hover:cursor-pointer rounded-md w-full h-8 text-white bg-zinc-500 text-xs sm:text-sm hover:bg-zinc-600 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuickLook;
