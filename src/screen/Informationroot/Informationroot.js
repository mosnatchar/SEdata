import React, { Component } from 'react'
import './Informationroot.css'
import Inputinformation from '../../component/Adduserinformation/Inputinformation'
import InformationManufacturing from '../../component/Adduserinformation/InformationManufacturing';
import InformationCultivatedarea from '../../component/Adduserinformation/InformationCultivatedarea'
import Informationdelivery from '../../component/Adduserinformation/Informationdelivery';
import Productionfactor from '../../component/Adduserinformation/Productionfactor';
import { Col } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { user_token } from '../../static/Constance'

import farmer from '../../asset/image/logo/famer.png'
import manufactor from '../../asset/image/logo/grown.png'
import factor from '../../asset/image/logo/factor.png'
import ares from '../../asset/image/logo/area.png'
import logistic from '../../asset/image/logo/logistic.png'
class Infromationroot extends Component {

    constructor() {
        super();
        this.state = {
            step: 1
        }
    }

    render() {
        const { step } = this.state
        if (!user_token) {
            return <Redirect push to="/" />;
        }
        const StepPros = {
            NextStep: () => { this.setState({ step: this.state.step += 1 }) }
        }
        return (
            <div className="container" style={{ marginTop: 60 }}>

                <div style={{ fontSize: 50, textAlign: 'center' }}>
                    เพิ่มข้อมูลเกษตรกร
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                    <div className="step" onClick={() => { this.setState({ step: 1 }) }} style={{ background: step >= 1 ? "#c3dba650" : "transparent" }}>
                        <img className="step_logo" src={farmer} style={{ tintColor: "#fff" }} />
                    </div>

                    <div className="step" onClick={parseInt(this.props.FarmerInformation.next_step) >= 1 ? () => { this.setState({ step: 2 }) } : null} style={{ background: step >= 2 ? "#a6dbc850" : "transparent", cursor: parseInt(this.props.FarmerInformation.next_step) >= 1 ? "pointer" : "not-allowed" }}>
                        <img className="step_logo" src={manufactor} />
                    </div>

                    <div className="step" onClick={parseInt(this.props.FarmerInformation.next_step) >= 2 ? () => { this.setState({ step: 3 }) } : null} style={{ background: step >= 3 ? "#a6c2db50" : "transparent", cursor: parseInt(this.props.FarmerInformation.next_step) >= 2 ? "pointer" : "not-allowed" }}>
                        <img className="step_logo" src={factor} />
                    </div>

                    <div className="step" onClick={parseInt(this.props.FarmerInformation.next_step) >= 3 ? () => { this.setState({ step: 4 }) } : null} style={{ background: step >= 4 ? "#aaa6db50" : "transparent", cursor: parseInt(this.props.FarmerInformation.next_step) >= 3 ? "pointer" : "not-allowed" }}>
                        <img className="step_logo" src={ares} />
                    </div>

                    <div className="step" onClick={parseInt(this.props.FarmerInformation.next_step) >= 4 ? () => { this.setState({ step: 5 }) } : null} style={{ background: step >= 5 ? "#c8a6db50" : "transparent", cursor: parseInt(this.props.FarmerInformation.next_step) >= 4 ? "pointer" : "not-allowed" }}>
                        <img className="step_logo" src={logistic} />
                    </div>


                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>


                    <div style={{ alignItems: "center" }}>
                        {step === 1 ?
                            <div>
                                <div className="header_page">
                                    ข้อมูลส่วนตัวเกษตรกร
                                </div>
                                <Inputinformation {...StepPros} />
                            </div> :
                            step === 2 ?
                                <div >
                                    <div className="header_page">
                                        ข้อมูลการผลิต
                                    </div>
                                    <InformationManufacturing {...StepPros} />
                                </div> :
                                step === 3 ?
                                    <div >
                                        <div className="header_page">
                                            ปัจจัยการผลิต
                                        </div>
                                        <Productionfactor {...StepPros} />
                                    </div> :
                                    step === 4 ?
                                        <div >
                                            <div className="header_page">
                                                ข้อมูลพื้นที่เพาะปลูก
                                            </div>
                                            <InformationCultivatedarea {...StepPros} />
                                        </div> :
                                        step === 5 ?
                                            <div >
                                                <div className="header_page">
                                                    ข้อมูลการขนส่งสินค้า
                                                </div>
                                                < Informationdelivery {...StepPros} />
                                            </div> :
                                            null
                        }
                    </div>
                </div>

                {/* <button className="default_button" onClick={()=>{this.setState({step:this.state.step+=1})}}>ตกลง</button> */}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        FarmerInformation: state.FarmerInformation
    }
}
export default connect(mapStateToProps, null)(Infromationroot)