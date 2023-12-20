export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

interface Action {
    type?: string
}

const initialState = {
    isPostModalShown: false,
}

export function systemReducer(state = initialState, action: Action = {}) {
    switch (action.type) {
        case SHOW_MODAL:
            return { ...state, isPostModalShown: true }
        default: return state
    }
}