import { postService } from "@/services/post.service.local"
import EmojiIcon from "./icons/EmojiIcon"
import { useEffect, useRef, useState } from "react"
import { Comment } from "@/typings"
import { commentState, onPostComment } from "@/actions/server-actions"
import { useFormState } from "react-dom"
import { Popover } from "./Popover"

interface AddCommentProps {
    postId: string
}

export function AddComment({ postId }: AddCommentProps) {

    const txtInput = useRef<HTMLInputElement | null>(null)
    const [isFormDisabled, setIsFormDisabled] = useState(true)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const commentInitialState = { ...postService.getEmptyComment(), postId }
    const [comment, setComment] = useFormState(onPostComment, commentInitialState)


    useEffect(() => {
        //Clear form on submission
        if (txtInput.current && comment) {
            txtInput.current.value = comment.txt
        }
    }, [comment])

    return (
        <section className="add-comment-container">
            <form action={setComment} className="flex">
                <div className="me-4 relative" onClick={(ev) => { ev.preventDefault() }}>
                    <EmojiIcon />
                    <Popover isOpen={isPopoverOpen} />
                </div>

                <input
                    ref={txtInput}
                    defaultValue={comment?.txt}
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