import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import App from '../App'
import HomeActivity from '../screen/HomeActivity/HomeActivity';
import OrderActivity from '../component/OrderActivity/OrderActivity'
import PlanActivity from '../screen/PlanActivity/PlanActivity'
import Inputinformation from '../component/Adduserinformation/Inputinformation'
import InformationManufacturing from '../component/Adduserinformation/InformationManufacturing'
import Informationdelivery from '../component/Adduserinformation/Informationdelivery'
import InformationCultivatedarea from '../component/Adduserinformation/InformationCultivatedarea'
import Infromationroot from '../screen/Informationroot/Informationroot';
import SeActivity from '../component/SeActivity/SeActivity';
import SeProduct from '../component/SeActivity/SeProduct/SeProduct'
import ManagementActivity from '../screen/ManagementActivity/ManagementActivity'
import ShowInformation from '../screen/ShowInformation/ShowInformation'
import ShowInformationfamer from '../component/ShowinformatioComponent/ShowInformationfamer'


class RouterChild extends Component {

    


    render() {
        return (
            <div>

                <Route exact path="/" component={HomeActivity} />
                <Route path="/homeactivity" component={ShowInformationfamer} />
                <Route path="/Order" component={OrderActivity} />
                <Route path="/Plan" component={PlanActivity}/>
                <Route path="/inputinformation" component={Inputinformation} />
                <Route path="/informationmanufacturing" component={InformationManufacturing} />
                <Route path="/informationdelivery" component={Informationdelivery} />
                <Route path="/informationcultivatedarea" component={InformationCultivatedarea} />
                <Route path="/inputdata" component={Infromationroot} />
                <Route path="/Se" component={SeActivity} />
                <Route path="/SeProduct" component={SeProduct} />
                <Route path="/management" component={ManagementActivity} />
                <Route path="/showinformation" component={ShowInformation} />
                

                {/* <Route path="/productionfactor" component={Productionfactor} /> */}


            </div>
        )
    }
}
export default RouterChild