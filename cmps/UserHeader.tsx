import { User } from "@/typings"
import Image from "next/image"
import Link from "next/link"

interface UserHeaderProps {
    user: User
}

export function UserHeader({ user }: UserHeaderProps) {
    return (
        <div className="user-header flex">
            <div className="profile-img-container me-4 md:me-20 sm:me-16">
                <Image className="rounded-full" src={user.imgUrl} alt={`${user.username}'s Profile image`} width={'150'} height={'150'}></Image>
            </div>
            <div className="info-container">
                <div className="user-interactions flex">
                    <Link className="text-xl" href={`/${user.username}`}>{user.username}</Link>
                    <button className="follow-btn bg-follow font-medium text-sm rounded-lg">Follow</button>
                </div>
            </div>
            <div className="profile-details">

            </div>
        </div>
    )
}