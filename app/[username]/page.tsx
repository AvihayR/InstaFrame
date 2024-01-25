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
            <div className="bio-container text-sm">
                {user.bio}
            </div>

            <FollowedBy followers={user.followers}></FollowedBy>
        </section>
    )
}