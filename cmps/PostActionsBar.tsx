import CommentsIcon from "./icons/CommentsIcon"
import HeartIcon from "./icons/HeartIcon"
import SaveIcon from "./icons/SaveIcon"

const actions = [
    { name: 'like', icon: <HeartIcon /> },
    { name: 'comment', icon: <CommentsIcon /> },
    { name: 'save', icon: <SaveIcon /> }
]

export function PostActionsBar() {

    return (
        <div className="action-bar flex">
            {actions.map(action => <button key={action.name} className="action-btn hover:text-gray-400">
                {action.icon}
            </button>)}
        </div>
    )
}