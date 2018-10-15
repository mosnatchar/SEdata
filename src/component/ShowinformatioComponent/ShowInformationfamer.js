import React, { Component } from 'react';
import './ShowInformation.css';
import Content from './ContentComponent'
import Table from 'react-materialize/lib/Table';
import { Row, Icon, Input } from 'react-materialize';
import Col from 'react-materialize/lib/Col';
import moment from 'moment'
import localization from 'moment/locale/th';
import MemberCpmponent from '../ModalComponent/MemberComponent'
import Inoutinfofmation from '../../component/Adduserinformation/Inputinformation'
import Inputinformation from '../../component/Adduserinformation/Inputinformation';
import EditContent from './EditContentComponent'
import EditDateContent from './DatetimeContentComponent'
import { post } from '../../service/service';
import { user_token } from '../../static/Constance';
import { connect } from 'react-redux';
import swal from 'sweetalert'
import Modal from 'react-responsive-modal'
import { Province } from '../../static/Province'
import Select from 'react-select'
import { Aumpore, Ampore } from '../../static/Aumpore'

moment.locale("th", localization)

class ShowInformationfamer extends Component {

    constructor() {
        super();
        this.state = {
            edit: false,
            farmer_id: null,
            first_name: null,
            last_name: null,
            leader: null,
            address: null,
            age: null,
            radio: null,
            member: null,
            duration: null,
            passion: null,
            ampore: []





        }
    }


    // Onsubmit = async () => {
    //     const { first_name, last_name, age, address, member, passion, date_time, member_box_array,duration } = this.state
    //     const object = {
    //         first_name: first_name,
    //         last_name: last_name,
    //         member:member,
    //         age: moment(age).format("YYYY-MM-DD"),
    //         address: address,
    //         duration: moment(duration).format("YYYY-MM-DD"),

    //         member: JSON.stringify(member_box_array),

    //         passion: passion,
    //         farmer_id: this.props.FarmerInformation.farmer_id || null



    //     }
    // }



    openModal = () => {
        this.setState({ onOpenModal: true })
    }

    closeModal = () => {
        this.setState({ onOpenModal: false })
    }

