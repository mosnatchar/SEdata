import React, { Component } from 'react'
import { Row, Input, Icon, Col } from 'react-materialize'
import { post, get } from '../../service/service'
import { connect } from 'react-redux';
import { user_token } from '../../static/Constance'
import moment from 'moment'
import swal from 'sweetalert'
import { DatePicker, version } from 'antd'
import Select from 'react-select';
import { Province } from '../../static/Province'
import RegularRadioButton from '../../component/Plublicformcomponent/RegularRadioButton'
import './SelectBox.css'
import Modal from 'react-responsive-modal'
import { Aumpore, Ampore } from '../../static/Aumpore'

class Inoutinfofmation extends Component {
    sports = ["Baseball", "Basketball", "Cricket", "Field Hockey", "Football", "Table Tennis", "Tennis", "Volleyball"];


    constructor() {
        super()
        this.state = {
            checkbox_leader: [],
            first_name: null,
            last_name: null,
            age: null,

            address: {
                province: null,
                district: null,
                detail: null,
                postcode: null
            },
            Province: null,
            district: null,
            date_time: null,
            member: null,
            passion: null,
            radio: null,
            testRadio: null,
            member_box: [],
            member_box_array: [],

            first_member: null,
            last_member: null,
            age_member: null,
            education_member: null,
            Department_member: null,

            edit_first_member: null,
            edit_last_member: null,
            edit_age_member: null,
            edit_education_member: null,
            edit_Department_member: null,
            edit_index_member: null,

            duration: moment().format("YYYY-MM-DD"),
            test_date: moment("7-8-2018").format("YYYY-MM-DD"),


            leader: "พ่อ"






        }

    }

    Onsubmit = async () => {


        const { leader, first_name, last_name, age, address, member, passion, date_time, member_box_array, duration } = this.state


        const object = {
            first_name: first_name,
            last_name: last_name,
            age: moment(age).format("YYYY-MM-DD"),
            address: JSON.stringify(address),
            duration: moment(duration).format("YYYY-MM-DD"),

            member: JSON.stringify(member_box_array),

            passion: passion,
            farmer_id: this.props.FarmerInformation.farmer_id || null,
            leader: leader



        }




        console.log("object", this.state)
        this.props.setMember(member_box_array)
        if (first_name && last_name && age && address && passion && duration && leader) {




            let url = null
            console.log('object', object)

            if (this.props.FarmerInformation.farmer_information) {
                url = 'farmer/user_update_farmer'

            } else {
                url = 'farmer/user_add_farmer'
            }

            try {
                await post(object, url, user_token).then((res) => {
                    console.log(res)
                    if (res.success) {


                        this.props.setFarmerInformation({
                            first_name: first_name,
                            last_name: last_name,
                            age: moment(age).format("YYYY-MM-DD"),
                            address: JSON.stringify(address),
                            member: member,
                            passion: passion,
                            date_time: moment(date_time).format("YYYY-MM-DD"),
                            //radio: radio
                        })



                        if (this.props.FarmerInformation.farmer_id) {
                            swal("แก้ไขข้อมูลสำเร็จ")
                        } else {
                            this.props.setFarmer_id(res.result.farmer_id)
                            swal("ส่งข้อมูลสำเร็จ")

                            this.props.setFarmerInformation({
                                first_name: first_name,
                                last_name: last_name,
                                age: moment(age).format("YYYY-MM-DD"),
                                address: address,
                                //  member: member_box_array,
                                passion: passion,
                                duration: moment(duration).format("YYYY-MM-DD"),

                            })
                            this.props.NextStep()
                        }

                        // this.props.get_order()

                        // this.props.onClose()

                    } else {
                        alert(res.error_message)
                    }
                })

            } catch (err) {
                console.log(err)
            }






        } else {
            swal("กรุณากรอกข้อมูลให้ครบถ้วน")
        }

    }
    // Onsubmit = () => {
    //     this.props.NextStep()
    // }

