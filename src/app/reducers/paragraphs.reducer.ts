export const ADD_PARAGRAPH = 'ADD_PARAGRAPH'
export const LOAD_BOOK = 'LOAD_BOOK'
export const UPDATE_PARAGRAPH = 'UPDATE_PARAGRAPH'

export const paragraphs = (state = [], {type, payload}) => {
    // console.log('paragraphs Reducer was called with state', state, 'and action', type, payload)
    switch (type) {
        case '@ngrx/store/init':
            return state
        case ADD_PARAGRAPH:
            return [...state, payload]
        case LOAD_BOOK:
            return [...payload]
        case UPDATE_PARAGRAPH:
            return state.map(x => {
                if (x.id == payload.id) {
                    return Object.assign({}, x, { paragraph: payload.paragraph })
                } else { return x }
            })
        default:
            return state
    }
}
