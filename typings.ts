//Data Types:
export interface Post {
    _id: string
    by: { userId: string, username: string, userImg: string }
    caption: string
    imgUrls: string[]
    vidUrls: string[]
    likedBy: Like[]
    comments: Comment[]
    postedAt: number
}

export interface Like {
    userId: string
    username: string
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
    savedPosts: string[],
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

export interface RootState {
    systemModule: SystemState
    postModule: PostState
    userModule: UserState
}

export interface SystemState {
    isPostModalShown: boolean
}

export interface PostState {
    posts: Post[],
    chosenPost: null | Post
    lastRemovedPost: Post | null
}

export interface UserState {
    loggedUser: UserToken | null
}