import { postService } from "@/services/post.service.local"
import EmojiIcon from "./icons/EmojiIcon"
import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from "react"
import { Comment } from "@/typings"
import { commentState, onPostComment } from "@/actions/server-actions"
import { useFormState } from "react-dom"
import { Popover } from "./Popover"
import { EmojiList } from "./EmojiList"

interface AddCommentProps {
    postId: string
    isPopoverOpen: boolean
    setIsPopoverOpen: Dispatch<SetStateAction<boolean>>
}

export function AddComment({ postId, isPopoverOpen, setIsPopoverOpen }: AddCommentProps) {

    const [isFormDisabled, setIsFormDisabled] = useState(true)
    const txtInput = useRef<HTMLInputElement | null>(null)

    const commentInitialState = { ...postService.getEmptyComment(), postId }
    const [comment, sendComment] = useFormState(onPostComment, commentInitialState)


    useEffect(() => {
        //Clear form on submission
        if (txtInput.current && comment) {
            txtInput.current.value = comment.txt
        }
    }, [comment])


    function onEmojiClick(ev: MouseEvent<HTMLElement>) {
        if (txtInput.current) {
            const target = ev.target as HTMLElement
            txtInput.current.value += target.innerText

            setIsFormDisabled((ev.target as HTMLInputElement).innerText.length < 1)
        }
    }

    return (
        <section className="add-comment-container">
            <form action={sendComment} className="flex">
                <div
                    className="emoji-btn cursor-pointer me-4 relative"
                    onClick={(ev) => {
                        setIsPopoverOpen((isOpen) => !isOpen)
                        ev.stopPropagation()
                    }}
                >
                    <EmojiIcon />
                    <Popover isOpen={isPopoverOpen}>
                        <EmojiList onEmojiClick={onEmojiClick} />
                    </Popover>
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