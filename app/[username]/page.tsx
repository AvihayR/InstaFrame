'use client'
import { UserHeader } from "@/cmps/UserHeader"
//TODO: When switching to DB Usage - switch this page to a server component and fetch data using server action

import { userService } from "@/services/user.service.local"
import { User } from "@/typings"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { username: string } }) {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        //TODO: Change this to server action instead of useEffect hook
        fetchUser()
    }, [])

    async function fetchUser() {
        const user = await userService.getByUsername(params.username)
        setUser(user)
        console.log(user)
    }

    return (
        <section className="user-page">
            {user && <UserHeader user={user} />}

        </section>
    )
}