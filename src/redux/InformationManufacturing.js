const initialState = {
    plant_type_array:[]
}

const InformationManufacturing = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MANUFACTURING":
            state = action.payload


            break;
        case "SET_MANUFACTURING_PLANT_TYPE":
            state = {
                ...state,
                plant_type_array : action.payload
            }


            break;




        default:
            break;
    }
    return state;
}

export default InformationManufacturing;