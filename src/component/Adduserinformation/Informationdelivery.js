import React, { Component } from 'react'
import { Row, Input, Col } from 'react-materialize'
import { connect } from 'react-redux';
import { user_token } from '../../static/Constance'
import { post } from '../../service/service'
import swal from 'sweetalert'
import RegularRadioButton from '../../component/Plublicformcomponent/RegularRadioButton'

class Informationdelivery extends Component {

    constructor() {
        super()
        this.state = {
            farmer_id: null,
            logistic_type: null,
            logistic_price: null,
            logistic_insurance: "ไม่มี",
            logistic_weight_ton: null,
            logistic_weight_kg: null,
            insurance_price: "-",
            radio: null,
            test_radio: "ไม่ใช่",
            logistic_kg_ton: "กิโล/ครั้ง"

        }
    }


    Onsubmit = async () => {
        let { logistic_kg_ton } = this.state

        let logistic_price = {
            logistic_price: this.state.logistic_price,
            logistic_kg_ton: logistic_kg_ton
        }

        this.setState({ logistic_price: logistic_price })
        console.log(logistic_kg_ton)



        const { farmer_id, logistic_type, logistic_insurance, logistic_weight_ton, logistic_weight_kg
            , insurance_price, radio } = this.state
        const object = {
            farmer_id: this.props.FarmerInformation.farmer_id,
            logistic_type: logistic_type,
            logistic_price: JSON.stringify(logistic_price),
            logistic_insurance: logistic_insurance,
            insurance_price: insurance_price


            // logistic_insurance: radio,


        }
        console.log("object", object)

        if (logistic_type && logistic_price && logistic_insurance 
             && insurance_price) {


            console.log('object', object)
            this.props.setName(object)
            try {
                await post(object, 'logistic/add_logistic', user_token).then((res) => {
                    if (res.success) {
                        this.props.setNextstep(res.result.step)
                        swal("ส่งข้อมูลสำเร็จ")
                        setTimeout(() => {
                            window.location.href = "/management"
                        }, 2000);

                        // this.props.get_order()

                        // this.props.onClose()

                    } else {
                        console.log(res.error_message)
                    }
                })

            } catch (err) {
                console.log(err)
            }
        } else {
            swal("กรุณากรอกข้อมูลให้ครบถ้วน")
        }

    }




