import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';


import FarmerInformationReducer from './FarmerInformationReducer';
import InformationManufacturing from './InformationManufacturing';
import InformationCultivatedarea from './InformationCultivatedarea';
import Informationdelivery from './Informationdelivery';
import ShowallinformationFamer from './ShowallinformationFamer';
import Memberreducers from './MemberReducers';
import InformationFactor from './InformationFactor';
import PlanttypeReducres from './PlanttypeReducres';




const rootReducer = combineReducers({
    FarmerInformation: FarmerInformationReducer,
    Manufacturing : InformationManufacturing,
    Area : InformationCultivatedarea,
    Delivery:Informationdelivery,
    router: routerReducer,
    Showallfarmer:ShowallinformationFamer,
    Member: Memberreducers,
    Factor : InformationFactor,
    Plant_type: PlanttypeReducres

   

});

export default rootReducer;
