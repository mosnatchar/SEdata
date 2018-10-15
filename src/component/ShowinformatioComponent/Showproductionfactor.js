import React, { Component } from 'react'
import { Table, Row, Input } from 'react-materialize'
import Col from 'react-materialize/lib/Col';
import Content from './ContentComponent';
import EditContent from './EditContentComponent';
import EditDateContent from './DatetimeContentComponent'
import { post } from '../../service/service';
import { user_token } from '../../static/Constance';
import { connect } from 'react-redux';
import swal from 'sweetalert'
import MemberCpmponent from '../ModalComponent/MemberComponent'
import Modal from 'react-responsive-modal'


class Showproductionfactor extends Component {

    constructor() {
        super()
        this.state = {
            edit: false,
            manure: "-",
            manure_use: "-",
            manure_type: "-",
            seed: "-",
            equipment: "-",
            equipment_organic: "-"
        }
    }

   

    componentDidMount = () => {
        console.log(this.props.manure)
        if (this.props.manure != null) {
            this.setState(this.props)
        }

       
    }
    componentWillMount() {
        this.setState(this.props)
        console.log("manufacture",this.props)
    }
    _onradio_manure = (event) => {
        console.log(event.target.value)
        this.setState({ manure: event.target.value })
    }
    _onradio_equipment = (event) => {
        console.log(event.target.value)
        this.setState({ equipment: event.target.value })
    }


    _oninput = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }

    _onedit = async (farmer_id) => {

        const { factor_id,manure, manure_use, manure_type, seed, equipment, equipment_organic } = this.state
        const object = {
            factor_id:factor_id,
            farmer_id: farmer_id,
            manure: manure,
            manure_use: manure_use,
            manure_type: manure_type,
            seed: seed,
            equipment: equipment,
            // equipment_organic: equipment_organic
        }

        // alert(JSON.stringify(object.factor_id))

        if (manure_use && manure_type && seed) {


            try {
                await post(object, "factor/user_update_factor", user_token).then((res) => {
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
        else {
            swal("ไม่มีข้อมูล")
        }

    }


    render() {
       

        const { manure, manure_use, manure_type, seed, equipment, equipment_organic } = this.state
        const { farmer_information, manufacture_information, factor_information, logistic_information, area_information } = this.props.Showallfarmer.farmer_information_page
        const farmer_id = farmer_information.farmer_id
    

        return (
            
            <div>
    
                

                <Row style={{ borderStyle: 'solid', borderColor: 'palevioletred', borderWidth: 1, borderRadius: 30 }} >
               
                    {this.state.edit ?
                        <div  >
                            <EditContent col={6} name={"seed"} onChange={(event) => { this._oninput(event) }} header={"เมล็ดพันธ์"} content={`${seed}`} />
                            {/* <EditContent col={6} name={"manure"} onChange={(event) => { this._oninput(event) }} header={"ใช้ปุ๋ยหรือไม่"} content={`${manure}`} /> */}
                            <div col={3} style={{ fontSize: 40, float: "right", marginRight: 100, width: 300, fontWeight: "bold" }} >
                                ใช้ปุ๋ยหรือไม่
                      {manure}
                                <div col={6} style={{ display: 'flex', flexDirection: 'column' }} onChange={(event) => this._onradio_manure(event)}>

                                    <input col={6} type="radio" name="manure" value="ใช้" id="q_1_1" checked={manure === "ใช้"} /><label for="q_1_1">ใช้</label>
                                    <input col={6} type="radio" name="manure" value="ไม่ใช้" id="q_1_2" checked={manure === "ไม่ใช้"} /><label for="q_1_2">ไม่ใช้</label>

                                </div>
                                {manure === "ใช้" ? <div style={{ fontSize: 25, width: 300 }}>
                                    ผลิตปุ๋ยเองหรือซื้อ
                                 {/* <Row>
                                     <Input s={2} name="Group3" type="radio" value="1" label="ผลิตเอง" />
                                     <Input s={2} name="Group3" type="radio" value="0" label="ซื้อมา" />
                                 </Row> */}
                                    <Input col={6} value={manure_use} onChange={(event) => this._oninput(event)} name="manure_use" type="text" label="ผลิตปุ๋ยเองหรือซื้อ" s={12} />
                                    <div style={{ width: 300 }}>
                                        ชนิดของปุ๋ย
                           <Input col={6} value={manure_type} onChange={(event) => this._oninput(event)} name="manure_type" type="text" label="ชนิดของปุ๋ย" s={12} />
                                    </div>
                                </div> : null}
                            </div>



                            {/* <EditContent col={6} name={"manure_use"} onChange={(event) => { this._oninput(event) }} header={"ผลิตปุ๋ยเองหรือซื้อ"} content={`${manure_use}`} /> */}
                            {/* <EditContent col={6} name={"manure_type"} onChange={(event) => { this._oninput(event) }} header={"ชนิดของปุ๋ย"} content={`${manure_type}`} /> */}
                            {/* <EditContent col={6} name={"equipment"} onChange={(event) => { this._oninput(event) }} header={"เครื่องมือทางการเกศตร"} content={`${equipment}`} /> */}
                            <div col={6} style={{ fontSize: 40, marginLeft: 100, width: 300, fontWeight: 80, fontWeight: "bold" }}>
                                เครื่องมือทางการเกษตร
                     {/* < Row>
                         <Input s={3} name="Group4" type="radio" value="1" label="ใช้ของตัวเอง" />
                         <Input s={3} name="Group4" type="radio" value="0" label="ไม่ได้ใช้ของตัวเอง" />
                     </Row> */}
                                <div col={6} style={{ display: 'flex', flexDirection: 'column' }} defaultValue={equipment} onChange={(event) => this._onradio_equipment(event)}>

                                    <input col={6} type="radio" name="equipment" value="ของตัวเอง" id="q_1_11" checked={equipment === "ของตัวเอง"} /><label for="q_1_11">ของตัวเอง</label>
                                    <input col={6} type="radio" name="equipment" value="ยืม" id="q_1_22" checked={equipment === "ยืม"} /><label for="q_1_22">ยืม</label>
                                    <input col={6} type="radio" name="equipment" value="จ้าง/ทำเกษตรอินทรีย์" checked={equipment === "จ้าง/ทำเกษตรอินทรีย์"} id="q_1_33" /><label for="q_1_33">จ้าง/ทำเกษตรอินทรีย์</label>
                                    <input col={6} type="radio" name="equipment" value="จ้าง/ไม่ทำเกษตรอินทรีย์" checked={equipment === "จ้าง/ไม่ทำเกษตรอินทรีย์"} id="q_1_44" /><label for="q_1_44">จ้าง/ไม่ทำเกษตรอินทรีย์</label>

                                </div>
                            </div>
                        </div>

                        :
                        <div>
                            <Content col={6} header={"เมล็ดพันธ์"} content={`${seed || "ไม่มี"}`} />
                            <Content col={6} header={"ใช้ปุ๋ยหรือไม่"} content={`${manure}`} />
                            <Content col={6} header={"ผลิตปุ๋ยเองหรือซื้อ"} content={`${manure_use}`} />
                            <Content col={6} header={"ชนิดของปุ๋ย"} content={`${manure_type}`} />
                            <Content col={6} header={"เครื่องมือทางการเกศตร"} content={`${equipment}`} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Showproductionfactor)