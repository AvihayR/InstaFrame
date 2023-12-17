import { utilService } from "./util.service"
import { storageService } from "./async-storage.service"
import demoPosts from "./posts.demo"
import { unstable_noStore as noStore } from 'next/cache'
// -----------------------------------------------------------
const STORAGE_KEY = 'postsDB'
// -----------------------------------------------------------


export const postService = {
    getPosts,
}

_createPosts()


async function getPosts() {
    return await storageService.query(STORAGE_KEY)
}

async function _createPosts() {
    console.log('Create posts - start');
    let res = await storageService.query(STORAGE_KEY);
    if (!res || !res.length) {
        storageService.insertMany(STORAGE_KEY, demoPosts);
    }
    console.log('Create posts - end');
}
