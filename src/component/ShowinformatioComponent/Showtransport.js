import React, { Component } from 'react'
import { Table, Row, Input } from 'react-materialize'
import Col from 'react-materialize/lib/Col';
import Content from './ContentComponent'
import EditContent from './EditContentComponent'
import EditDateContent from './DatetimeContentComponent'
import { connect } from 'react-redux';
import swal from 'sweetalert'
import { post } from '../../service/service';
import { user_token } from '../../static/Constance';
import RegularRadioButton from '../../component/Plublicformcomponent/RegularRadioButton'

class Showtranspot extends Component {

    constructor() {
        super();
        this.state = {
            edit: false,
            logistic_type: "-",
            logistic_price: "-",
            logistic_insurance: "-",
            logistic_weight_ton: "-",
            logistic_weight_kg: "-",
            insurance_price: "-"

        }
    }
    openModal = () => {
        this.setState({ onOpenModal: true })
    }

    componentDidMount = () => {
        this.setState(this.props)
    }


    componentWillMount() {
        this.setState(this.props)
        console.log("Trarn", this.props)
    }


    _oninput = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }
    _onedit = async (farmer_id) => {

        const { logistic_type, logistic_price, logistic_insurance, logistic_weight_ton, logistic_weight_kg, insurance_price } = this.state
        const object = {
            farmer_id: farmer_id,
            logistic_type: logistic_type,
            logistic_price: logistic_price,
            // logistic_insurance:logistic_insurance, 
            logistic_weight_ton: logistic_weight_ton,
            logistic_weight_kg: logistic_weight_kg,
            insurance_price: insurance_price
        }
        console.log(object)
        try {
            await post(object, "logistic/update_logistic", user_token).then((res) => {
                if (res.success) {

                    swal("เเก้ไขข้อมูลสำเร็จ")
                    this.setState({edit:false})


                } else {

                    alert(res.error_message)
                    console.log("err", farmer_id)
                }






            })


        } catch (err) {
            console.log(1)
        }


    }


    render() {

        const { logistic_type, logistic_price, logistic_insurance, logistic_weight_ton, logistic_weight_kg, insurance_price } = this.state
        const { farmer_information, manufacture_information, factor_information, logistic_information, area_information } = this.props.Showallfarmer.farmer_information_page
        const farmer_id = farmer_information.farmer_id

        let Radio_Props = {
            header: 'การประกันค่าเสียหายระหว่างขนส่ง',
            option: ["มี", "ไม่มี"],
            name: "radio",
            value: this.state.radio,
            _onchange: (event) => this._oninput(event)
        }

        return (
            <div>
                
                
                <Row style={{ borderStyle: 'solid', borderColor: 'palevioletred', borderWidth: 1, borderRadius: 30 }} >
                    {this.state.edit ?
                        <div>

                            <div style={{width:"100%", display:"flex",justifyContent:"center" }} >
                                <div style={{ fontSize: 40, width: 500, fontWeight: "bolder" }}>
                                    การขนส่ง
                        <Row><Col s={12}><Input onChange={(event) => { this._oninput(event) }} value={logistic_type} name={"logistic_type"} s={12} label='ขนส่งด้วย' /></Col></Row>
                                </div>



                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <div style={{ fontSize: 40, fontWeight: "bolder", width: 500 }}>
                                ราคาค่าขนส่ง/หน่วย
                               
                                    <Row><Col s={12}><Input onChange={(event) => { this._oninput(event) }} value={logistic_price} name={"logistic_price"} s={12} type="number" label="ราคา/หน่วย" /></Col></Row>
                                </div>
                            </div>


                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <div style={{ width: 500 }}>
                                    <Row>
                                        <Col s={6}><Input onChange={(event) => { this._oninput(event) }} value={logistic_weight_kg} name={"logistic_weight_kg"} s={6} type="number" label="หน่วยกิโล/ครั้ง" /></Col>
                                        <Col s={6}> <Input onChange={(event) => { this._oninput(event) }} value={logistic_weight_ton} name={"logistic_weight_ton"} s={6} type="number" label="หน่วยตัน/ครั้ง" /></Col>
                                    </Row>
                                </div>
                            </div>

                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <RegularRadioButton {...Radio_Props} />
                            </div>

                            <Row style={{}} >
                            </Row>

                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <div style={{ width: 300 }} >
                                    <Row><Col s={12}><Input onChange={(event) => { this._oninput(event) }} value={insurance_price} name={"insurance_price"} type="number" s={12} label="ราคา" /></Col></Row>
                                </div>
                            </div>


                            {/* <EditContent col={6} name={"logistic_type"} onChange={(event) => { this._oninput(event) }} header={"การข่นส่งผลผลิต"} content={`${logistic_type}`} /> */}
                            {/* <EditContent col={6} onChange={(event) => { this._oninput(event) }} header={"ราคาค่าขนส่ง/หน่วย/ครั้ง"} content={
                                <div >

                                    {logistic_weight_ton} บาท/ตัน
                                <br />
                                    {logistic_weight_kg} บาท/กิโล
                            </div>} /> */}
                            {/* <EditContent col={6} name={"insurance_price"} onChange={(event) => { this._oninput(event) }} header={"ประกันค่าเสียหายระหว่างขนส่ง"} content={`${insurance_price}`} /> */}
                        </div>
                        :
                        <div>
                            <Content col={6} header={"การข่นส่งผลผลิต"} content={`${logistic_type}`} />
                            <Content col={6} header={"ราคาค่าขนส่ง/หน่วย/ครั้ง"} content={
                                <Row >
                                    {logistic_price.logistic_price}

                                    {logistic_price.logistic_kg_ton} 
                                    </Row>

                            }/>
                            <Content col={6} header={"ประกันค่าเสียหายระหว่างขนส่ง"} content={`${insurance_price}`} />
                        </div>
                    }

                        



                </Row>

                        {
                        this.state.edit ?
                         <div style={{ display: 'flex',justifyContent:'center', flexDirection: 'row' }}>
                            <button className="default_button" onClick={() => this._onedit(farmer_id)} >บันทึก</button>
                            <button style={{marginLeft:50}} className="cancle_button" onClick={() => this.setState({ edit: false }) } >ยกเลิก</button>
                        </div> :
                            <button className="cancle_button" onClick={() => { this.setState({ edit: !this.state.edit }) }} >แก้ไข</button>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Showtranspot)