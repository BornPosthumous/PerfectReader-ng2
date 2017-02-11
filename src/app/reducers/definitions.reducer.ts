export const ADD_DEF = 'add_def'

export const definitions = (state = [], {type, payload}) => {
    switch (type) {
        case ADD_DEF:
            return [...state, payload];
    }
    return state

}

