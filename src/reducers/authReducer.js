

//Reducer for auth information Initialize State

const initState = {
    token: null,
    uid: null,
    id: null,
    isAuthenticated: false,
    user: null
}
//Define Actions
const authReducer = (state = initState, action) => {

    switch (action.type) {
        //Change auth name
        case 'TOKEN':
            return {
                ...state,
                token: action.payload
            }

        case 'UID':
            return {
                ...state,
                uid: action.payload
            }
        case 'ID':
            return {
                ...state,
                id: action.payload
            }
        case 'IS_AUTH':
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case 'USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default authReducer;