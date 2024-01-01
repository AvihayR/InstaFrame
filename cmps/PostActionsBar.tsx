import { Post } from "@/typings"
import CommentsIcon from "./icons/CommentsIcon"
import HeartIcon from "./icons/HeartIcon"
import SaveIcon from "./icons/SaveIcon"
import { userService } from "@/services/user.service.local"
import { useEffect, useState } from "react"

interface PostActionsBarProps {
    onLikePost: () => void
    post: Post
}

export function PostActionsBar({ post, onLikePost }: PostActionsBarProps) {
    const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        checkIsLiked()
    }, [])

    const actions = [
        { name: 'like', icon: <HeartIcon isLiked={isLiked} />, func: onLikePost },
        { name: 'comment', icon: <CommentsIcon />, func: () => { console.log('comment') } },
        { name: 'save', icon: <SaveIcon />, func: () => { console.log('save') } }
    ]

    async function checkIsLiked() {
        let loggedUser = await userService.getLoggedinUser()
        setIsLiked(new Set(post?.likedBy).has(loggedUser._id))
    }

    return (
        <div className="action-bar flex">
            {actions.map(action => <button onClick={action.func} key={action.name} className="action-btn hover:text-gray-400">
                {action.icon}
            </button>)}
        </div>
    )
}