import { User } from "@/typings"
import Image from "next/image"
import Link from "next/link"

interface UserHeaderProps {
    user: User,
    toggleFollow: (unFollowMode?: boolean) => Promise<void>,
    isFollowed: boolean
}

export function UserHeader({ user, toggleFollow, isFollowed }: UserHeaderProps) {

    return (
        <div className="user-header w-full flex sm:justify-center">
            <div className="profile-img-container me-20 sm:me-20 md:me-36">
                <Image className="user-img rounded-full w-24 sm:w-36" src={user.imgUrl} alt={`${user.username}'s Profile image`} width={'150'} height={'150'}></Image>
            </div>
            <div className="info-container">
                <div className="user-interactions flex items-center">
                    <Link className="text-xl hover:text-zinc-400" href={`/${user.username}`}>{user.username}</Link>
                    {
                        isFollowed ?
                            <button onClick={() => toggleFollow(true)} className="follow-btn bg-zinc-600 hover:bg-zinc-700 font-medium text-sm rounded-lg">Following</button>
                            :
                            <button onClick={() => toggleFollow()} className="follow-btn bg-follow font-medium text-sm rounded-lg">Follow</button>
                    }
                </div>
            </div>
            <div className="profile-details">

            </div>
        </div>
    )
}