'use client'
//TODO: When switching to DB Usage - switch this page to a server component and fetch data using server action

import { userService } from "@/services/user.service.local"
import { useEffect } from "react"

export default function Page({ params }: { params: { username: string } }) {

    useEffect(() => {
        //TODO: Change this to server action instead of useEffect hook
        fetchUser()
    }, [])

    async function fetchUser() {
        const user = await userService.getByUsername(params.username)
        console.log(user)
    }

    return <div>Username: {params.username}</div>
}