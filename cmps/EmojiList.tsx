import { MouseEvent } from "react"

const emojis = [
    '😂', '😮', '😍', '😢', '👏', '🔥', '🎉', '💯', '❤️', '🤣', '🥰', '😘', '😭', '😊'
]

interface EmojiListProps {
    onEmojiClick: (ev: MouseEvent<HTMLElement>) => void
}

export function EmojiList({ onEmojiClick }: EmojiListProps) {

    return (
        <div className="emoji-list">
            <h1 className="text-sm text-gray-500 pb-3 leading-none">Most Popular</h1>
            <div className="popular-list">
                {emojis.map(emoji => <div onClick={onEmojiClick} className="emoji cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded" key={emoji}>{emoji}</div>)}
            </div>
        </div>
    )
}