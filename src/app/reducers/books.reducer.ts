export const INIT_BOOK_LIST = 'INIT_BOOK_LIST'
export const DELETE_BOOK = 'DELETE_BOOK'

export const books = (state = [], {type, payload}) => {
    // console.log('books Reducer was called with state', state, 'and action', type, payload)
    switch (type) {
        case '@ngrx/store/init':
            return state
        case INIT_BOOK_LIST:
            return [...payload]
        case DELETE_BOOK:
            return state.filter((x) => x.id !== payload.id)
        default:
            return state
    }
}
