import React from 'react'

async function Catalog({params}) {
    const {catId} = await params
  return (
    <div className=" font-extrabold text-2xl flex justify-center items-center h-screen  ">Catalog: {catId} </div>
  )
}

export default Catalog