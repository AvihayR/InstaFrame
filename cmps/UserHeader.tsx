'use client'
import { User } from "@/typings"
import Image from "next/image"
import Link from "next/link"
import SimilarIcon from "./icons/SimilarIcon"
import ThreeDots from "./icons/ThreeDots"
import ArrowIcon from "./icons/ArrowIcon"
import { UserCounters } from "./UserCounters"
import { FollowedBy } from "./FollowedBy"

interface UserHeaderProps {
    user: User,
    toggleFollow: (unFollowMode?: boolean) => Promise<void>,
    isFollowed: boolean
}

export function UserHeader({ user, toggleFollow, isFollowed }: UserHeaderProps) {

    return (
        <>
            <div className="mobile-header flex items-center justify-between xs:hidden">
                <button onClick={() => window.history.back()} className="back-btn">
                    <ArrowIcon className="-rotate-90 w-5" />
                </button>
                <Link className="text-lg tracking-wide xs:text-xl hover:text-zinc-400" href={`/${user.username}`}>{user.username}</Link>
                <div className="options btn">
                    <ThreeDots />
                </div>
            </div>
            <div className="user-header mt-5 first-letter flex justify-around xs:p-0 sm:justify-center">
                <div className="profile-img-container me-10 sm:me-16 xs:grid xs:place-items-center md:me-16">
                    <Image className="user-img rounded-full w-24 xs:w-36" src={user.imgUrl} alt={`${user.username}'s Profile image`} width={'150'} height={'150'}></Image>
                </div>
                <div className="info grid">
                    <div className="info-container hidden xs:block">
                        <div className="user-interactions flex md:items-center">
                            <Link className="text-2xl me-7 hover:text-zinc-400" href={`/${user.username}`}>{user.username}</Link>
                            <div className="actions flex items-center">
                                {
                                    isFollowed ?
                                        <button onClick={() => toggleFollow(true)} className="follow-btn me-2 bg-zinc-600 hover:bg-zinc-700 font-medium text-base rounded-lg">Following</button>
                                        :
                                        <button onClick={() => toggleFollow()} className="follow-btn me-2 bg-follow font-semibold text-base rounded-lg">Follow</button>
                                }
                                <button className="similar-btn p-2 bg-zinc-600 hover:bg-zinc-700 font-semibold text-base rounded-lg">
                                    <SimilarIcon />
                                </button>
                                <div className="options btn ms-3">
                                    <ThreeDots />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="counters-container flex w-full m-auto xs:mt-4">
                        <UserCounters postsCount={user.posts.length} followersCount={user.followers.length} followingCount={user.following.length} />
                    </div>
                    <div className="desktop-bio hidden xs:block">
                        <div className="fullname-container">
                            <h2 className="fullname text-sm font-semibold tracking-wide mt-3">{user.fullname}</h2>
                        </div>
                        <div className="bio-container text-sm">
                            {user.bio}
                        </div>

                        <FollowedBy followers={user.followers}></FollowedBy>
                    </div>
                </div>
            </div>
        </>
    )
}