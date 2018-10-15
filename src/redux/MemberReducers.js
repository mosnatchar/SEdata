const initialState ={

}
const Memberreducers = (state = initialState,action)=>{
        switch (action.type) {
            case "SET_MEMBER" :
                state = action.payload
                
                break;

                
        

            default:
                break;
        }
        return state;

}
export default Memberreducers;