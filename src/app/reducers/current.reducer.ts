export const NEW_PARAGRAPH = 'NEW_PARAGRAPH'
export const CURRENT_PARAGRAPH = 'CURRENT_PARAGRAPH'
export const NEW_BOOK = 'NEW_BOOK'

export const current = (state = {}, {type, payload}) => {
    switch (type) {
        case '@ngrx/store/init':
            return state
        case NEW_BOOK:
            return Object.assign({}, state, { currentBook: payload })
        case NEW_PARAGRAPH:
            return Object.assign({}, state, { currentParagraphID: payload })
        case CURRENT_PARAGRAPH:
            return Object.assign({}, state, { currentParagraph: payload })

        default:
            return state
    }
}
