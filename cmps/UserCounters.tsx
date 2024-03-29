import { utilService } from "@/services/util.service"

interface UserCountersProps {
    postsCount: number
    followersCount: number
    followingCount: number
}

export function UserCounters({ postsCount, followersCount, followingCount }: UserCountersProps) {

    return (
        <div className="counters flex gap-8 xs:gap-10 md:gap-8">
            <div className="posts-counter-container flex flex-col items-center md:flex-row md:gap-2">
                <h1 className="post-counter text-lg font-medium xs:text-xl md:text-base md:font-semibold">{`${postsCount}`}</h1>
                <span className="text-sm leading-3 xs:text-base">Posts</span>
            </div>

            <div className="followers-counter-container flex flex-col items-center md:flex-row md:gap-2">
                <h1 className="followers-counter text-lg font-medium xs:text-xl md:text-base md:font-semibold">{`${followersCount}`}</h1>
                <span className="text-sm leading-3 xs:text-base">Followers</span>
            </div>

            <div className="following-counter-container flex flex-col items-center md:flex-row md:gap-2">
                <h1 className="following-counter text-lg font-medium xs:text-xl md:text-base md:font-semibold">{`${followingCount}`}</h1>
                <span className="text-sm leading-3 xs:text-base">Following</span>
            </div>

        </div>
    )


}