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
    id: string
    by: { userId: string, username: string, imgUrl: string }
    txt: string
    postedAt: number
    likedBy: string[]
}

export interface User {
    _id: string
    fullname: string,
    username: string,
    password: string,
    imgUrl: string,
    bio: string,
    posts: Post[],
    followers: Followers[],
    following: Followers[],
}

export interface UserCreds {
    username: string
    password: string
}


export interface UserToken {
    _id: string
    username: string
    imgUrl: string
}

export interface Followers {
    _id: string
    username: string
    fullname: string
    imgUrl: string
}


//Redux store types:
export interface PostState {
    posts: Post[]
    lastRemovedPost: Post | null
}

export interface SystemState {
    isPostModalShown: boolean
}