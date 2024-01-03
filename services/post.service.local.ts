import { utilService } from "./util.service"
import { Entity, storageService } from "./async-storage.service"
import demoPosts from "./posts.demo"
import { Comment, Like, Post } from '../typings'
import { userService } from "./user.service.local"
// -----------------------------------------------------------
const STORAGE_KEY = 'postsDB'
// -----------------------------------------------------------


export const postService = {
    getPosts,
    getPostById,
    save,
    likePost,
    unLikePost,
    isPostLiked,
    getEmptyComment,
    likeComment,
    unLikeComment,
    addComment
}

_createPosts()


async function getPosts(): Promise<Post[]> {
    return await storageService.query(STORAGE_KEY)
}

async function getPostById(postId: string): Promise<Post> {
    return await storageService.get(STORAGE_KEY, postId) as Post
}

async function _createPosts() {
    let res = await storageService.query(STORAGE_KEY)
    if (!res || !res.length) {
        storageService.insertMany(STORAGE_KEY, demoPosts)
    }
}

async function save(post: Post) {
    let savedPost
    if (post._id) {
        savedPost = await storageService.put(STORAGE_KEY, post)
    } else {
        savedPost = await storageService.post(STORAGE_KEY, post)
    }
    return savedPost
}

async function likePost(postId: string, userId: string, username: string) {
    const like = { userId, username }
    const post = await getPostById(postId)
    if (isPostLiked(post, userId)) {
        return post
    }
    post.likedBy.unshift(like)
    await save(post)

    return post
}


async function unLikePost(postId: string, userId: string) {
    const post = await getPostById(postId)

    if (!isPostLiked(post, userId)) {
        return post
    }
    const newLikes = post.likedBy.filter(like => like.userId !== userId)
    const postToReturn = await save({ ...post, likedBy: newLikes })

    return postToReturn
}


function isPostLiked(post: Post, userId: string) {
    // Convert likedBy array to Set for faster lookups
    return new Set(post.likedBy.map((likeObj: Like) => likeObj.userId)).has(userId)
}


async function addComment(postId: string, comment: Comment) {
    if (!comment.by.userId) {
        //TODO: Add auth check
        throw new Error('Please login to continue')
    }
    else {
        const post = await getPostById(postId)
        post.comments.push(comment)
        await save(post)

        return comment
    }
}

function getEmptyComment() {
    const loggedUser = userService.getLoggedinUser()
    //TODO: Add auth to identify user credentials

    return {
        id: utilService.makeId(),
        by: { userId: loggedUser?._id, username: loggedUser?.username, imgUrl: loggedUser?.imgUrl },
        txt: '',
        likedBy: [],
        postedAt: Date.now()
    }
}

async function likeComment(postId: string, commentId: string, userId: string) {
    const post = await getPostById(postId)
    const commentToLike = post.comments.find(comment => comment.id === commentId)

    if (!commentToLike?.likedBy.includes(userId)) {
        commentToLike?.likedBy.push(userId)
        await save(post)
    }

    return post
}

async function unLikeComment(postId: string, commentId: string, userId: string) {
    const post = await getPostById(postId)
    const comment = post.comments.find(comment => comment.id === commentId)

    if (comment?.likedBy.includes(userId)) {
        const likedIndex = comment?.likedBy.findIndex(like => like === userId)
        comment?.likedBy.splice(likedIndex, 1)
        await save(post)
    }

    return post
}