import { SystemState } from "@/typings"

export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SET_IS_MODAL_OPEN = 'SET_IS_MODAL_OPEN'

interface Action {
    type: string
    isShown: boolean
}

const initialState: SystemState = {
    isPostModalShown: false,
}

export function systemReducer(state = initialState, action: Action) {
    switch (action.type) {
        case SHOW_MODAL:
            return { ...state, isPostModalShown: true }
        case HIDE_MODAL:
            return { ...state, isPostModalShown: false }
        case SET_IS_MODAL_OPEN:
            return { ...state, isPostModalShown: action.isShown }

        default: return state
    }
}