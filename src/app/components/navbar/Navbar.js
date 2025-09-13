"use client"
import { FiUser, FiHeart, FiShoppingBag, FiSearch, FiMenu, FiX } from "react-icons/fi"
import { useState } from "react"
import Container from "../container/Container"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUserStore } from "@/app/_zustand/userStore"

function Navbar() {
  const {currentUser, loginStatus} = useUserStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const path = usePathname()
  const navs = [
    { name: "New Arrivals", href: "/store" },
    { name: "Men", href: "/store/men" },
    { name: "Women", href: "/store/women" },
    { name: "Kids", href: "/store/kids" },
    { name: "Sale", href: "/store/sale" }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
      <Container className="lg:py-2 md:py-2 py-2 flex items-center justify-between">

        {/* Logo */}
        <h1 className="font-bold text-lg mr-3">StyleHub</h1>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium mr-3 hover:pointer-coarse">
          {navs.map((nav, index) => (
            <li className={path == nav.href ? " text-stone-500 font-bold  hover:pointer-coarse  " : " hover:pointer-coarse"} key={index}>
              <Link href={nav.href} > {nav.name} </Link>
            </li>
          ))}


        </ul>

        <div className="hidden md:flex relative flex-1 max-w-md items-center my-2">
       
          <input
            placeholder="Search Products"
            className="w-full bg-stone-100 rounded-lg h-8 pl-7 text-sm outline-none"
          />
          <span className="absolute left-2 text-stone-500">
            <FiSearch size={15} />
          </span>
        </div>


        <div className="flex items-center gap-3 pl-4">

          <div className="hidden md:flex gap-6">
            <Link href={"/auth/signup"} >
              <button className=" p-2 rounded-md m-1 hover:bg-stone-100 hover:cursor-pointer"><FiUser size={14} /></button>
            </Link>
            <button className="p-2 rounded-md m-1 hover:bg-stone-100 hover:cursor-pointer"><FiHeart size={14} /></button>
          </div>
          <Link href={"/cart"}>
            <button className="p-2 rounded-md m-1 hover:bg-stone-100 ml-6 hover:cursor-pointer" ><FiShoppingBag size={14} /></button>
          </Link>
          <button className=" md:hidden ml-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t shadow-lg md:hidden px-5 py-5">

            <div className="relative p-4">
              <input
                placeholder="Search Products"
                className="w-full bg-stone-100 rounded-lg h-8 pl-8 text-sm outline-none"
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-500">
                <FiSearch size={14} />
              </span>
            </div>


            <ul className="flex flex-col gap-4 p-4 text-sm font-medium">

              {navs.map((nav, index) => (
                <li className={path == nav.href ? " text-stone-500 font-bold  hover:pointer-coarse  " : " hover:pointer-coarse"} key={index}>
                  <Link href={nav.href} > {nav.name} </Link>
                </li>
              ))}
            </ul>


            <div className="flex gap-3 mt-2">
              <button><FiUser size={14} /></button>
              <button><FiHeart size={14} /></button>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Navbar