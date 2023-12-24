export const utilService = {
    makeId,
    capitalizeFirstLetter,
    makeLorem,
    getRandomIntInclusive,
    getRandomFloat,
    debounce,
    timeAgo,
    formatDate,
    loadFromStorage,
    saveToStorage
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function capitalizeFirstLetter(str) {
    if (!str || str.length === 0) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomFloat(min, max) {
    const randomFloat = Math.random() * (max - min) + min;
    return Math.round(randomFloat * 10) / 10
}


function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}


function timeAgo(timestamp) {
    let seconds = Math.floor((new Date() - timestamp) / 1000)
    let interval = seconds / 31536000
    interval = seconds / 604800
    if (interval > 1) {
        return Math.floor(interval) + "w"
    }
    interval = seconds / 86400
    if (interval > 1) {
        return Math.floor(interval) + "d"
    }
    interval = seconds / 3600
    if (interval > 1) {
        return Math.floor(interval) + "h"
    }
    interval = seconds / 60
    if (interval > 1) {
        return Math.floor(interval) + "m"
    }
    return "Just now"
}

function formatDate(date) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear()

    return `${month} ${day}, ${year}`
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}