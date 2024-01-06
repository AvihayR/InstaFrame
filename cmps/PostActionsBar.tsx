import { Post, UserToken } from "@/typings"
import CommentsIcon from "./icons/CommentsIcon"
import HeartIcon from "./icons/HeartIcon"
import SaveIcon from "./icons/SaveIcon"
import { userService } from "@/services/user.service.local"
import { useEffect, useState } from "react"
import { postService } from "@/services/post.service.local"
import { useSelector } from "react-redux"
import { RootStoreState } from "@/store/store"

interface PostActionsBarProps {
    post: Post
    onLikePost: (isLiked?: boolean) => void
    onSavePost: (isSaved?: boolean) => void
}

export function PostActionsBar({ post, onLikePost, onSavePost }: PostActionsBarProps) {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const loggedUser = useSelector((storeState: RootStoreState) => storeState.userModule.loggedUser)



    useEffect(() => {
        checkIsLiked(post)
        checkIsSaved(post)
    }, [post])


    function checkIsLiked(post: Post) {
        if (loggedUser) {
            const isLiked = postService.isPostLiked(post, loggedUser._id)
            setIsLiked(isLiked)
        }
    }

    async function checkIsSaved(post: Post) {
        if (loggedUser) {
            const isSaved = await userService.isPostSaved(loggedUser._id, post._id)
            setIsSaved(isSaved)
        }
    }

    function toggleLike() {
        if (isLiked) {
            setIsLiked(false)
            onLikePost(true)
        }
        else {
            setIsLiked(true)
            onLikePost()
        }
    }

    function toggleSave() {
        if (isSaved) {
            setIsSaved(false)
            onSavePost(true)
        } else {
            setIsSaved(true)
            onSavePost()
            console.log('save post')
        }
    }

    const actions = [
        { name: 'like', icon: <HeartIcon isLiked={isLiked} />, func: toggleLike },
        { name: 'comment', icon: <label className="cursor-pointer" htmlFor="add-comment"><CommentsIcon /></label> },
        { name: 'save', icon: <SaveIcon isFilled={isSaved} />, func: toggleSave }
    ]


    return (
        <div className="action-bar flex">
            {actions.map(action => <button onClick={action.func} key={action.name} className="action-btn hover:text-gray-400">
                {action.icon}
            </button>)}
        </div>
    )
}