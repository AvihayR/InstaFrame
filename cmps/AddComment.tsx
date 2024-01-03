import { postService } from "@/services/post.service.local"
import EmojiIcon from "./icons/EmojiIcon"
import { useEffect, useRef, useState } from "react"
import { Comment } from "@/typings"
import { commentState, onPostComment } from "@/actions/server-actions"
import { useFormState } from "react-dom"

interface AddCommentProps {
    postId: string
}

export function AddComment({ postId }: AddCommentProps) {
    // const [comment, setComment] = useState<Comment | null>(null)
    const [isFormDisabled, setIsFormDisabled] = useState(true)
    const commentInitialState = { ...postService.getEmptyComment(), postId }
    const [comment, setComment] = useFormState(onPostComment, commentInitialState)

    return (
        <section className="add-comment-container">
            <form action={setComment} onSubmit={(ev) => { console.log(ev.target) }} className="flex">
                <div className="me-4" onClick={(ev) => { ev.preventDefault() }}>
                    <EmojiIcon />
                </div>

                <input
                    onInput={(ev: React.FormEvent<HTMLInputElement>) => {
                        setIsFormDisabled((ev.target as HTMLInputElement).value.length < 1)
                    }}
                    required
                    minLength={1}
                    className="flex-1 text-sm focus:outline-none"
                    type="text"
                    name="txt"
                    id="add-comment"
                    placeholder="Add a comment..."
                />

                <button disabled={isFormDisabled} type="submit" className="ms-2 text-sm text-sky-500 disabled:text-sky-900">Post</button>
            </form>
        </section>
    )
}