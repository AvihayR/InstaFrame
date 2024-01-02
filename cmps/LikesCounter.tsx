import { userService } from "@/services/user.service.local"
import { User } from "@/typings"
import { useEffect, useState } from "react"

interface likesCounterProps {
    likes: string[]
}

export function LikesCounter({ likes }: likesCounterProps) {
    const [lastLike, setLastLike] = useState<User | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchLastLike()
            setLastLike(result)
        }

        fetchData()
    }, [likes]);

    async function fetchLastLike() {
        return await userService.getById(likes[0])
    }

    return (
        <div className="likes-container mx-4 text-sm leading-4 mb-1">
            <h3>{
                lastLike ?
                    `Liked by ${lastLike?.username} and others`
                    :
                    ''
            }</h3>
        </div>
    )
}