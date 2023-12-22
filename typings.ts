//Data Types:
export interface Post {
    _id: string
    by: { userId: string, username: string, userImg: string }
    caption: string
    imgUrls: string[]
    vidUrls: string[]
    likedBy: string[]
    comments: Comment[]
    postedAt: number
}
export interface Comment {
    by: { username: string, userImg: string }
    txt: string
    postedAt: number
    likedBy: string[]
}