    _oninput = event => {
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
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
    get_farmerid = async () => {
        this.setState({ getfarmerid: [] })
        try {
            await get('farmer/user_add_farmer', null).then((res) => {
                if (res.success) {
                    console.log(res.result)
                    this.setState({ getproduct: res.result })
                } else {
                    console.log(res.err_message)
                }

            })


        } catch (err) {
            console.log(err)
        }

    }
    _onradio = (event) => {
        console.log(event.target.value)
        this.setState({ radio: event.target.value })
    }

    componentWillMount = () => {

        if (this.props.FarmerInformation.farmer_information) {
            this.setState(this.props.FarmerInformation.farmer_information)

            console.log(this.props.Memberreducers)
            if (this.props.Memberreducers) {
                // alert(1)
                this.setState({ member_box_array: this.props.Memberreducers })


            }

        }
        this.props.setNextStep(4)
    }
    _oncancle = () => {
        window.location.href = "/"
    }

    _onaddbox = (e) => {

        const { first_member, last_member, age_member, education_member, Department_member } = this.state

        let member_box_array = this.state.member_box_array


        if (first_member && last_member && age_member && education_member && Department_member) {



            console.log(first_member)
            member_box_array.push({
                first_name: first_member,
                last_name: last_member,
                age: age_member,
                education: education_member,
                Department: Department_member

            })
            console.log(member_box_array)

        } else {

        }
        this.setState({
            member_box_array: member_box_array,
            first_member: "",
            last_member: "",
            age_member: "",
            education_member: "",
            Department_member: ""
        })
    }
    _ondeletebox = index => {
        let member_box_array = []
        member_box_array = this.state.member_box_array
        member_box_array.splice(index, 1)
        this.setState({ member_box_array: member_box_array })
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
    CloseModal = () => {
        this.setState({ openmodal: false })
    }

    openModal = () => {
        this.setState({ openmodal: true })
    }







    OnEditMemberModal = (index) => {
        const { member_box_array } = this.state
        this.setState({
            edit_first_member: member_box_array[index].first_name,
            edit_last_member: member_box_array[index].last_name,
            edit_age_member: member_box_array[index].age,
            edit_education_member: member_box_array[index].education,
            edit_Department_member: member_box_array[index].Department,
            edit_index_member: index
        })
        this.openModal()

    }

    OnEditMember = () => {
        const { member_box_array,
            edit_index_member,
            edit_first_member,
            edit_last_member,
            edit_age_member,
            edit_education_member,
            edit_Department_member
        } = this.state
        let member_array = member_box_array
        member_array.splice(edit_index_member, 1, {
            first_name: edit_first_member,
            last_name: edit_last_member,
            age: edit_age_member,
            education: edit_education_member,
            Department: edit_Department_member
        });
        this.CloseModal()
    }





    render() {
        let result = "farmmer_id"
        // CommonJS format
        const { member_box_array } = this.state
        const { first_name, last_name, age, address, member, passion, date_time, radio, first_member, last_member, age_member, education_member, Department_member, edit_first_member, edit_last_member, edit_age_member, edit_education_member, edit_Department_member, duration, leader } = this.state
        let book_props = {
            header: 'เกษตรกรมีการจัดทำบัญชีครัวเรือนหรือไม่',
            option: ["มี", "ไม่มี"],
            name: "book",
            value: this.state.book,
            _onchange: (event) => this._oninput(event)
        }

        let income_props = {
            header: 'เกษตรกรมีการจดบันทึกต้นทุนการผลิตหรือไม่',
            option: ["มี", "ไม่มี"],
            name: "income",
            value: this.state.income,
            _onchange: (event) => this._oninput(event)
        }

        let change_props = {
            header: 'เกษตรกรสนใจปรับวิธีการทำเกษตรเคมี มาเป็นเกษตรอินทรียห์รือไม่',
            option: ["สนใจ", "ไม่สนใจ"],
            name: "change",
            value: this.state.change,
            _onchange: (event) => this._oninput(event)
        }

        return (
            <div>


                <div style={{ width: 700, padding: 50 }}>
                    {/* {this.state.getfarmerid} */}
                    <div style={{ fontSize: 50 }}>
                        {/* ข้อมูลส่วนตัวเกษตรกร */}

                        <Row style={{ marginTop: 19, display: 'flex', flexDirection: 'row' }}>
                            <Input value={first_name} onChange={(event) => this._oninput(event)} type="text" name="first_name" label="ชื่อ" s={12} />
                            <Input value={last_name} onChange={(event) => this._oninput(event)} type="text" name="last_name" label="นามสกุล" s={12} />
                        </Row>

                        <Input value={this.state.address.detail} onChange={(event) => this._oninput_address(event)} name="detail" type="text" label="ที่อยู่" s={12} />
                        <Row style={{ marginTop: 19 }}>

                            <Col s={6}>
                                <Col s={4}>
                                    <div style={{ fontSize: 25 }}>
                                        จังหวัด
                            </div>
                                </Col>
                                <Col style={{ fontSize: 20 }} s={8}>
                                    <Select
                                        value={typeof this.state.address.province === "object" ?
                                            this.state.address.province :
                                            { label: this.state.address.province }
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
                                        value={typeof this.state.address.district === "object" ?
                                            this.state.address.district :
                                            { label: this.state.address.district }
                                        }
                                        onChange={(event) => this.onSelect_ampore(event)}
                                        options={this.state.ampore_option}
                                    />



                                </Col>
                            </Col>

                        </Row>

                        <Input value={this.state.address.postcode} onChange={(event) => this._oninput_address(event)} name="postcode" type="text" label="รหัสไปรษณีย์" s={12} />


                        <Row style={{ marginTop: 19 }}>
                            <Col s={2}>
                                <div style={{ fontSize: 25 ,marginTop:25}}>
                                    วันเกิด
                        </div>
                            </Col>
                            <Col s={3}>
                                <DatePicker
                                    disabledDate={this.disabledStartDate}
                                    showTime
                                    format="DD-MM-YYYY"
                                    style={{ fontFamily: "Kunlasatri" }}
                                    value={this.state.age ? moment(this.state.age) : null}
                                    placeholder="วันเกิด"
                                    onChange={(e) => {
                                        console.log(e)
                                        e ?
                                            this.setState({ age: e.format("YYYY-MM-DD") })
                                            : this.setState({ age: null })

                                    }}
                                    onOpenChange={this.handleStartOpenChange}
                                />
                            </Col>


                        </Row>

                        <div style={{ marginTop: 10, marginBottom: 30 }}>

                            <div style={{ marginTop: 10, marginBottom: 30 }} >
                                <div style={{ fontSize: 25 }}> หัวหน้าครอบครัว ทีมีอํานาจในการตัดสินใจในการทําเกษตรอินทรีย์ </div>

                                <Input type='select' name="leader" value={leader} onChange={(event) => this.setState({ leader: event.target.value })} s={4}  >
                                    <option value='พ่อ'>พ่อ </option>
                                    <option value='เเม่'>เเม่  </option>
                                    <option value='ญาติ'>ญาติ  </option>

                                </Input>

                                {/* <div style={{ marginTop: 5, display: 'flex', flexDirection: 'row' }} onChange={(event) => this._onradio(event)}>
                                <input type="radio" name="program" value="มี" id="q_1_1" checked={program === "บิดา"} /><label for="q_1_1"  >บิดา</label>
                                <input type="radio" name="program" value="ไม่มี" id="q_1_1" checked={program === "มารดา"} /><label for="q_1_2"  >มารดา</label>
                                <input type="radio" name="program" value="มี" id="q_1_1" checked={program === "ญาติ"} /><label for="q_1_1"  >ญาติ</label>
                            </div> */}
                                <div style={{ fontSize: 20 }}>
                                    สมาชิกในครอบครัว
                            </div>



                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                    <Row>
                                        <Col s={6}><Input s={6} value={first_member} onChange={(event) => this._oninput(event)} name="first_member" type="text" label="ชื่อ" s={12} /></Col>
                                        <Col s={6}> <Input s={6} value={last_member} onChange={(event) => this._oninput(event)} name="last_member" type="text" label="นามสกุล" s={12} /></Col>
                                    </Row>
                                    <Row>
                                        <Col s={6}><Input value={age_member} onChange={(event) => this._oninput(event)} name="age_member" type="number" label="อายุ" s={12} /></Col>
                                        <Col s={6}><Input value={education_member} onChange={(event) => this._oninput(event)} name="education_member" type="text" label="ระดับการศึกษา" s={12} /></Col>
                                    </Row>
                                    <Row>
                                        <Col s={6}><Input value={Department_member} onChange={(event) => this._oninput(event)} name="Department_member" type="text" label="สาขาวิชา" s={12} /></Col>
                                        <Col s={6}><div style={{ width: 40, cursor: 'pointer' }} onClick={() => this._onaddbox()} ><Icon small >add_circle_outline</Icon></div></Col>
                                    </Row>
                                </div>

                                {

                                    this.state.member_box_array.map((element, index) => {
                                        return (
                                            <div>
                                                <Row style={{ fontSize: 23 }}>
                                                    <Row>
                                                        <Col s={6}>ชื่อ-นามสกุล {element.first_name}   {element.last_name}</Col>
                                                        <Col s={2}>อายุ {element.age}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col s={5}>ระดับการศึกษา {element.education}</Col>
                                                        <Col s={5}>สาขาวิชา {element.Department}</Col>
                                                        <Col s={2}>
                                                            <Row>
                                                                <Col s={6}>
                                                                    <div style={{ width: 40, cursor: 'pointer' }} onClick={() => this.OnEditMemberModal(index)} >
                                                                        <Icon small >edit</Icon>
                                                                    </div>
                                                                </Col>
                                                                <Col s={6}>
                                                                    <div style={{ width: 40, cursor: 'pointer' }} onClick={() => this._ondeletebox(index)} >
                                                                        <Icon small >delete</Icon>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                    </Row>


                                                </Row>
                                            </div>
                                        )
                                    })
                                }



                                <div style={{ fontSize: 25 }}>
                                    ระยะการทําเกษตรอินทรีย์ มากีปี

                        </div>
                                <div style={{ width: 400 }}>

                                    <DatePicker
                                        disabledDate={this.disabledStartDate}
                                        showTime
                                        format="DD-MM-YYYY"
                                        style={{ fontFamily: "Kunlasatri" }}
                                        value={this.state.duration ? moment(this.state.duration) : null}
                                        placeholder="วันที่เริ่มทำเกษตร"
                                        onChange={(e) => {
                                            console.log(e)
                                            e ?
                                                this.setState({ duration: e.format("YYYY-MM-DD") })
                                                : this.setState({ duration: null })

                                        }}
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                </div>
                                <Input value={passion} onChange={(event) => this._oninput(event)} name="passion" type="text" label="แรงบันดาลใจทีทําให้ตัดสินใจมาทําเกษตรอินทรีย์" s={12} />

 <Input value={this.state.debt} type="number" label="ภาระหนี้สิน (บาท)" s={12} />

 <Input value={this.state.farmer_mind_set}  type="text" label="ทัศนคติต่ออาชีพเกษตรกร" s={12} />

 <Input value={this.state.se_mind_set}  type="text" label="ทศันคติต่อการรวมตัวกันในรูปแบบ SE" s={12} />

<Col s={12}>
  <RegularRadioButton {...book_props}/>

  <RegularRadioButton {...book_props}/>
  <RegularRadioButton {...income_props}/>
  <RegularRadioButton {...change_props}/>
  </Col>

  



                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <button style={{ width: 100, marginRight: 20 }} onClick={() => this.Onsubmit()} className="default_button">ตกลง</button>
                                    <button style={{ width: 100 }} onClick={() => this._oncancle()} className="cancle_button">ยกเลิก</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Modal styles={{ backgroundColor: '#FFFF66', width: 500 }} open={this.state.openmodal} onClose={() => { this.CloseModal() }}>
                        <div style={{ width: 500 }} >
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Input value={edit_first_member} onChange={(event) => this._oninput(event)} name="edit_first_member" type="text" label="ชื่อ" s={12} />
                                <Input value={edit_last_member} onChange={(event) => this._oninput(event)} name="edit_last_member" type="text" label="นามสกุล" s={12} />
                                <Input value={edit_age_member} onChange={(event) => this._oninput(event)} name="edit_age_member" type="number" label="อายุ" s={12} />
                                <Input value={edit_education_member} onChange={(event) => this._oninput(event)} name="edit_education_member" type="text" label="ระดับการศึกษา" s={12} />
                                <Input value={edit_Department_member} onChange={(event) => this._oninput(event)} name="edit_Department_member" type="text" label="สาขาวิชา" s={12} />
                                <button style={{ width: 100, marginRight: 20 }} onClick={() => this.OnEditMember()} className="default_button">ตกลง</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        FarmerInformation: state.FarmerInformation,
        Memberreducers: state.Member

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        setFarmerInformation: (data) => {
            dispatch(
                {
                    type: "SET_FARMER_INFORMATION",
                    payload: data
                }

            );
        },
        setFarmer_id: (farmerid) => {
            dispatch(
                {
                    type: "SET_FARMER_ID",
                    payload: farmerid
                }

            );
        },
        setNextStep: (next_step) => {
            dispatch(
                {
                    type: "SET_NEXT_STEP",
                    payload: next_step
                }

            );
        },

        setMember: (member) => {
            dispatch(
                {
                    type: "SET_MEMBER",
                    payload: member
                }

            );
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inoutinfofmation)