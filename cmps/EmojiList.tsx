const emojis = [
    '😂', '😮', '😍', '😢', '👏', '🔥', '🎉', '💯', '❤️', '🤣', '🥰', '😘', '😭', '😊'
]

export function EmojiList() {

    return (
        <div className="emoji-list">
            <h1 className="text-sm text-gray-500 pb-3 leading-none">Most Popular</h1>
            <div className="popular-list">
                {emojis.map(emoji => <div className="emoji" key={emoji}>{emoji}</div>)}
            </div>
        </div>
    )
}