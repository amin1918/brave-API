import React from 'react'

async function Product({params}) {
   const {proId} = await params

   

  return (
    <div className=" font-extrabold text-2xl flex justify-center items-center h-screen  ">Product: {proId} </div>
  )
}

export default Product