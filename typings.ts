//Data Types:
export interface Post {
    _id: string
    userId: string
    caption: string
    imgUrls: string[]
    vidUrls: string[]
    likedBy: string[]
    comments: Comment[]
}
export interface Comment {
    by: string
    txt: string
    likes: string[]
}