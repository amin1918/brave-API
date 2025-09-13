"use client"
import Container from "@/app/components/container/Container";
import fetchAPI from "@/utils/fetch-api";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ClientRegister({ users }) {
    const [userInfo, setUserInfo] = useState({
        fullname: "",
        email: "",
        password: "",
        cart:[]
    })
    const [alarm, setAlarm] = useState("")
    const router = useRouter()
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo(perv => ({
            ...perv, [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reject = users.find(user => (user.email == userInfo.email))
        if (reject) {
            setAlarm("a user with this email already exists")
            return
        }
        const newUser = await fetchAPI("http://localhost:8001/users",
            { method: "POST", body: userInfo }
        )
        router.push("/auth/login")
        console.log(users)

    }




    return (
        <Container>
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Full Name</label>
                            <input
                                onChange={handleChange}
                                name="fullname"
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="John Doe"
                            />
                            <span className="text-sm text-red-800"> {alarm} </span>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Email</label>
                            <input onChange={handleChange}
                                name="email"
                                type="email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Password</label>
                            <input onChange={handleChange}
                                name="password"
                                type="password"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition-colors"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <a href="/auth/login" className="text-black font-semibold underline">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </Container>
    );
}
