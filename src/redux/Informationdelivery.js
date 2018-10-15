const initialState = {
   
}

const Informationdelivery = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DELIVERY":
            state =  action.payload
            
            
            break;
         
            
         
            
        default:
            break;
    }
    return state;
}

export default Informationdelivery;