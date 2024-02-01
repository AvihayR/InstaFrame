import { Follower } from "@/typings"
import Image from "next/image"
import Link from "next/link"

interface FollowedByProps {
    followers: Follower[]
}

export function FollowedBy({ followers }: FollowedByProps) {
    const followerPreviews = followers.slice(0, 3)
    console.log(followerPreviews)

    if (followerPreviews.length)
        return (
            <div className="followed-by-container flex items-center mt-3">

                {followerPreviews.map((f, idx) => <Image className={`rounded-full relative border-2 drop-shadow-md dark:border-neutral-950 ${idx === 1 && 'right-3 -z-10'} ${idx === 2 && 'right-6 -z-20'}`} src={f.imgUrl} alt={`${f.username}'s profile image`} width={30} height={30}></Image>)}

                <span className={`text-sm tracking-wide relative ${followerPreviews.length > 2 && 'right-5'} ${followerPreviews.length > 1 && 'right-1'}`}>
                    {
                        followerPreviews.length > 1 ?
                            <p className="duo-followers">
                                Followed by <Link href={followerPreviews[0].username} className="font-semibold tracking-normal">{followerPreviews[0].username}</Link>, <Link href={followerPreviews[1].username} className="font-semibold tracking-normal">{followerPreviews[1].username}</Link> and others
                            </p>
                            :
                            <p className="single-follower">
                                Followed by <Link href={followerPreviews[0].username} className="font-semibold tracking-normal">{followerPreviews[0].username}</Link>
                            </p>
                    }
                </span>
            </div>
        )

}