const initialState = {
    currentBook: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_BOOK":

            return {...state, currentBook: { ...action.payload } }
        default: return state
    }
}


export default reducer