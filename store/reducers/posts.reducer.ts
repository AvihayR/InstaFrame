import { Post, PostState } from "@/typings"
// POSTS
export const SET_POSTS = 'SET_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'
// export const SET_FILTER_BY = 'SET_FILTER_BY'
//CHOSEN POST
export const SET_CHOSEN_POST = 'SET_CHOSEN_POST'
export const UNSET_CHOSEN_POST = 'UNSET_CHOSEN_POST'

interface Action {
    type: string
    post: Post
    posts: Post[]
    postId: string
}

const initialState: PostState = {
    posts: [],
    chosenPost: null,
    lastRemovedPost: null
}

export function postReducer(state = initialState, action: Action) {
    let tempPosts: Post[] = []
    let newState = state

    switch (action.type) {
        case SET_POSTS:
            newState = { ...state, posts: action.posts || [] }
            break

        case ADD_POST:
            if (action.post)
                newState = { ...state, posts: [...state.posts, action.post] }
            break

        case REMOVE_POST:
            const removedPost = state.posts.find(post => post._id === action.postId)
            const filteredPosts = state.posts.filter(post => post._id !== action.postId)

            if (removedPost)
                newState = { ...state, posts: filteredPosts, lastRemovedPost: removedPost }
            break

        case UPDATE_POST:
            if (action.post) {
                tempPosts = state.posts.map(post => (post._id === action.post?._id) ? action.post : post)
                newState = { ...state, posts: tempPosts }
            }
            break

        case SET_CHOSEN_POST:
            if (action.post) {
                newState = { ...state, chosenPost: action.post }
            }
            break

        case UNSET_CHOSEN_POST:
            newState = { ...state, chosenPost: null }
            break

        default:
    }
    return newState
}