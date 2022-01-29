const initialState = {
    currentBook: {},
    currentClub: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_CURRENT_BOOK":
            return { ...state, currentBook: { ...action.payload } }

        case "SET_CURRENT_CLUB":
            return { ...state, currentClub: { ...action.payload } }

        default: return state
    }
}


export default reducer