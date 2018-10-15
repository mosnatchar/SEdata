import React, { Component } from 'react'
import { Table, Row, Icon, Modal, Input } from 'react-materialize'
import Col from 'react-materialize/lib/Col';
import Content from './ContentComponent'
import { Router, Link, Route } from 'react-router-dom'
import ModalcropComponent from '../ModalComponent/ModalcropComponent'
import EditContent from './EditContentComponent'
import EditDateContent from './DatetimeContentComponent'
import { connect } from 'react-redux';
import swal from 'sweetalert'
import { post } from '../../service/service';
import { user_token } from '../../static/Constance';
import RegularRadioButton from '../../component/Plublicformcomponent/RegularRadioButton'


class Showmanufacturing extends Component {

    constructor() {
        super();
        this.state = {
            farmer_id: null,
            onOpenModal: false,
            edit: false,
            program: "-",
            insurance_partners: "ไม่มี",
            insurance_price: null,
            begin_plant: "-",
            end_plant: "-",
            between_plant: "-",
            product_value: "-",
            deliver_frequency: "-",
            deliver_value: "-",
            year_value: "-",
            sell_price: "-",
            insurance: "-",
            gap: "-",
            gap_year: "-",
            plant_type_best: "-",
            sell_group: "-",


        }
    }

    // Onsubmit= async () =>{
    //     const {  program, begin_plant, between_plant, end_plant, product_value, deliver_frequency, deliver_value, year_value, sell_price, insurance, gap, gap_year, plant_type_best, sell_group}=this.state
    //     const object ={
    //         program: program,
    //         begin_plant:begin_plant,
    //         end_plant:end_plant,
    //         product_value:product_value,
    //         deliver_frequency:deliver_frequency,
    //         deliver_value:deliver_value,
    //         year_value:year_value,
    //         sell_price:sell_price,
    //         insurance:insurance,
    //         gap:gap,
    //         gap_year:gap_year,
    //         plant_type_best:plant_type_best,
    //         sell_group:sell_group
    //     }
    // }



    openModal = () => {
        this.setState({ onOpenModal: true })
    }

    componentDidMount = () => {
        console.log(this.props.program)
        if (this.props.program != null) {
            this.setState(this.props)

            this.setState({
                begin_plant: this.props.begin_plant.begin_plant,
                between_plant: this.props.begin_plant.between_plant
            })
        }

        console.log("manufacture", this.props)
        // let begin_plant_obj

        // try {
        //     begin_plant_obj = JSON.parse(this.props.begin_plant)
        // } catch (err) {
        //     begin_plant_obj = {
        //         begin_plant: "",
        //         between_plant: ""
        //     }
        // }






    }

    componentWillMount() {
        this.setState(this.props)





    }


