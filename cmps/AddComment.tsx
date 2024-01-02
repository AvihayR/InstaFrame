import EmojiIcon from "./icons/EmojiIcon"

export function AddComment() {
    return (
        <section className="add-comment-container">
            <form action="" className="flex">
                <button className="me-4" onClick={(ev) => { ev.preventDefault() }}>
                    <EmojiIcon />
                </button>
                <input className="flex-1 text-sm focus:outline-none" type="text" name="txt" id="add-comment" placeholder="Add a comment..." />
                <button className="ms-2 text-sm text-sky-500">Post</button>
            </form>
        </section>
    )
}