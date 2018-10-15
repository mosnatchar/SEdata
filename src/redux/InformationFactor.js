

const initialState = {
   
}

const InformationFactor = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FACTOR":
            state =  action.payload
            
            
            break;
         
            
         
            
        default:
            break;
    }
    return state;
}

export default InformationFactor;