    _oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log("event", event.target.value)
    }



    Seletechoie = (event) => {
        console.log("event", event.target)
        // this.setState({[event.target.name]:event.target.value})
    }
    _onsubmit = () => {
        this.props.NextStep()
    }



    _onradio = (event) => {
        console.log(event.target.name)
        this.setState({ logistic_insurance: event.target.value })
    }


    _oncheckbox = event => {
        let index
        let leader_array = this.state[event.target.name]
        console.log("checkbok_leader", this.state[event.target.name].indexOf(event.target.value))
        index = this.state[event.target.name].indexOf(event.target.value)
        if (index === -1) {
            leader_array.push(event.target.value)
        } else {
            leader_array.splice(index, 1)
        }
        this.setState({ [event.target.name]: leader_array })
    }

    componentWillMount = () => {
        if (this.props.Delivery) {
            this.setState(this.props.Delivery)
        }
        // this.props.setNextstep(4)
    }



    render() {
        const { farmer_id,
            logistic_type,
            logistic_price,
            logistic_weight_ton,
            logistic_weight_kg,
            insurance_price,
            logistic_kg_ton,
            year_value,
            logistic_insurance,
            radio } = this.state





        let Radio_Props = {
            header: 'การประกันค่าเสียหายระหว่างขนส่ง',
            option: ["มี", "ไม่มี"],
            name: "logistic_insurance",
            value: logistic_insurance,
            _onchange: (event) => this._oninput(event)
        }



        return (
            <div style={{ padding: 50 }}>

                <div style={{ width: 600, }}>
                    <Row>
                        <Col s={6}>
                            <div style={{ fontSize: 25 }}>
                                การขนส่ง
                            </div>
                            <Input onChange={(event) => { this._oninput(event) }} value={logistic_type} name='logistic_type' s={12} label='ขนส่งด้วย' />
                        </Col>
                        <Col s={6}>
                            <div style={{ fontSize: 25 }}>
                                ราคาค่าขนส่ง(บาท)
                            </div>
                            <Input onChange={(event) => { this._oninput(event) }} value={logistic_price} name='logistic_price' s={8} type="number" label="ราคา/บาท" />
                            <Input s={4} type='select' name="logistic_kg_ton" value={logistic_kg_ton} onChange={(event) => this.setState({ logistic_kg_ton: event.target.value })}  >
                                <option value='กิโล'>กิโล/ครั้ง </option>
                                <option value='ตัน'>ตัน /ครั้ง </option>
                            </Input>
                        </Col>
                    </Row>



                
                    <Row>
                        <Col s={6}>
                            <RegularRadioButton {...Radio_Props} />
                        </Col>
                        {logistic_insurance==="มี" ? <Col s={6}>
                            <div style={{ fontSize: 25 }}>
                                ราคาประกันการขนส่ง(บาท)
                            </div>
                            <Input onChange={(event) => { this._oninput(event) }} value={insurance_price} name='insurance_price' type="number" s={12} label="ราคา/บาท" />

                        </Col>
                        :null}
                        
                    </Row>


                </div>








                {/*              
                <div style={{ fontSize: 25, marginBottom: 20, marginLeft: 300, width: 300 }}>
                   
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Row>

                            <Col style={{ fontSize: 20 }} s={8}>
                                <Input s={12} type='select' name="logistic_kg_ton" value={logistic_kg_ton} onChange={(event) => this.setState({ logistic_kg_ton: event.target.value })} defaultValue="กิโล" >
                                    <option value='กิโล'>กิโล/ครั้ง </option>
                                    <option value='ตัน'>ตัน /ครั้ง </option>
                                </Input>
                            </Col>
                        </Row>
                    </div>








                </div>
 */}

                {/* <div style={{ width: 500, marginLeft: 300 }}>
                    <Row>
                        <Col s={6}><Input onChange={(event) => { this._oninput(event) }} value={logistic_weight_kg} name='logistic_weight_kg' s={6} type="number" label="หน่วยกิโล/ครั้ง" /></Col>
                        <Col s={6}> <Input onChange={(event) => { this._oninput(event) }} value={logistic_weight_ton} name='logistic_weight_ton' s={6} type="number" label="หน่วยตัน/ครั้ง" /></Col>
                    </Row>


                </div> */}
                {/* <div style={{ fontSize: 25, marginBottom: 20, marginLeft: 300 }}>
                    การประกันค่าเสียหายระหว่างขนส่ง
                        </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 300 }} defaultValue={radio} onChange={(event) => this._onradio(event)}>

                    <input type="radio" name="radio" value="มี" id="q_1_1" /><label for="q_1_1">มี</label>
                    <input type="radio" name="radio" value="ไม่มี" id="q_1_2" /><label for="q_1_2">ไม่มี</label>

                </div> */}





                {/* <div style={{ marginLeft: 300 }}>
                    <RegularRadioButton {...Radio_Props} />
                </div>


                <div style={{ width: 300, marginLeft: 300 }}>
                    <Row>
                        <Col s={12}>
                            <Input onChange={(event) => { this._oninput(event) }} value={insurance_price} name='insurance_price' type="number" s={12} label="ราคา" />
                        </Col>
                    </Row>

                </div>
                */}
             
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 300,marginTop:50 }}>
                    <button style={{ width: 100, marginRight: 20 }} onClick={() => { this.Onsubmit() }} className="default_button">ตกลง</button>
                    <button style={{ width: 100 }} className="cancle_button">ยกเลิก</button>
                </div> 







            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        FarmerInformation: state.FarmerInformation,
        Delivery: state.Delivery
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setName: (deliverydata) => {
            dispatch(
                {
                    type: "SET_DELIVERY",
                    payload: deliverydata
                }

            )
        },

        setNextstep: (next_step) => {
            dispatch(
                {
                    type: "SET_NEXT_STEP",
                    payload: next_step
                }

            );
        }


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Informationdelivery)