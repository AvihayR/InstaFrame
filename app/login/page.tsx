'use client'
import { userService } from "@/services/user.service.local"
import { UserCreds, UserToken } from '../../typings'
import { useEffect, useState } from "react"
import { instaFont } from "@/cmps/Header"
import Link from "next/link"
import { SET_LOGGED_USER, UNSET_LOGGED_USER } from "@/store/reducers/user.reducer"
import { useDispatch, useSelector } from "react-redux"
import { RootStoreState } from "@/store/store"

export default function LoginPage() {
    const [isSignUpMode, setIsSignUpMode] = useState(false)
    const loggedUser = useSelector((storeState: RootStoreState) => storeState.userModule.loggedUser)
    const dispatch = useDispatch()


    useEffect(() => {
        setLoggedUser(userService.getLoggedinUser())

    }, [])

    function setLoggedUser(user: UserToken | null) {
        dispatch({ type: SET_LOGGED_USER, user })
    }

    function toggleSignUpLogin() {
        setIsSignUpMode(currState => !currState)
    }


    async function onLogin(formData: FormData) {
        let userCreds: UserCreds = { username: '', password: '' }
        formData.forEach((value, key) => {
            if (key === 'username' || key === 'password') userCreds[key as keyof UserCreds] = value as string
        })
        try {
            const user = await userService.login(userCreds)
            setLoggedUser(userService.getLoggedinUser())
        } catch (err) {
            console.log(err)
        }
    }


    async function onSignup(formData: FormData) {
        const user = userService.getEmptyUser()
        formData.forEach((value, key) => {
            if (key === 'username' || key === 'password' || key === 'fullname') user[key as keyof UserCreds] = value as string
        })
        await userService.signup(user)
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
                    <form action={isSignUpMode ? onSignup : onLogin} className="login-form grid place-items-center border p-10 mt-28 dark:border-zinc-800">
                        <div className="inputs-container grid">
                            <h1 className={`text-3xl mx-auto mb-9 ${instaFont.className}`}>InstaFrame</h1>
                            <input className="mb-2 w-60 text-xs p-2 border rounded dark:bg-zinc-800 dark:border-zinc-900" type="text" name="username" placeholder="Username or email" />
                            {isSignUpMode && <input className="mb-2 w-60 text-xs p-2 border rounded dark:bg-zinc-800 dark:border-zinc-900" type="text" name="fullname" placeholder="Full name" />}
                            <input className="mb-5 w-60 text-xs p-2 border rounded dark:border-zinc-900 dark:bg-zinc-800" type="password" name="password" placeholder="Password" />
                            {isSignUpMode ?
                                <button className="font-medium text-sm bg-sky-400 rounded-md p-1 mx-1 text-slate-100 dark:text-black" type="submit">Sign up</button>
                                :
                                <button className="font-medium text-sm bg-sky-400 rounded-md p-1 mx-1 text-slate-100 dark:text-black" type="submit">Login</button>}

                        </div>
                    </form>
                    <div className="switch-method flex justify-center border p-5 mt-2 text-sm dark:border-zinc-800">
                        {isSignUpMode ?
                            <>
                                <h1>Already have an account?</h1>
                                <Link href="" className="text-sky-400 ml-2" onClick={toggleSignUpLogin}>Sign in</Link>
                            </>
                            :
                            <>
                                <h1>Don't have an account yet?</h1>
                                <Link href="" className="text-sky-400 ml-2" onClick={toggleSignUpLogin}>Sign up</Link>
                            </>
                        }
                    </div>
                </>
            }

        </section>
    )
}