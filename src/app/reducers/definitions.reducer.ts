export const ADD_DEF = 'add_def'

export const definitions = (state = [], {type, payload}) => {
    // console.log('definitions reducer was called with state', state, 'and action', type, payload)
    switch (type) {
        case '@ngrx/store/init':
            return state
        case ADD_DEF:
            return [...state, payload];
        default:
            return state
    }
}
