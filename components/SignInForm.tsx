"use client"

import { signInSchema } from "@/schemas/signInSchema"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { h1 } from "framer-motion/client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import {z} from "zod"

export default function SignInForm() {
    const router = useRouter()
    const {signIn, isLoaded} = useSignIn()
    
    return (
        <h1>Return a sing in form</h1>
    )
}