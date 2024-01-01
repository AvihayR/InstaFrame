import { Post } from "@/typings"
import CommentsIcon from "./icons/CommentsIcon"
import HeartIcon from "./icons/HeartIcon"
import SaveIcon from "./icons/SaveIcon"

interface PostActionsBarProps {
    onLikePost: () => void
}

export function PostActionsBar({ onLikePost }: PostActionsBarProps) {
    const actions = [
        { name: 'like', icon: <HeartIcon />, func: onLikePost },
        { name: 'comment', icon: <CommentsIcon />, func: () => { console.log('comment') } },
        { name: 'save', icon: <SaveIcon />, func: () => { console.log('save') } }
    ]

    return (
        <div className="action-bar flex">
            {actions.map(action => <button onClick={action.func} key={action.name} className="action-btn hover:text-gray-400">
                {action.icon}
            </button>)}
        </div>
    )
}