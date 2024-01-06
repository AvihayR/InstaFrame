import { storageService } from './async-storage.service'
import demoUsers from './users.demo'
import { utilService } from './util.service'
import { User } from '../typings'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    setUserToken,
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser,
    savePostToList,
    removePostFromList,
    isPostSaved,
    followUser
}

_createUsers()

function getUsers() {
    return storageService.query<User[]>('user')
    // return httpService.get(`user`)
}

async function getById(userId: string) {
    const user = await storageService.get('user', userId)
    delete user.password
    // const user = await httpService.get(`user/${userId}`)
    return user as User
}

function remove(userId: string) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(newUser: User) {
    const user = await storageService.get('user', newUser._id)
    return await storageService.put('user', { ...user, ...newUser })
    // return user
}

async function login(userCred: { username: string, password: string }) {
    const users: User[] = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        console.log(userCred.username, 'Logged in')
        return setUserToken(user)
    }
}

async function signup(userCred: User) {
    const { username, password } = userCred
    if (!userCred.imgUrl) userCred.imgUrl = 'https://res.cloudinary.com/dfg5z7qzb/image/upload/v1703238277/profile-img_sll1p9.jpg'
    const user = await storageService.post('user', userCred)
    return await login({ username, password })
    // const user = await httpService.post('auth/signup', userCred)
    // return setUserToken(user as User)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

function setUserToken(user: User) {
    let miniUser = { _id: user._id, username: user.username, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(miniUser))
    return user
}

function getLoggedinUser() {
    const storedUser = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);

    if (storedUser !== null) {
        return JSON.parse(storedUser);
    }

    return null
}

function getEmptyUser() {
    return {
        _id: utilService.makeId(),
        fullname: '',
        username: '',
        password: '',
        imgUrl: '',
        bio: '',
        posts: [],
        savedPosts: [],
        followers: [],
        following: [],
    }
}

function _createUsers() {
    let users = utilService.loadFromStorage('user')
    if (!users || !users.length) {
        users = demoUsers
        utilService.saveToStorage('user', users)
    }
}

async function savePostToList(userId: string, postId: string) {
    const user = await getById(userId)
    user.savedPosts.unshift(postId)
    return update(user)
}

async function removePostFromList(userId: string, postId: string) {
    const user = await getById(userId)
    user.savedPosts = user.savedPosts.filter(id => id !== postId)
    return update(user)
}

async function isPostSaved(userId: string, postId: string) {
    const user = await getById(userId)
    return user.savedPosts.includes(postId)
}


function _buildFollower(user: User) {
    const { _id, username, fullname, imgUrl } = user
    return { _id, username, fullname, imgUrl }
}


async function followUser(userToFollowId: string, loggedUserId: string) {
    let loggedUser = await getById(loggedUserId)
    let userToFollow = await getById(userToFollowId)

    loggedUser.following.unshift(_buildFollower(userToFollow))
    userToFollow.followers.unshift(_buildFollower(loggedUser))

    await update(loggedUser)
    await update(userToFollow)
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()


