import React, { Component } from 'react'
import { Table, Row, Col, Input } from 'react-materialize'
import ShowInformation from '../../screen/ShowInformation/ShowInformation';
import Content from './ContentComponent';
import GoogleMapReact from 'google-map-react';
import { google_map_api } from '../../static/Constance'
import location_icon from '../../asset/image/area/location_icon.png'
import EditContent from './EditContentComponent'
import EditDateContent from './DatetimeContentComponent'
import { connect } from 'react-redux';
import { post } from '../../service/service';
import { user_token } from '../../static/Constance';
import swal from 'sweetalert'


const Location = ({ text }) =>
    <div>
        <img style={{ marginTop: -30, width: 10, height: 20 }} src={location_icon} />
        {text}
    </div>
    ;

class Showcultivatedarea extends Component {

    constructor() {
        super();
        this.state = {
            edit: false,
            area_owner: "-",
            area_certificate: "-",
            area_storage: "-",
            area_holding: "-",
            area_wather: "-",
            water_storage: "-",
            gps: "-",
            chemical_date: "-",
            employee_type: "-",
            employee: "-"

        }

    }

    componentDidMount = () => {
        console.log(this.props.area_certificate)
        if (this.props.area_certificate !== null) {
            this.setState(this.props)
        }
       
    }
    componentWillMount() {
        this.setState(this.props)
     

    }
    _oninput = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }


    _onedit = async (farmer_id) => {

        const { area_owner, area_certificate, area_storage, area_holding, area_wather, water_storage
            , gps, chemical_date, employee_type, employee } = this.state

        const object = {
            farmer_id: farmer_id,
            area_owner: area_owner,
            area_certificate: area_certificate,
            area_storage: area_storage,
            area_storage: area_storage,
            area_holding: area_holding,
            area_wather: area_wather,
            water_storage: water_storage,
            gps: gps,
            chemical_date: chemical_date,
            employee_type: employee_type,
            employee: employee
        }


        try {
            await post(object, "area/user_update_area", user_token).then((res) => {
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

        const { area_owner, area_certificate, area_storage, area_holding, area_wather, water_storage
            , gps, chemical_date, employee_type, employee } = this.state
        const { farmer_information, manufacture_information, factor_information, logistic_information, area_information } = this.props.Showallfarmer.farmer_information_page
        const farmer_id = farmer_information.farmer_id
        let gps_obj
        try {
            gps_obj = JSON.parse(gps)

        } catch (error) {
            gps_obj = { gps: "ไม่มีกำหนด", gps: "ไม่มีกำหนด" }

        }

        JSON.stringify(this.props.area_information)

        return (


            <div>


                <Row style={{ borderStyle: 'solid', borderColor: 'palevioletred', borderWidth: 1, borderRadius: 30 }}>

                    {this.state.edit ?
                        <div>
                            {/* <EditContent col={12} name={"area_certificate"} onChange={(event) => { this._oninput(event) }} header={"ขนาดพื้นที่เพาะปลูกที่ได้รับการรับรองมาตรฐาน"} content={`${area_certificate} ไร่`} />
                            <EditContent col={12} name={"area_wather"} onChange={(event) => { this._oninput(event) }} header={"พื้นที่นานําฝนพื้นที่นานํ้าชลประทานพื้นที่นํ้าบาดาล"} content={area_wather} /> */}


                            <div style={{ fontSize: 40, marginBottom: 20, fontWeight: "bold" }}>



                                กรรมสิทธิที่ดินของตัวเองของญาติ
                                <div  >

                                    <Row  >
                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <div style={{ width: 500, marginRight: 300, display: "flex", justifyContent: "center" }} >
                                                <Col s={6}> <Input s={12} type='select' name={"area_owner"} value={area_owner} onChange={(event) => { this._oninput(event) }}>

                                                    <option value='โฉนด'>โฉนด </option>
                                                    <option value='สปก'>สปก  </option>
                                                    <option value='นส.3'>นส.3  </option>
                                                    <option value='สปก นาเช่า'>สปก นาเช่า   </option>
                                                    <option value='ไม่มีกรรมสิทธิ'>ไม่มีกรรมสิทธิ   </option>


                                                </Input></Col>
                                            </div>
                                        </div>
                                    </Row>

                                </div>

                                <div style={{ textAlign: "center", width: "100%", display: "flex", textAlign: "center" }}>
                                    <Row  >
                                        <div style={{ width: 700 }} >
                                            <Col s={6}> <Input onChange={(event) => { this._oninput(event) }} value={area_storage} name={"area_storage"} type="number" label="ขนาดพืนทีเพาะปลูกทีได้รับการรับรองมาตรฐาน(ไร่)" s={12} /></Col>
                                            <Col s={6}> <Input onChange={(event) => { this._oninput(event) }} value={area_holding} name={"area_holding"} type="number" label="จํานวนแปลงทีถือครองมีกีแปลงรวมเป็นพื้นที่เท่าไหร" s={12} /></Col>
                                            <Col s={6}><Input onChange={(event) => { this._oninput(event) }} value={area_wather} name='area_wather' type="text" label="ลักษณะพื้นที่เพาะปลูก" s={12} /></Col>
                                            <Col s={6}><Input onChange={(event) => { this._oninput(event) }} value={water_storage} name='water_storage' type="text" label="แหล่งเก็บนํ้าในพืนที(สระ เหมือง ร่องนํา)" s={12} /></Col>


                                        </div>
                                    </Row>
                                </div>
                            </div>

                            <div style={{ width: "100%" }}>


                                <div style={{ fontWeight: 'bold', font: 40 }}> พิกัด GPS</div>
                                <Col s={6}>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                        <div style={{ width: 300, display: "flex", justifyContent: "center" }}>
                                            <Input onChange={(event) => { this._oninput(event) }} name='location_search' type="text" label="Search" />
                                            <button style={{ width: 100, marginBottom: 20 }} className="default_button" onClick={() => { this.search_location() }}>Search</button>
                                        </div>
                                    </div>

                                </Col>

                                <div style={{ height: '80vh', width: '100%' }}>

                                    <div style={{ width: 700, display: "flex", textAlign: "center" }} >
                                        <GoogleMapReact
                                            bootstrapURLKeys={{
                                                key: google_map_api,
                                                language: 'th',
                                                region: 'th',
                                            }}
                                            layerTypes={['TrafficLayer', 'TransitLayer']}
                                            defaultCenter={gps}
                                            defaultZoom={this.props.zoom}
                                            heatmapLibrary={true}
                                            center={gps}

                                            // onClick={ this.handleMapClick }
                                            // ref={elem => this.map = elem}
                                            onGoogleApiLoaded={this.handleMapLoaded}


                                        >

                                            <Location
                                                lat={gps.lat}
                                                lng={gps.lng}
                                            // text={"test"}
                                            />
                                        </GoogleMapReact>

                                    </div>
                                </div>

                                <div  >
                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                        <div style={{ width: 500, display: "flex", justifyContent: "center" }} >
                                            <Input value={this.state.location_lat} onChange={(event) => { this._oninput(event) }} name='location_lat' type="email" label="พิกัด GPS Latitude" s={12} />
                                            <Input value={this.state.location_lng} onChange={(event) => { this._oninput(event) }} name='location_lng' type="email" label="พิกัด GPS Longitude" s={12} />
                                        </div>
                                    </div>
                                </div>



                            </div>


                            {/* <EditContent col={6} name={"area_owner"} onChange={(event) => { this._oninput(event) }} header={"กรรมสิทธิ์ที่ดิน"} content={`${area_owner}`} /> */}

                            {/* <EditContent col={6} name={"chemical_date"} onChange={(event) => { this._oninput(event) }} header={"ครั้งสุดท้ายทีม่ีการใช้สารเคมี"} content={`${chemical_date}`} />
                            <EditContent col={6} name={"employee_type"} onChange={(event) => { this._oninput(event) }} header={"แรงงานที่ใช้"} content={employee_type} />
                            <EditContent col={6} name={"employee"} onChange={(event) => { this._oninput(event) }} header={"ลูกจ้างในฟาร์ม"} content={employee} /> */}

                            <div >


                                <Row>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                        <div style={{ width: 500, display: "flex", justifyContent: "center" }}>

                                            <Col s={6}><Input s={12} onChange={(event) => { this._oninput(event) }} value={chemical_date} name='chemical_date' type="number" label=" ครั้งสุดท้ายที่ใช้สารเคมี(ปี)" /></Col>
                                            <Col s={6}> <Input s={12} onChange={(event) => { this._oninput(event) }} value={employee_type} name='employee_type' type="text" label="แรงงานในครอบครัว/จ้าง" /></Col>
                                        </div>
                                    </div>
                                </Row>

                                <Row >
                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                        <div style={{ width: 500, display: "flex", justifyContent: "center" }}>

                                            <Col s={12}><Input s={12} onChange={(event) => { this._oninput(event) }} value={employee} name='employee' type="number" label='ลูกจ้างในฟาร์มจำนวน(คน)' /></Col>
                                        </div>
                                    </div>
                                </Row>



                            </div>

                        </div>
                        

                        :
                        <div>
                            <Content col={6} header={"กรรมสิทธิที่ดิน"} content={`${area_owner}`} />
                            <Content col={12} header={"ขนาดพื้นที่เพาะปลูกที่ได้รับการรับรองมาตรฐาน"} content={`${area_storage} ไร่`} />
                            <Content col={12} header={"พื้นที่นานําฝนพื้นที่นานํ้าชลประทานพื้นที่นํ้าบาดาล"} content={area_wather} />
                            <Content col={6} header={"กรรมสิทธิ์ที่ดิน"} content={`${area_owner}`} />
                            <Content col={6} header={"จำนวนแปลงที่ถือครอง"} content={`${area_holding.area_holding ? area_holding.area_holding :0} แปลง รวมทั้งสิ้น ${area_holding.area_holding_sum?area_holding.area_holding_sum:0} ไร่`} />
                            <Content col={6} header={"แหล่งที่เก็บน้ำ"} content={water_storage} />

                            <Content col={6} header={"ครั้งสุดท้ายทีม่ีการใช้สารเคมี"} content={`${chemical_date}`} />
                            {/* <Content col={6} header={"แรงงานที่ใช้"} content={employee_type} /> */}
                            <Content col={6} header={"ลูกจ้างในฟาร์ม"} content={`${employee_type.employee_type} จำนวน ${employee_type.employee_type_family_Hire} คน`} />



                            <Col s={12} >
                                <div style={{ marginLeft: 50 }}>
                                    <div style={{ float: "left", fontWeight: "bold" }}>{"พิกัด GPS"}</div>
                                    <br />
                                    <div style={{ width: "70%", height: 400 }}>

                                        {gps ?

                                            <GoogleMapReact
                                                bootstrapURLKeys={{ key: google_map_api }}
                                                defaultCenter={gps}
                                                defaultZoom={11}
                                                center={gps}
                                            // onClick={ this.handleMapClick }
                                            // ref={elem => this.map = elem}
                                            // onGoogleApiLoaded={ this.handleMapLoaded }


                                            >

                                                <Location
                                                    lat={gps.lat}
                                                    lng={gps.lng}
                                                // text={"test"}
                                                />
                                            </GoogleMapReact>

                                            : null}

                                    </div>


                                </div>
                            </Col>

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

            </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(Showcultivatedarea)