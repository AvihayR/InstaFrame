'use client'
import { userService } from "@/services/user.service.local"
import { UserCreds, UserToken } from '../../typings'
import { useEffect, useState } from "react"
import { instaFont } from "@/cmps/Header"
import Link from "next/link"

export default function LoginPage() {
    const [loggedUser, setLoggedUser] = useState<UserToken | null>(null)
    const [isSignUpMode, setIsSignUpMode] = useState(false)

    useEffect(() => {
        setLoggedUser(userService.getLoggedinUser())
    }, [])


    function toggleSignUpLogin() {
        setIsSignUpMode(currState => !currState)
    }

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
                <>
                    <form className="login-form grid place-items-center border border-zinc-800 p-10 mt-28" action={onLogin}>
                        <div className="inputs-container grid">
                            <h1 className={`text-3xl mx-auto mb-9 ${instaFont.className}`}>InstaFrame</h1>
                            <input className="mb-2 w-60 bg-zinc-800 text-xs p-2 border border-zinc-900 rounded" type="text" name="username" placeholder="Username or email" />
                            {isSignUpMode && <input className="mb-2 w-60 bg-zinc-800 text-xs p-2 border border-zinc-900 rounded" type="text" name="username" placeholder="Full name" />}
                            <input className="mb-5 w-60 bg-zinc-800 text-xs p-2 border border-zinc-900 rounded" type="text" name="password" placeholder="Password" />
                            {isSignUpMode ?
                                <button className="font-medium text-sm bg-sky-400 rounded-md p-1 mx-1" type="submit">Sign up</button>
                                :
                                <button className="font-medium text-sm bg-sky-400 rounded-md p-1 mx-1" type="submit">Login</button>}

                        </div>
                    </form>
                    <div className="switch-method flex justify-center border border-zinc-800 p-5 mt-2 text-sm">
                        {isSignUpMode ?
                            <>
                                <h1>Already have an account?</h1>
                                <Link href="" className="text-sky-400 ml-1" onClick={toggleSignUpLogin}>Sign in</Link>
                            </>
                            :
                            <>
                                <h1>Don't have an account yet?</h1>
                                <Link href="" className="text-sky-400 ml-1" onClick={toggleSignUpLogin}>Signup</Link>
                            </>
                        }
                    </div>
                </>
            }

        </section>
    )
}