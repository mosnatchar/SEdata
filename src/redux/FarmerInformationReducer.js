const initialState = {
    name: "",
    farmer_id:null,
    next_step:null,
    farmer_information:null

    
}

const FarmerInformationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FARMER_INFORMATION":
            state = {
                ...state,
                farmer_information: action.payload,
               
            }
            break;
            case "SET_FARMER_ID":
            state={
                ...state,
                farmer_id:action.payload
            }
            break;
            case "SET_NEXT_STEP":
            state={
                ...state,
                next_step:action.payload

            }
            break;
        default:
            break;
    }
    return state;
}




export default FarmerInformationReducer;