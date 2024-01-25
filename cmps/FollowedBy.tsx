import { Follower } from "@/typings"
import Image from "next/image"

interface FollowedByProps {
    followers: Follower[]
}

export function FollowedBy({ followers }: FollowedByProps) {
    const followerPreviews = followers.slice(0, 3)

    if (followerPreviews.length > 2) {
        return (
            <div className="followed-by-container flex items-center mt-3">

                {followerPreviews.map((f, idx) => <Image className={`rounded-full relative border-2 drop-shadow-md dark:border-neutral-950 ${idx === 1 && 'right-3 -z-10'} ${idx === 2 && 'right-6 -z-20'}`} src={f.imgUrl} alt={`${f.username}'s profile image`} width={30} height={30}></Image>)}

                <span className="text-sm relative right-4 tracking-wide">
                    Followed by <span className="font-semibold tracking-normal">{followerPreviews[0].username}</span>, <span className="font-semibold tracking-normal">{followerPreviews[1].username}</span> and others
                </span>
            </div>
        )
    }

}