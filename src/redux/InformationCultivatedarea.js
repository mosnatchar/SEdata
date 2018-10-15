const initialState = {
   
}

const InformationCultivatedarea = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AREA":
            state =  action.payload
            
            
            break;
         
            
         
            
        default:
            break;
    }
    return state;
}

export default InformationCultivatedarea;