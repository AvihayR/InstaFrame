import { userService } from "@/services/user.service.local"
import { UserState, UserToken } from "@/typings"

export const SET_LOGGED_USER = 'SET_LOGGED_USER'
export const UNSET_LOGGED_USER = 'UNSET_LOGGED_USER'


interface Action {
    type: string
    user: UserToken | null
}

const initialState: UserState = {
    loggedUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action: Action) {
    switch (action.type) {
        case SET_LOGGED_USER:
            return { ...state, loggedUser: action.user }
        case UNSET_LOGGED_USER:
            return { ...state, loggedUser: null }
        default: return state
    }
}