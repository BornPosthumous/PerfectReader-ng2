export const WIKIDATA = 'WIKIDATA'

export const wiki = (state = [], {type, payload}) => {
    switch (type) {
        case '@ngrx/store/init':
            return state
        case WIKIDATA:
            return payload
        default:
            return state
    }
}
