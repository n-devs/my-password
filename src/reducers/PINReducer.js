//Reducer for PIN information Initialize State
const initState = {
    PIN: null
}

//Define Actions
const PINReducer = (state = initState, action) => {
    switch (action.type) {
        //Change PIN 
        case 'PIN':
            return {
                ...state,
                PIN: action.payload
            }
        default:
            return state
    }
}

export default PINReducer;