import { utilService } from "./util.service"
import { Entity, storageService } from "./async-storage.service"
import demoPosts from "./posts.demo"
import { Post } from '../typings'
// -----------------------------------------------------------
const STORAGE_KEY = 'postsDB'
// -----------------------------------------------------------


export const postService = {
    getPosts,
    getPostById,
    likeComment
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

async function likeComment(postId: string, commentId: string, userId: string) {
    const post = await getPostById(postId)
    const commentToLike = post.comments.find(comment => comment.id === commentId)
    commentToLike?.likedBy.push(userId)
}