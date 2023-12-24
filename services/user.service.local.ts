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
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser
}

_createUsers()

function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}



async function getById(userId: string) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId: string) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, newUser }: { _id: string, newUser: User }) {
    const user = await storageService.get('user', _id)
    await storageService.put('user', user)
    return user
}

async function login(userCred: { username: string, password: string }) {
    const users: User[] = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        console.log(userCred)
        return saveLocalUser(user)
    }
}

async function signup(userCred: User) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://res.cloudinary.com/dgsfbxsed/image/upload/v1698775961/user-96_hcptba.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user as User)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

function saveLocalUser(user: User) {
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
        fullname: '',
        username: '',
        password: '',
        desc: '',
        isSeller: '',
        location: 'Israel',
        rate: utilService.getRandomFloat(4.5, 5),
        reviews: [],
        lang: ["English", "Hebrew"],
        level: 1
    }
}

function _createUsers() {
    let users = utilService.loadFromStorage('user')
    if (!users || !users.length) {
        users = demoUsers
        utilService.saveToStorage('user', users)
    }
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()


