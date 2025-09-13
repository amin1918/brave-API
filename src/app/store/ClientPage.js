"use client"
import { useState } from "react";
import Container from "../components/container/Container";
import ProductItem from "../components/productItems/ProductsItem";
import QuickLook from "../components/quickLook/QuickLook";


function Store({ products, cartData }) {
  const categories = ["All", "T-Shirts", "Jackets", "Dresses", "Shoes", "Sweaters", "Pants", "Blouses", "Shorts"];
  const [showQuickLook, setShowQuickLook] = useState(false);
  const [active, setActive] = useState("All");
  const [selectedProduct, setselectedProduct] = useState({})
  console.log(products)

  return (

    <Container>
      {/* QuickLook */}
      {showQuickLook && selectedProduct && (
        <div className="fixed inset-0 z-50 bg- ">
          <div className="relative w-full max-w-md">

            <QuickLook
              info={selectedProduct}
              QuickLook={setShowQuickLook}
            />

          </div>
        </div>
      )}

      <div className='mb-5'>
        <div className='flex justify-between'>
          <div>
            <h1 className='text-xl font-bold mb-2'>Our Products</h1>
            <p className='text-sm text-stone-600'>Discover our complete collection of premium apparel</p>
          </div>

          <select className="text-[12px] w-48 sm:text-xs text-black px-2 bg-stone-100 rounded-md h-8">
            <option >Name</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="flex gap-2 my-7 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`text-[10px] sm:text-[11px] font-semibold cursor-pointer px-3 rounded-md h-7 
            ${active === cat ? "bg-black text-white" : "bg-stone-100 text-black"}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>


        {/* products*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {products.map(product => (
            <ProductItem cartData={cartData} handleQuickLook={setselectedProduct} QuickLook={setShowQuickLook} info={product} key={product.id} />
          ))}

        </div>
      </div>
    </Container>
  );
}

export default Store;