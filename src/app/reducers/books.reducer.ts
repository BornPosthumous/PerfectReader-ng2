export const INIT_BOOK_LIST = 'INIT_BOOK_LIST'

export const books = (state = [], {type, payload}) => {
    // console.log('books Reducer was called with state', state, 'and action', type, payload)
    switch (type) {
        case '@ngrx/store/init':
            return state
        case INIT_BOOK_LIST:
            return [...payload]
        default:
            return state
    }
}
