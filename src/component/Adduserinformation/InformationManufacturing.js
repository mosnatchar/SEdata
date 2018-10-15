import React, { Component } from 'react'
import { Row, Input, Table, Col, Icon } from 'react-materialize'
import { connect } from 'react-redux';
import { user_token } from '../../static/Constance'
import { post } from '../../service/service'
import swal from 'sweetalert'
import Modal from 'react-responsive-modal'
import './dropdown.css'
import RegularRadioButton from '../../component/Plublicformcomponent/RegularRadioButton'


class InformationManufacturing extends Component {

    constructor() {
        super()
        this.state = {
            begin_plant: 'มกราคม',
            between_plant: 'มกราคม',
            end_plant: 'มกราคม',
            // program: null,
            // plant_type: [],
            gap: "ไม่มี",
            // insurance: null,
            sell_group: null,
            plant_type_best: null,
            gap_year: null,
            insurance_price: null,
            insurance_partners: "ไม่มี",
            sell_price: null,
            year_value: null,
            deliver_frequency: null,
            deliver_value: null,
            product_value: null,
            plant_array: [],
            Month_to_Month: null,
            radio: null,
            program: null,


            plant_type: null,
            plant_array: [],
            plant_array_add: [],
            plant_array_delete: [],
            // choose: 0

            plant_type_box_arry: [],
            edit_plan_type: null,
            openmodal: false,
            edit_index_member: null,



            deliver_frequency_number: null,
            deliver_frequency_date: "วัน",


            year_value_unit: "กิโล"

        }
    }

    Seletechoie = (event) => {
        console.log("event", event.target)
        // this.setState({[event.target.name]:event.target.value})
    }


    openmodal = () => {
        this.setState({ openmodal: true })
    }
    closemodal = () => {
        this.setState({ openmodal: false })
    }