    componentWillMount() {
        this.setState(this.props)
        console.log("leader", this.props)


    }
    _oninput = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }

    _oninput_date = (value, name) => {

        this.setState({ [name]: value })
    }

    _onedit = async (farmer_id) => {

        const { first_name, last_name, leader, address, age, radio, member, duration, passion } = this.state

        const object = {
            farmer_id: farmer_id,
            first_name: first_name,
            last_name: last_name,
            leader: leader,
            address: JSON.stringify(address),
            age: age,
            radio: radio,
            member: member,
            duration: duration,
            passion: passion
        }


        try {
            await post(object, "farmer/user_update_farmer", user_token).then((res) => {
                if (res.success) {

                    swal("เเก้ไขข้อมูลสำเร็จ")
                    this.setState({ edit: false })


                } else {

                    alert(res.error_message)
                    console.log("err", farmer_id)
                }






            })


        } catch (err) {
            console.log(1)
        }


    }


    onSelect = (event) => {
        this.setState({
            address: {
                ...this.state.address,
                province: event.label,
                district: null
            }
        })
        let ampore = []

        Ampore.map((element) => {
            if (event.pid === element.changwat_pid) {
                ampore.push(element)
            }
        })

        this.setState({ ampore_option: ampore })
    }


    onSelect_ampore = (event) => {
        this.setState({
            address: {
                ...this.state.address,
                district: event.label
            }
        })
    }
    _oninput_address = event => {
        this.setState({
            address: {
                ...this.state.address,
                [event.target.name]: event.target.value
            }
        })
    }

    render() {
        const { first_name, last_name, address, leader, age, radio, member, duration, passion, farmer_information_page } = this.state
        const { farmer_information, manufacture_information, factor_information, logistic_information, area_information } = this.props.Showallfarmer.farmer_information_page
        const farmer_id = farmer_information.farmer_id


        return (
            <div >


                {/* <button onClick={() => console.log(farmer_information)}>test</button>
                <h1> ข้อมูลส่วนตัวเกษตรกร </h1> */}

                <div>


                    <Row style={{ borderStyle: "solid", borderColor: 'palevioletred', borderWidth: 1, borderRadius: 30 }}>

                        {this.state.edit ?
                            <div>
                                <EditContent col={6} name={"first_name"} onChange={(event) => { this._oninput(event) }} header={"ชื่อ"} content={`${first_name}`} />
                                <EditContent col={6} name={"last_name"} onChange={(event) => { this._oninput(event) }} header={"นามสกุล"} content={`${last_name}`} />
                                <EditDateContent col={6} name={"age"} header={"อายุ "} onChange={(value, name) => { this._oninput_date(value, name) }} date={age} />



                                <Col s={6}>
                                    <Col s={4}>
                                        <div style={{ fontSize: 25 }}>
                                            จังหวัด
                                        </div>
                                    </Col>
                                    <Col style={{ fontSize: 20 }} s={8}>
                                        <Select

                                            value={typeof address.province === "object" ?
                                                address.province :
                                                { label: address.province }
                                            }
                                            onChange={(event) => this.onSelect(event)}
                                            options={Province}
                                        />
                                    </Col>
                                </Col>

                                <Col s={6}>
                                    <Col s={4}>
                                        <div style={{ fontSize: 25 }}>
                                            อำเภอ
                                        </div>
                                    </Col>
                                    <Col style={{ fontSize: 20 }} s={8}>


                                        <Select
                                            value={typeof address.district === "object" ?
                                                address.district :
                                                { label: address.district }
                                            }
                                            onChange={(event) => this.onSelect_ampore(event)}
                                            options={this.state.ampore_option}
                                        />



                                    </Col>
                                </Col>

                                <EditContent col={6} name={"detail"} onChange={(event) => { this._oninput_address(event) }} header={"ที่อยู่"} content={`${address.detail}`} />
                                <EditContent col={6} name={"postcode"} onChange={(event) => { this._oninput_address(event) }} header={"รหัสไปรษณี"} content={`${address.postcode}`} />


                                {/* <Input value={this.state.address.detail} onChange={(event) => this._oninput_address(event)} name="detail" type="text" label="ที่อยู่" s={12} />
                                <Input value={this.state.address.postcode} onChange={(event) => this._oninput_address(event)} name="postcode" type="text" label="รหัสไปรษณี" s={12} /> */}

                                <div col={6}  style={{ fontSize: 40,marginRight:170,fontWeight:"bolder" }}> หัวหน้าครอบครัว </div>
                                <div  style={{ width: "100%" }} >
                                    <div col={6} style={{ width: 400 ,float:"right",marginRight:30 }} >
                                        <Input  type='select' name="leader" value={leader} onChange={(event) => this.setState({ leader: event.target.value })} s={6}  >
                                            <option value='พ่อ'>พ่อ </option>
                                            <option value='เเม่'>เเม่  </option>
                                            <option value='ญาติ'>ญาติ  </option>

                                        </Input>
                                    </div>
                                </div>

                                {/* <Content col={6} onChange={(event) => { this._oninput(event) }} header={"สมาชิกในครอบครัว"} content={
                                    <div onClick={() => this.openModal()}  >
                                        <Modal
                                            trigger={<div style={{ cursor: "pointer" }} ><button className='default_button' >ดูข้อมูลเพิ่มเติม</button></div>} >
                                            <div style={{ textIndent: 30 }} >  <MemberCpmponent /> </div>
                                        </Modal>

                                    </div>} /> */}
                                <EditDateContent col={6} name={"duration"} header={"ระยะการทำเกษตร"} onChange={(value, name) => { this._oninput_date(value, name) }} date={duration} />
                                <EditContent col={6} name={"passion"} onChange={(event) => { this._oninput(event) }} header={"แรงบันดาลใจในการทำเกษตรอินทรีย์"} content={passion} />

                            </div>
                            :
                            <div>
                                <Content col={6} header={"ชื่อ-นามสกุล"} content={`${first_name}  ${last_name}`} />
                                <Content col={6} header={"อายุ "} content={`${moment().format('YYYY') - moment(age).format('YYYY')} ปี`} />
                                <Content col={6} header={"ที่อยู่"} content={

                                    <div style={{ textAlign: 'left' }}>
                                        <Col s={12} >
                                            <div >
                                                {address.detail}
                                            </div>

                                        </Col>
                                        <Col s={12}>

                                            <div >
                                                {address.district}
                                            </div>

                                        </Col>

                                        < Col s={12}>
                                            <div style={{ textAlign: 'left', flexDirection: 'row' }}>
                                                {address.province}  {address.postcode}
                                            </div>

                                        </Col>

                                    </div>


                                } />
                                <Content col={6} header={"หัวหน้าครอบครัว"} content={`${leader}`} />

                                <Content col={6} header={"สมาชิกในครอบครัว"} content={
                                    <div onClick={() => this.openModal()}  >
                                        <button className='default_button' >ดูข้อมูลเพิ่มเติม</button>
                                    </div>} />
                                <Content col={6} header={"ระยะการทำเกษตร"} content={`${moment(duration).fromNow()}`} />
                                <Content col={6} header={"แรงบันดาลใจในการทำเกษตรอินทรีย์"} content={passion} />


                            </div>

                        }




                    </Row>

                    {
                        this.state.edit ?
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                <button className="default_button" onClick={() => this._onedit(farmer_id)} >บันทึก</button>
                                <button style={{ marginLeft: 50 }} className="cancle_button" onClick={() => this.setState({ edit: false })} >ยกเลิก</button>
                            </div> :
                            <button className="cancle_button" onClick={() => { this.setState({ edit: !this.state.edit }) }} >แก้ไข</button>
                    }






                </div>

                <Modal styles={{ backgroundColor: '#FFFF66', width: 500, heigh: 1000 }} open={this.state.onOpenModal} onClose={() => { this.closeModal() }} >

                    <div style={{ textIndent: 30 }} >  <MemberCpmponent {...this.props} /> </div>
                </Modal>

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
export default connect(mapStateToProps, mapDispatchToProps)(ShowInformationfamer)