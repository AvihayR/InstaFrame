import { utilService } from "./util.service"
import { Entity, storageService } from "./async-storage.service"
import demoPosts from "./posts.demo"
import { Post } from '../typings'
// -----------------------------------------------------------
const STORAGE_KEY = 'postsDB'
// -----------------------------------------------------------


export const postService = {
    getPosts,
}

_createPosts()


async function getPosts(): Promise<Post[]> {
    return await storageService.query(STORAGE_KEY)
}

async function _createPosts() {
    console.log('Create posts - start');
    let res = await storageService.query(STORAGE_KEY)
    if (!res || !res.length) {
        storageService.insertMany(STORAGE_KEY, demoPosts)
    }
    console.log('Create posts - end');
}