    Onsubmit = async () => {
        let { deliver_frequency_number, deliver_frequency_date } = this.state


        let deliver_frequency = {
            deliver_frequency_number: deliver_frequency_number,
            deliver_frequency_date: deliver_frequency_date
        }

        this.setState({ deliver_frequency: deliver_frequency })

        let { year_value_unit } = this.state

        let year_value = {
            year_value: this.state.year_value,
            year_value_unit: year_value_unit
        }




        const { radio, between_plant, sell_group, insurance_partners, insurance_price, plant_type_best, gap_year, gap
            , sell_price, deliver_value, product_value, begin_plant, plant_array, end_plant, program } = this.state
        let object = {
            //  program: program,
            farmer_id: this.props.FarmerInformation.farmer_id || null,
            plant_type: JSON.stringify(plant_array),
            begin_plant: JSON.stringify({ begin_plant: begin_plant, between_plant: between_plant }),
            end_plant: end_plant,
            product_value: product_value,
            deliver_frequency: JSON.stringify(deliver_frequency),
            deliver_value: deliver_value,
            year_value: JSON.stringify(year_value),
            //  insurance: insurance,
            insurance_partners: insurance_partners,
            insurance_price: insurance_price,
            gap: gap,
            gap_year: gap_year,
            plant_type_best: plant_type_best,
            sell_group: sell_group,
            sell_price: sell_price,
            program: program


        }
        console.log("object", object)

        if (sell_group && plant_type_best && gap_year
            && sell_price && year_value && deliver_frequency && insurance_price && deliver_value && insurance_partners && product_value, begin_plant, end_plant && program) {


            let url = null
            console.log('object', object)

            if (this.props.Manufacturing.program) {
                let plant_type_delete = this.state.plant_array_delete
                url = 'manufacture/update_manufacture_value'
                object = {
                    ...object,
                    plant_type_add: JSON.stringify(this.state.plant_array_add),
                    plant_type_delete: `(${this.state.plant_array_delete.toString()})`
                }

            } else {
                url = 'manufacture/add_manufacture_value'
            }


            try {
                await post(object, url, user_token).then((res) => {
                    console.log(res)
                    if (res.success) {


                        if (this.props.Manufacturing.program) {
                            swal("แก้ไขข้อมูลสำเร็จ")
                            this.props.setName(object)
                        } else {
                            // this.props.setFarmer_id(res.result.farmer_id)
                            swal("ส่งข้อมูลสำเร็จ")
                            this.props.setName(object)
                            this.props.setNextstep(res.result.step)
                            this.props.NextStep()
                        }



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



    // _onsubmit = () => {
    //     this.props.NextStep()

    // }


    _oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log("event", event.target.value)
    }

    _onaddbox = event => {


        if (this.state.plant_type) {
            let index
            let plant_array = [];
            let plant_array_add = []


            plant_array = this.state.plant_array
            plant_array_add = this.state.plant_array_add
            index = plant_array.findIndex(element => element.plant == this.state.plant_type);

            if (index === -1) {
                plant_array.push({ plant_id: null, plant: this.state.plant_type })
                if (this.props.Manufacturing) {
                    plant_array_add.push({ plant_id: null, plant: this.state.plant_type })
                } else {

                }
            } else {

            }
            this.setState({ plant_array: plant_array })
        } else {
            swal("กรุณากรอกข้อมูลให้ครบถ้วน")
        }



    }

    _ondeletebox = element => {
        let plant_array = []
        let plant_array_add = []
        let plant_array_delete = []
        let index = 0
        let index_add = 0
        plant_array = this.state.plant_array
        plant_array_add = this.state.plant_array_add
        plant_array_delete = this.state.plant_array_delete
        index = plant_array.findIndex(el => el.plant === element.plant)
        index_add = plant_array_add.findIndex(el => el.plant === element.plant)
        if (element.plant_id !== null) {
            plant_array_delete.push(element.plant_id)
        }
        plant_array.splice(index, 1)
        if (index_add >= 0) {
            plant_array_add.splice(index_add, 1)
        }
        this.setState({ plant_array: plant_array, plant_array_add: plant_array_add, plant_array_delete: plant_array_delete })
    }


    componentWillMount = () => {
        if (this.props.Manufacturing) {
            this.setState(this.props.Manufacturing)
            if (this.props.Manufacturing.begin_plant) {
                let begin_plant_obj = JSON.parse(this.props.Manufacturing.begin_plant) || { begin_plant: this.state.begin_plant, between_plant: this.state.between_plant }
                this.setState({
                    begin_plant: begin_plant_obj.begin_plant,
                    between_plant: begin_plant_obj.between_plant
                })
            }


            if (this.props.Manufacturing.plant_type_array) {
                let plant_array = []
                this.props.Manufacturing.plant_type_array.map((element, index) => {
                    plant_array.push({ plant_id: element.plant_id, plant: element.plant })
                })
                this.setState({ plant_array: plant_array.reverse() })

            }

        }
        // this.props.setNextstep(2)

    }
    _onradio = (event) => {
        console.log(event.target.value)
        this.setState({ program: event.target.value })
    }



    _on_edit_plantype = index => {
        let { plant_type_box_arry, edit_plan_type } = this.state
        // const {plant_type_box_arry} = this.state

        let plant_array = this.state.plant_array.slice(0).reverse()
        this.setState({
            edit_plan_type: plant_array[index].plant,
            edit_index_member: index

        })
        this.openmodal()


        console.log(edit_plan_type)

    }

    on_edit_member = () => {
        let box_array = this.state.plant_array.reverse()

        box_array.splice(this.state.edit_index_member, 1, { ...box_array[this.state.edit_index_member], plant: this.state.edit_plan_type })

        this.setState({ plant_array: box_array.reverse() })


        this.closemodal()
    }


    render() {
        const { plant_type_box_arry } = this.state
        const { year_value_unit, insurance_partners, insurance_price, deliver_frequency_date, deliver_frequency_number, radio, end_plant, between_plant, begin_plant, program, sell_group, plant_type_best, gap_year, sell_price, year_value, deliver_frequency, deliver_value, product_value, plant_type, edit_plan_type
            , gap } = this.state

        let Radio_Props = {
            header: 'ประกันราคาผลผลิตจากคู่ค้า',
            option: ["มี", "ไม่มี"],
            name: "insurance_partners",
            value: insurance_partners,
            _onchange: (event) => this._oninput(event)
        }

        return (
            <div style={{ width: 700, padding: 50 }}>

                {/* {this.state.year_value} */}
                {/* <button onClick={() => console.log( this.state.plant_type)}>member_box_array</button> */}




                {/* <div style={{ fontSize: 50, marginBottom: 20 }}>
                    ข้อมูลการผลิต
                        </div> */}
                {/* {JSON.stringify(this.state)} */}

                {/* <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexDirection: "row", marginRight: 50 }}>
                                Farmer_ID:
                            {this.props.FarmerInformation ? this.props.FarmerInformation.farmer_id : null}
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                Step:
                            {this.props.FarmerInformation ? this.props.FarmerInformation.next_step : null}
                            </div>
                        </div> */}

                <Row>
                    <Col>

                        <div style={{ fontSize: 25 }}> มีการวางแผนการเพาะปลูกพืชหรือไม่</div>
                    </Col>
                    <Col>
                        <div style={{ display: 'flex', flexDirection: 'row' }} onChange={(event) => this._onradio(event)}>
                            <input type="radio" name="program" value="มี" id="q_1_1" checked={program === "มี"} /><label for="q_1_1"  >มี</label>
                            <input type="radio" name="program" value="ไม่มี" id="q_1_2" checked={program === "ไม่มี"} /><label for="q_1_2"  >ไม่มี</label>
                        </div>
                    </Col>
                </Row>



                {/* <Row onChange={(event) => { this.Seletechoie(event) }}  > */}

                {/* <Input onChange={(event) => { this._oninput(event) }}  s={2} name=' program' type='radio' value="1" label='มี' />
                        <Input onChange={(event) => { this._oninput(event) }}  s={4} name=' program' type='radio' value="0" label='ไม่มี' /> */}
                {/* </Row> */}
                {/* {JSON.stringify(this.state.plant_array_add)}
                    {JSON.stringify(this.state.plant_array_delete)} */}
                <Row>
                    <Input onChange={(event) => { this._oninput(event) }} name="plant_type" type="text" label="ชนิดพืชที่ปลูก" s={8} />
                    <Col style={{ width: 40, cursor: 'pointer' }} onClick={() => this._onaddbox()} s={4}>
                        <div style={{ marginTop: 20 }} >
                            <Icon small >add_circle_outline</Icon>
                        </div>
                    </Col>

                </Row>


                {/* <Table> */}



                {this.state.plant_array.slice(0).reverse().map((element, index) => {
                    return (
                        <div style={{ width: 600, backgroundColor: index % 2 === 0 ? "#47474722" : 'transparent' }}>
                            <div style={{ marginTop: 20 }}>
                                <Row   >
                                    <Col s={10}>
                                        <div style={{ fontSize: 20 }}  >
                                            {element.plant}
                                        </div>
                                    </Col>

                                    <Col onClick={() => this._onaddbox()} s={1}>
                                        <div style={{ width: 40, cursor: 'pointer' }}  >
                                            <Icon small >edit</Icon>
                                        </div>
                                    </Col>

                                    <Col onClick={() => this._on_edit_plantype(index)} s={1}>
                                        <div style={{ width: 50, cursor: 'pointer' }} >
                                            <Icon small >close</Icon>
                                        </div>
                                    </Col>


                                </Row>
                            </div>
                        </div>

                        // <tbody>
                        //     <tr>
                        //         <td>{element.plant_id}</td>
                        //         <td>{element.plant}</td>
                        //         <td><div style={{ width: 50, marginLeft: 70, cursor: 'pointer' }} onClick={() => this._ondeletebox(element)} ><Icon small >remove</Icon></div></td>
                        //         <Col s={4}> <div style={{ width: 50, marginLeft: 70, cursor: 'pointer' }} onClick={() => this._on_edit_plantype(index)} ><Icon small >edit</Icon></div></Col>
                        //     </tr>
                        // </tbody>


                    )
                })}


                {/* </Table> */}




                <div style={{ fontSize: 25, marginBottom: 20, width: 600 }}>
                    ช่วงการเพาะปลูก(เดือนไหน-ไหน)


                    <Row>
                        <Col s={6}>
                            <Input s={12} type='select' name="begin_plant" value={begin_plant} onChange={(event) => { this._oninput(event) }} defaultValue="มกราคม">

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
                            </Input>
                        </Col>

                        <Col s={6}>
                            <Input s={12} type='select' name="between_plant" value={between_plant} onChange={(event) => { this._oninput(event) }} defaultValue="มกราคม" >
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
                            </Input>
                        </Col>

                    </Row>
                    <Row>

                        <Col s={6}>เริ่มต้น :{this.state.begin_plant}</Col>
                        <Col s={6}>สิ้นสุด :{this.state.between_plant}</Col>

                    </Row>

                </div>


                <div style={{ fontSize: 25, marginBottom: 20 }}>
                    ช่วงเวลาเก็บเกี่ยว(เดือน)
                        </div>


                <Row>
                    <Col s={6}>
                        <Input s={12} type='select' name="end_plant" value={end_plant} onChange={(event) => { this._oninput(event) }} defaultValue="มกราคม" >
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
                        </Input>
                    </Col>
                    <Col s={6}>
                        <Input onChange={(event) => { this._oninput(event) }} value={product_value} name='product_value' type="number" label="ผลผลิต/ไร่(กก)" s={12} />
                    </Col>



                    {/* <Input onChange={(event) => { this._oninput(event) }} value={end_plant} name='end_plant' type="text" label="ช่วงเวลาเก็บเกี่ยว(เดือน)" s={12} /> */}

                </Row>







                {/* <Input onChange={(event) => { this._oninput(event) }} value={deliver_frequency} name='deliver_frequency' type="number" label="ความถี่ในการส่งมอบ(กี่ครั้งในรอบ1เดือน) " s={12} /> */}




                <Row>
                    <Col s={8}>
                        <Col s={5} >
                            <div style={{ marginTop: 20, fontSize: 20 }}>
                                ความถี่ในการส่งมอบ
                           </div>
                        </Col>
                        <Input s={4} type='select' name="deliver_frequency_number" value={deliver_frequency_number} onChange={(event) => this.setState({ deliver_frequency_number: event.target.value })} defaultValue="1" >
                            <option value='1'>1 </option>
                            <option value='2'>2  </option>
                            <option value='3'>3 </option>
                            <option value='4'>4   </option>
                            <option value='5'>5 </option>
                            <option value='6'>6  </option>
                            <option value='7'>7    </option>
                            <option value='8'>8 </option>
                            <option value='9'>9 </option>
                            <option value='10'>10</option>
                            <option value='11'>11 </option>
                            <option value='12'>12</option>
                            <option value='13'>13</option>
                            <option value='14'>14</option>
                            <option value='15'>15</option>
                            <option value='16'>16</option>
                            <option value='17'>17</option>
                            <option value='18'>18</option>
                            <option value='19'>19</option>
                            <option value='20'>20</option>
                        </Input>
                        <Col s={3}>
                            <div style={{ marginTop: 20, fontSize: 20 }}>
                                ครั้ง
                           </div>
                        </Col>
                    </Col>


                    <Col s={4}>
                        <Col s={2} >
                            <div style={{ marginTop: 20, fontSize: 20 }}>
                                ต่อ
                           </div>
                        </Col>


                        <Input s={8} type='select' name="deliver_frequency_date" value={deliver_frequency_date} onChange={(event) => this.setState({ deliver_frequency_date: event.target.value })} defaultValue="1" >
                            <option value='วัน'>วัน </option>
                            <option value='เดือน'>เดือน  </option>
                            <option value='ปี'>ปี </option>
                        </Input>
                    </Col>
                </Row>










                <Row>

                    <Input onChange={(event) => { this._oninput(event) }} value={deliver_value} name='deliver_value' type="number" label="ปริมาณที่สามารถส่งมอบได้ในแต่ละครั้ง(กก)" s={6} />


                    <Col style={{ fontSize: 20 }} s={6}>
                        <Input onChange={(event) => { this._oninput(event) }} value={year_value} name='year_value' type="number" label="ํ จำนวนผลผลิตที่ขายต่อปี" s={8} />

                        <Input type='select' name="year_value_unit" value={year_value_unit} onChange={(event) => this.setState({ year_value_unit: event.target.value })} s={4} defaultValue="กิโล" >
                            <option value='กิโล'>กิโล </option>
                            <option value='ตัน'>ตัน  </option>
                        </Input>
                    </Col>

                </Row>
                <Input onChange={(event) => { this._oninput(event) }} value={sell_price} name='sell_price' type="number" label="ราคาที่ขาย/บาท " s={12} />

                {/* <div style={{ fontSize: 25, marginBottom: 20 }}>
                        มีประกันราคาผลผลิตจากคูคาหรือไม (มี/ไมมี) กี่ %
                        </div> */}

                <Row>
                    <Col s={6}>
                        <RegularRadioButton {...Radio_Props} />
                    </Col>
                    {insurance_partners === "มี" ? <Col s={6}>
                        <div style={{ fontSize: 25 }}>
                            ราคาประกันผลผลิต(%)
                            </div>
                        <Input onChange={(event) => { this._oninput(event) }} value={insurance_price} name='insurance_price' type="number" s={12} label="กี่ %" />

                    </Col>
                        : null}

                </Row>




                <Row onChange={(event) => { this.Seletechoie(event) }} >

                    {/* <Input onChange={(event) => { this._oninput(event) }}   name='insurance' s={2} name='choose' type='radio' value="1" label='มี' />
                        <Input onChange={(event) => { this._oninput(event) }}  name='insurance' s={2} name='choose' type='radio' value="0" label='ไม่มี' /> */}
                </Row>
                <div style={{ fontSize: 25, width: 500 }}>
                    มาตรฐานที่ขอรับรอง (รับรองตัวเอง GAP PGS Organic thailand มาตรฐานสากล (IFOAM EU USDA ฯ)
                            </div>



                <Row>
                    <Col style={{ fontSize: 20 }} s={4}>
                        <Input s={8} type='select' name="gap" value={gap} onChange={(event) => this.setState({ gap: event.target.value })} defaultValue="1" >
                            <option value='มี'>มี </option>
                            <option value='ไม่มี'>ไม่มี  </option>
                        </Input>
                    </Col>
                    <Input onChange={(event) => { this._oninput(event) }} value={gap_year} name='gap_year' type="number" label="รับรองมาแล้วกี่ป กี่ % " s={8} />
                </Row>

                {/* <Input onChange={(event) => { this._oninput(event) }}  name='gap' style={{ fontSize: 12 }} type="file" /> */}
                <Row>
                    <Input onChange={(event) => { this._oninput(event) }} value={plant_type_best} name='plant_type_best' type="text" label="ชนิดพืชท้องถิ่นที่ปลูกที่เคยปลูกได้ดี" s={6} />
                    <Input onChange={(event) => { this._oninput(event) }} value={sell_group} name='sell_group' type="text" label="แหล่งที่ขาย(ขายเองพ่อค้ามารับ) " s={6} />
                </Row>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <button style={{ width: 100, marginRight: 20 }} onClick={() => { this.Onsubmit() }} className="default_button">ตกลง</button>
                    <button style={{ width: 100 }} className="cancle_button">ยกเลิก</button>
                </div>


                <Modal styles={{ width: 500 }} open={this.state.openmodal} onClose={() => this.closemodal()}>

                    <div>
                        <Input value={this.state.edit_plan_type} onChange={(event) => { this._oninput(event) }} name="edit_plan_type" type="text" label="ชนิดพืชที่ปลูก" s={5} />
                        <button style={{ width: 100, marginRight: 20 }} onClick={() => this.on_edit_member()} className="default_button">ตกลง</button>

                    </div>


                </Modal>



            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        FarmerInformation: state.FarmerInformation,
        Manufacturing: state.Manufacturing

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setName: (data) => {
            dispatch(
                {
                    type: "SET_MANUFACTURING",
                    payload: data
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
export default connect(mapStateToProps, mapDispatchToProps)(InformationManufacturing)