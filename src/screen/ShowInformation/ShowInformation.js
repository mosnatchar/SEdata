import React, { Component } from 'react'
import { Collection, CollectionItem, Tab, Tabs, Input, Row, Icon } from 'react-materialize';
import ShowInformationfamer from '../../component/ShowinformatioComponent/ShowInformationfamer'
import Showmanufacturing from '../../component/ShowinformatioComponent/Showmanufacturing'
import Showproductionfactor from '../../component/ShowinformatioComponent/Showproductionfactor'
import Showcultivatedarea from '../../component/ShowinformatioComponent/Showcultivatedarea'
import Showtransport from '../../component/ShowinformatioComponent/Showtransport'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Table from 'react-materialize/lib/Table';
import './ShowInformation.css'
import { user_token } from '../../static/Constance'


class ShowInformation extends Component {

    constructor() {
        super();
        this.state = {
            step: 1
        }
    }



    componentWillMount() {

        if (this.props.Showallfarmer.farmer_information_page !== null) {
            console.log(this.props.Showallfarmer.farmer_information_page)

        }

        else {

            // window.location.href = "/management"
        }

    }






    render() {

        //  const { step } = this.state
        const StepPros = {
            NextStep: () => { this.setState({ step: this.state.step += 1 }) }
        }

        if (!user_token) {
            return <Redirect push to="/" />;
        } else if (!this.props.Showallfarmer.farmer_information_page) {
            return <Redirect push to="/management" />;
        }


        const { step } = this.props.Showallfarmer.farmer_information_page.farmer_information
        const { farmer_information, manufacture_information, factor_information, logistic_information, area_information } = this.props.Showallfarmer.farmer_information_page





        return (


            <div>


                <div >
                    {/* {this.props.Showallfarmer.farmer_information_page.farmer_information.step}

                    <div style={{ marginLeft: 50, marginTop: 20 }} >
                        <div>
                            <div style={{ display: "flex", textAlign: "center", flexDirection: "row" }} >
                                <div style={{ width: 250, textAlign: "center" }} >
                                    <Collection>

                                        <CollectionItem style={{ height: 200 }} >รูป</CollectionItem>

                                    </Collection>
                                </div>
                                <Row >
                                    <Input s={5} label="First Name" validate><Icon>account_circle</Icon></Input>
                                    <Input s={4} label="Last Name" validate />
                                    <Input s={5} label="Address" validate><Icon>home</Icon></Input>
                                    <Input s={4} label="Telephone" validate type='tel'><Icon>phone</Icon></Input>
                                </Row>
                            </div>
                        </div>
                    </div> */}
                    {this.props.Showallfarmer.farmer_information_page ?
                        <div style={{ display: "flex", justifyContent: 'center', marginTop: 20 }} >
                            <div style={{ width: 1000, textAlign: 'center', fontSize: 40 }} >
                                <Tabs style={{ width: 1000 }}   >
                                    <Tab title="ข้อมูลส่วนตัวเกษตรกร" active  >
                                        <div style={{ marginTop: 50 }}>
                                            <ShowInformationfamer   {...farmer_information} />
                                        </div>
                                    </Tab>
                                    <Tab title="ข้อมูลการผลิต" >
                                        <div style={{ marginTop: 50 }}>
                                            <Showmanufacturing {...manufacture_information} />
                                        </div>
                                    </Tab>
                                    <Tab title="ปัจจัยการผลิต" >
                                        <div style={{ marginTop: 50 }}>
                                            <Showproductionfactor {...factor_information} />
                                        </div>
                                    </Tab>
                                    <Tab title="ข้อมูลพื้นที่เพาะปลูก">
                                        <div style={{ marginTop: 50 }}>
                                            <Showcultivatedarea {...area_information} />
                                        </div>
                                    </Tab>
                                    <Tab title="การขนส่ง" >
                                        <div style={{ marginTop: 50 }}>
                                            <Showtransport {...logistic_information} />
                                        </div>
                                    </Tab>
                                </Tabs>

                            </div>
                        </div>

                        : null}



                </div>





            </div>



        )
    }

}
const mapStateToProps = (state) => {
    return {
        FarmerInformation: state.FarmerInformation,
        Showallfarmer: state.Showallfarmer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        setName: (name) => {
            dispatch(
                {
                    type: "SET_NAME_PENDING",
                    payload: name
                }

            );
        },
        setNextStep: (name) => {
            dispatch(
                {
                    type: "SET_NEXT_STEP",
                    payload: name
                }

            );
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowInformation)