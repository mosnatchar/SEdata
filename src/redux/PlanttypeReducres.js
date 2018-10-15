const initialState = {
    
}
const PlanttypeReducres = (state=initialState,action) => {
    switch (action.type) {
        case "SET_PLANT_TYPE":
            state = action.payload
            
            break;
    



        default:
            break;
    }
    return state ;

}
export default PlanttypeReducres;
