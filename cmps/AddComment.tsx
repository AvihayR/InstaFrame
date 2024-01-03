import { postService } from "@/services/post.service.local"
import EmojiIcon from "./icons/EmojiIcon"
import { useEffect, useState } from "react"
import { Comment } from "@/typings"


export function AddComment() {
    const [comment, setComment] = useState<Comment | null>(null)

    useEffect(() => {
        setComment(postService.getEmptyComment())
    }, [])

    function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
        setComment((prevComment) => ({
            ...prevComment!,
            txt: ev.target.value,
        }))
    }

    return (
        <section className="add-comment-container">
            <form action={''} className="flex">
                <button className="me-4" onClick={(ev) => { ev.preventDefault() }}>
                    <EmojiIcon />
                </button>
                <input onChange={handleChange} className="flex-1 text-sm focus:outline-none" type="text" name="txt" id="add-comment" placeholder="Add a comment..." />
                <button className="ms-2 text-sm text-sky-500">Post</button>
            </form>
        </section>
    )
}