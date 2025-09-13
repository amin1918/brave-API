import React from 'react'
import CartItem from '../components/cartItem/CartItem'

async function page() {
    const res = await fetch("http://localhost:8000/products")
    const products = res.json()
    

    console.log(products)
  return (
    <div className='mt-20'>
        <CartItem  />
    </div>
  )
}

export default page