    _oninput = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }

    _oninput_radio = (event) => {
       
        if (event.target.value ==="ไม่มี" ) {
             
            
        this.setState({ insurance_price: 0 })


        } 
        this.setState({ [event.target.name]: event.target.value })



    }

    _onedit = async (farmer_id) => {

        const { program, between_plant, insurance_partners, insurance_price, begin_plant, end_plant, product_value, deliver_frequency, deliver_value, year_value, sell_price, insurance, gap, gap_year, plant_type_best, sell_group } = this.state
        const object = {
            manufacture_id: this.props.manufacture_id,
            farmer_id: farmer_id,
            program: program,
            begin_plant: JSON.stringify({ begin_plant: begin_plant, between_plant: between_plant }),
            end_plant: end_plant,
            farmer_id: farmer_id,
            product_value: product_value,
            deliver_frequency: deliver_frequency,
            deliver_value: deliver_value,
            year_value: year_value,
            sell_price: sell_price,
            insurance: insurance,
            insurance_partners: insurance_partners,
            insurance_price: insurance_price,
            gap: gap,
            gap_year: gap_year,
            plant_type_best: plant_type_best,
            sell_group: sell_group
        }
        // console.log(object)
        try {
            await post(object, "manufacture/update_manufacture_value", user_token).then((res) => {
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




    render() {

        const { program, begin_plant, end_plant, product_value, insurance_price, insurance_partners, deliver_frequency, deliver_value, year_value, sell_price, insurance, gap, gap_year, plant_type_best, sell_group, between_plant } = this.state
        const { farmer_information, manufacture_information, factor_information, logistic_information, area_information } = this.props.Showallfarmer.farmer_information_page
        const farmer_id = farmer_information.farmer_id

        let Radio_Props = {
            header: 'ประกันราคาผลผลิตจากคู่ค้า',
            option: ["มี", "ไม่มี"],
            name: "insurance_partners",
            value: insurance_partners,
            _onchange: (event) => this._oninput(event)
        }

        let begin_plant_obj

        if (!begin_plant) {
            begin_plant_obj = { begin_plant: "ไม่มีกำหนด", between_plant: "ไม่มีกำหนด" }
        } else {
            try {
                begin_plant_obj = JSON.parse(begin_plant)

            } catch (err) {
                begin_plant_obj = { begin_plant: "ไม่มีกำหนด", between_plant: "ไม่มีกำหนด" }
            }
        }











        return (
            <div>
                <div>




                    <Row style={{ borderStyle: 'solid', borderColor: 'palevioletred', borderWidth: 1, borderRadius: 30 }}  >

                        {this.state.edit ?
                            <div>

                                <EditContent col={6} name={"program"} onChange={(event) => { this._oninput(event) }} header={"การวางแผนการเพาะปลูก"} content={`${program}`} />
                                <Content col={6} Change={(event) => { this._oninput(event) }} header={"ชนิดพืชที่ปลูก"} content={
                                    <div onClick={() => this.openModal()}  >
                                        <Modal
                                            trigger={<div style={{ cursor: "pointer" }} ><button className='default_button' >ดูข้อมูลเพิ่มเติม</button></div>} >
                                            <div style={{ display: 'flex', justifyContent: 'center', textIndent: 100 }} >  <ModalcropComponent /> </div>
                                        </Modal>
                                    </div>} />
                                {/* <EditDateContent col={6}  name={"age"}  header={"ช่วงการเพาะปลูก (เดือนไหน-ไหน)"} onChange={(value, name) => { this._oninput_date(value, name) }} date={age} /> */}
                                <div style={{ marginLeft: 50, marginBottom: 20, fontSize: 30, float: "right", width: 400 }}>
                                    ช่วงการเพาะปลูก(เดือนไหน-ไหน)


                         <Row>
                                        <Col s={6}> <Input s={12} type='select' name={"begin_plant"} value={begin_plant} onChange={(event) => { this._oninput(event) }}>

                                            <option value='มกราคม'>มกราคม </option>
                                            <option value='กุมภาพันธ์'>กุมภาพันธ์  </option>
                                            <option value='มีนาคม'>มีนาคม </option>
                                            <option value='เมษายน'>เมษายน   </option>
                                            <option value='พฤษภาคม'>พฤษภาคม </option>
                                            <option value='มิถุนายน'>มิถุนายน  </option>
                                            <option value='กรกฎาคม'>กรกฎาคม    </option>
                                            <option value='สิงหาคม'>สิงหาคม </option>
                                            <option value='กันยายน'>กันยายน </option>
                                            <option value='ตุลาคม'>ตุลาคม</option>
                                            <option value='พฤศจิกายน'>พฤศจิกายน </option>
                                            <option value='ธันวาคม'>ธันวาคม      </option>
                                        </Input></Col>
                                    </Row>
                                    <Row>
                                        <Col s={6}>  <Input s={12} type='select' name={"between_plant"} value={between_plant} onChange={(event) => { this._oninput(event) }} >

                                            <option value='มกราคม'>มกราคม </option>
                                            <option value='กุมภาพันธ์'>กุมภาพันธ์  </option>
                                            <option value='มีนาคม'>มีนาคม </option>
                                            <option value='เมษายน'>เมษายน   </option>
                                            <option value='พฤษภาคม'>พฤษภาคม </option>
                                            <option value='มิถุนายน'>มิถุนายน  </option>
                                            <option value='กรกฎาคม'>กรกฎาคม    </option>
                                            <option value='สิงหาคม'>สิงหาคม </option>
                                            <option value='กันยายน'>กันยายน </option>
                                            <option value='ตุลาคม'>ตุลาคม</option>
                                            <option value='พฤศจิกายน'>พฤศจิกายน </option>
                                            <option value='ธันวาคม'>ธันวาคม      </option>
                                        </Input></Col>
                                    </Row>

                                    <Col s={6}>เริ่มต้น :{this.state.begin_plant}</Col>
                                    <Col s={6}>สิ้นสุด :{this.state.between_plant}</Col>
                                </div>

                                <EditDateContent col={6} Change={(event) => { this._oninput(event) }} header={"ช่วงเวลาการเก็บเกี่ยว (เดือน) "} age={end_plant} />

                                <EditContent col={6} name={"product_value"} onChange={(event) => { this._oninput(event) }} header={"ผลผลิต/ไร่"} content={product_value ? `${product_value} กิโลกรัม` : "-"} />
                                <EditContent col={6} name={"deliver_frequency"} onChange={(event) => { this._oninput(event) }} header={"ความถี่ในการส่งผลผลิต"} content={`${deliver_frequency.deliver_frequency_number} ${deliver_frequency.deliver_frequency_date}`} />
                                <EditContent col={6} name={"deliver_value"} onChange={(event) => { this._oninput(event) }} header={"ปริมาณ/การส่งแต่ละครั้ง"} content={`${deliver_value} กิโลกรัม`} />
                                <EditContent col={6} name={"year_value"} onChange={(event) => { this._oninput(event) }} header={"จำนวนผลผลิตที่ขาย/ปี"} content={`${year_value.year_value} ${year_value.year_value_unit}`} />
                                <EditContent col={6} name={"sell_price"} onChange={(event) => { this._oninput(event) }} header={"ราคาที่ขาย"} content={`${sell_price} บาท/กิโล`} />
                                {/* <EditContent col={6} name={"insurance"} onChange={(event) => { this._oninput(event) }} header={"ประกันราคาผลผลิตจากคู่ค้า"} content={`${insurance}`} /> */}

                                <Row>
                                    <Col s={6}>
                                        <RegularRadioButton {...Radio_Props} />
                                    </Col>

                                    {insurance_partners === "มี" ? <Col s={6}>
                                        <div style={{ fontSize: 25, width: 400 }}>
                                            ราคาประกันผลผลิต(%)
                                           </div>
                                        <Input onChange={(event) => { this._oninput_radio(event) }} value={insurance_price} name='insurance_price' type="number" s={12} label="กี่ %" />

                                    </Col>

                                        : null}

                                </Row>



                                {/* <EditContent col={6} name={"gap"} onChange={(event) => { this._oninput(event) }} header={"มาตราฐานที่รับรอง"} content={gap} /> */}

                                <EditContent col={6} name={"gap_year"} onChange={(event) => { this._oninput(event) }} header={"ปีที่รับรอง"} content={gap_year} />
                                <EditContent col={6} name={"plant_type_best"} onChange={(event) => { this._oninput(event) }} header={"ชนิดพืชที่ปลูก"} content={plant_type_best} />
                                <EditContent col={6} name={"sell_group"} onChange={(event) => { this._oninput(event) }} header={"แหล่งที่ขาย"} content={sell_group} />
                            </div>


                            :
                            <div>
                                <Content col={6} header={"การวางแผนการเพาะปลูก"} content={`${program || 'ไม่มี'}`} />
                                <Content col={6} header={"ชนิดพืชที่ปลูก"} content={

                                    <div onClick={() => this.openModal()}  >  <Modal
                                        trigger={<div style={{ cursor: "pointer" }} ><button className='default_button' >ดูข้อมูลเพิ่มเติม</button></div>} >
                                        <div style={{ display: 'flex', justifyContent: 'center', textIndent: 100 }} >  <ModalcropComponent /> </div>
                                    </Modal>
                                    </div>} />
                                {<Content col={6} header={"ช่วงการเพาะปลูก (เดือนไหน-ไหน)"} content={`${begin_plant} - ${between_plant}`} />}
                                <Content col={6} header={"ช่วงเวลาการเก็บเกี่ยว (เดือน) "} content={end_plant} />
                                <Content col={6} header={"ผลผลิต/ไร่"} content={product_value ? `${product_value} กิโลกรัม` : "-"} />
                                <Content col={6} header={"ความถี่ในการส่งผลผลิต"} content={`${deliver_frequency.deliver_frequency_number} ${deliver_frequency.deliver_frequency_date}`} />
                                <Content col={6} header={"ปริมาณ/การส่งแต่ละครั้ง"} content={`${deliver_value} กิโลกรัม`} />
                                <Content col={6} header={"จำนวนผลผลิตที่ขาย/ปี"} content={`${year_value.year_value} ${year_value.year_value_unit}`} />
                                <Content col={6} header={"ราคาที่ขาย"} content={`${sell_price} บาท/กิโล`} />
                                <Content col={6} header={"ประกันราคาผลผลิตจากคู่ค้า"} content={`${insurance_partners}`} />
                                <Content col={6} header={"ราคาประกันผลผลิต(%)"} content={`${insurance_price}`} />
                                <Content col={6} header={"มาตราฐานที่รับรอง"} content={gap} />
                                <Content col={6} header={"ปีที่รับรอง"} content={gap_year} />
                                <Content col={6} header={"ชนิดพืชที่ปลูก"} content={plant_type_best} />
                                <Content col={6} header={"แหล่งที่ขาย"} content={sell_group} />

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


export default connect(mapStateToProps, mapDispatchToProps)(Showmanufacturing)