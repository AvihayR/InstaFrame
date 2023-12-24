'use client'

import { userService } from "@/services/user.service.local"
import { UserCreds, UserToken } from '../../typings'
import { useEffect, useState } from "react"

export default function LoginPage() {
    const [loggedUser, setLoggedUser] = useState<UserToken | null>(null)

    useEffect(() => {
        setLoggedUser(userService.getLoggedinUser())
    }, [])


    async function onLogin(formData: FormData) {
        let userCreds: UserCreds = { username: '', password: '' }

        formData.forEach((value, key) => {
            if (key === 'username' || key === 'password') userCreds[key as keyof UserCreds] = value as string
        })

        const user = await userService.login(userCreds)
        setLoggedUser(userService.getLoggedinUser())
    }

    function onLogout() {
        userService.logout()
        setLoggedUser(userService.getLoggedinUser())
    }

    return (
        <section className="login-page">
            {loggedUser ?
                <>
                    <h1>Logged in as {loggedUser.username}</h1>
                    <button onClick={onLogout}>Log out</button>
                </>
                :
                <form className="login-form" action={onLogin}>
                    <input type="text" name="username" placeholder="Username or email" />
                    <input type="text" name="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            }

        </section>
    )
}