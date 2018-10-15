const initialState = {
    farmer_information_page : null
   
}
const ShowallinformationFamer =(state=initialState,action)=>{
    switch(action.type){
        case "Set_ALLINFORMATIONFAMER" :

                state=action.payload


            break;
            case "Set_INFORMATIONFAMER_UNIQUE" :

                state={...state,
                    farmer_information_page : action.payload
                }


            break;


            default:
             break;

    }
    return state;





}
export default ShowallinformationFamer;
