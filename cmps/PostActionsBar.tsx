import CommentsIcon from "./icons/CommentsIcon"
import HeartIcon from "./icons/HeartIcon"

const actions = [
    { name: 'like', icon: <HeartIcon /> },
    { name: 'comment', icon: <CommentsIcon /> }
]

export function PostActionsBar() {

    return (
        <div className="action-bar flex">
            {actions.map(action => <button key={action.name} className="action-btn">
                {action.icon}
            </button>)}
        </div>
    )
}