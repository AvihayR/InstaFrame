import { userService } from "@/services/user.service.local"
import { Like, User } from "@/typings"
import { useEffect, useState } from "react"

interface likesCounterProps {
    likes: Like[]
}

export function LikesCounter({ likes }: likesCounterProps) {


    return (
        <div className="likes-container mx-4 text-sm leading-4 mb-1">
            <h3>{

                `Liked by and others`
            }</h3>
        </div>
    )
}