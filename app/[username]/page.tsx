'use client'
import { FollowedBy } from "@/cmps/FollowedBy"
import { UserHeader } from "@/cmps/UserHeader"
//TODO: When switching to DB Usage - switch this page to a server component and fetch data using server action

import { userService } from "@/services/user.service.local"
import { utilService } from "@/services/util.service"
import { RootStoreState } from "@/store/store"
import { User } from "@/typings"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Page({ params }: { params: { username: string } }) {
    const [user, setUser] = useState<User | null>(null)
    const loggedUser = useSelector((storeState: RootStoreState) => storeState.userModule.loggedUser)
    const [isUserFollowed, setIsUserFollowed] = useState(false)

    useEffect(() => {
        //TODO: Change this to server action instead of useEffect hook
        fetchUser()
    }, [])

    useEffect(() => {
        checkIsUserFollowed()
    }, [user])


    async function fetchUser() {
        const user = await userService.getByUsername(params.username)
        setUser(user)
    }

    async function toggleFollow(unFollowMode = false) {
        if (!user || !loggedUser) return console.log('Login to proceed')

        if (unFollowMode) setIsUserFollowed(false)
        else setIsUserFollowed(true)

        userService.toggleFollowUser(user._id, loggedUser._id, unFollowMode)
    }

    async function checkIsUserFollowed() {
        if (!user) return
        setIsUserFollowed(await userService.isUserFollowed(user._id))
    }

    return (
        user && <section className="user-page w-full px-4 xl:px-0">
            <UserHeader user={user} toggleFollow={toggleFollow} isFollowed={isUserFollowed} />
            <div className="mobile-bio xs:hidden">
                <div className="fullname-container">
                    <h2 className="fullname text-sm font-semibold tracking-wide mt-3">{user.fullname}</h2>
                </div>
                <div className="bio-container text-sm">
                    {user.bio}
                </div>

                <FollowedBy followers={user.followers}></FollowedBy>
                {
                    isUserFollowed ?
                        <button onClick={() => toggleFollow(true)} className="mobile-follow-btn p-1 w-full mt-3 me-2 bg-zinc-600 hover:bg-zinc-700 font-medium text-base rounded-lg">Following</button>
                        :
                        <button onClick={() => toggleFollow()} className="mobile-follow-btn p-1 w-full mt-3 me-2 bg-follow font-semibold text-base rounded-lg xs:hidden">Follow</button>
                }
            </div>
        </section>
    )
}