import React, { Component } from 'react'
import { Row, Input, Col } from 'react-materialize'
import { user_token } from '../../static/Constance'
import { post } from '../../service/service'
import location_icon from '../../asset/image/area/location_icon.png'
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import { Loader } from 'react-loader-display'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import swal from 'sweetalert'


// import {
//     withScriptjs,
//     withGoogleMap,
//     GoogleMap,
//     Marker,
// } from "react-google-maps";


import { google_map_api } from '../../static/Constance'

const Location = ({ text }) =>
    <div>
        <img style={{ marginTop: -30, width: 10, height: 20 }} src={location_icon} />
        {text}
    </div>
    ;




class InformationCultivatedarea extends Component {

    static defaultProps = {
        center: {

            lat: 19.31478838493151,
            lng: 100.17333984375
        },
        zoom: 10
    };


    constructor() {
        super()
        this.state = {
            // area_certificate: null,
            area_owner: "ไม่มีกรรมสิทธิ",
            area_storage: null,
            area_holding: null,
            area_wather: null,
            water_storage: null,
            gps: {
                lat: 19.31478838493151,
                lng: 100.17333984375
            },
            employee_type: null,
            employee: null,
            chemical_date: null,
            location_center: {
                lat: 19.31478838493151,
                lng: 100.17333984375
            },
            location_lat: 0,
            location_lng: 0,
            location_search: null,



            employee_type_family_Hire: null,

            area_holding_sum :null



        }
        this.map

    }

    Seletechoie = (event) => {
        console.log("event", event.target)
        // this.setState({[event.target.name]:event.target.value})
    }

    // _onsubmit = () => {
    //     this.props.NextStep()
    // }



    Onsubmit = async () => {

            let {employee_type_family_Hire} = this.state

            let employee_type={
                employee_type:this.state.employee_type,
                employee_type_family_Hire:employee_type_family_Hire
            }
            console.log(employee_type)



            let {area_holding_sum} = this.state

            let area_holding={
                area_holding:this.state.area_holding,
                area_holding_sum:area_holding_sum
            }

            this.setState({area_holding_sum:area_holding_sum})

            console.log(area_holding)

        const { area_storage,  area_wather, water_storage, gps, area_owner
           , employee, chemical_date, location_lat, location_lng } = this.state
        const object = {
            farmer_id: this.props.FarmerInformation.farmer_id,
            area_storage: area_storage,
            area_holding:JSON.stringify( area_holding),
            area_wather: area_wather,
            water_storage: water_storage,
            gps: JSON.stringify({ lat: location_lat, lng: location_lng }),
            employee_type: JSON.stringify(employee_type),
            // employee: employee,
            chemical_date: chemical_date,
            area_owner: area_owner





        }
        console.log("object",object)
        // console.log("object", object)

        if (area_storage && area_holding && area_wather && water_storage &&
            gps && employee_type && employee && chemical_date, area_owner) {
            console.log('object', object)
            this.props.setName(object)
            try {
                await post(object, 'area/user_add_area', user_token).then((res) => {
                    if (res.success) {
                        this.props.setNextstep(res.result.step)
                        swal("ส่งข้อมูลสำเร็จ")
                        this.props.NextStep()
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

    _onmapClick = (event) => {
        console.log(event)
        // this.setState({ location_lat: event.lat, location_lng: event.lng })


    }
    componentWillMount = () => {
        if (this.props.Area) {
            this.setState(this.props.Area)
            this.setState({ location_lat: this.props.center.lat, location_lng: this.props.center.lng })
            Geocode.setApiKey(google_map_api);
        }


     
    }



    search_location = () => {
        if (this.state.location_search) {
            Geocode.fromAddress(this.state.location_search).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    this.setState({
                        location_lat: lat,
                        location_lng: lng,
                        location_center: { lat: lat, lng: lng }
                    })
                    console.log(lat, lng);
                },
                error => {
                    alert(error);
                }
            );
        }

    }

    handleMapClick = ({ x, y, lat, lng, event }, force) => {
        console.log('==> handleMapClick(..) : ' + lat + ',' + lng + ' (x=' + x + ',y=' + y + ')');
    }




    handleMap = ({ x, y, lat, lng }) => {
        console.log('==> handleMapClick2(..) : ' + lat + ',' + lng + ' (x=' + x + ',y=' + y + ')');
        this.setState({ location_lat: lat, location_lng: lng })
    }
    handleMapLoaded = ({ map }) => {
        console.log('map', map)


        map.addListener('click', event => {
            this.handleMap({ 'x': event.pixel.x, 'y': event.pixel.y, 'lat': event.latLng.lat(), 'lng': event.latLng.lng() });
        });
    }

    _onradio = (event) => {
        console.log(event.target.value)
        this.setState({employee_type: event.target.value})
    }






    render() {
        const { area_storage,
            area_holding,
            area_wather,
            water_storage,
            gps,
            employee_type,
            employee,
            chemical_date,
            area_owner,
            employee_type_family_Hire,
            area_holding_sum
        } = this.state
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {/* {JSON.stringify( this.state)} */}

                <div style={{ width: 1000, padding: 50, marginLeft: 300 }}>
                    {/* <div style={{ fontSize: 50, marginBottom: 20 }}>
                        ข้อมูลพื้นที่เพาะปลูก

                        </div> */}

                    {/* <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ display: "flex", flexDirection: "row", marginRight: 50 }}>
                            Farmer_ID:
                            {this.props.FarmerInformation ? this.props.FarmerInformation.farmer_id : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            Step:
                            {this.props.FarmerInformation ? this.props.FarmerInformation.next_step : null}
                        </div>
                    </div>
 */}


                    <div style={{ fontSize: 25 }}>



                        กรรมสิทธิที่ดินของตัวเองของญาติ (โฉนด สปก นส.3 ไม่มีกรรมสิทธิ) สปก นาเช่า

                         <div style={{ display: 'flex', flexDirection: 'row' }}>


                            <Row >


                                <Col s={12}>
                                    <Input type='select' name="area_owner" value={area_owner} onChange={(event) => this.setState({ area_owner: event.target.value })}  >

                                        <option value='ไม่มีกรรมสิทธิ'>ไม่มีกรรมสิทธิ </option>
                                        <option value='สปก'>สปก  </option>
                                        <option value='นส.3 '>นส.3  </option>
                                        <option value='โฉนด'>โฉนด </option>




                                    </Input>
                                </Col>
                            </Row>
                        </div>


                    </div>
                    {/* <Input style={{ fontSize: 12 }} type="file" /> */}
                    <div style={{ width: 700 }}>
                        <Row>
                            <Col s={6}> <Input onChange={(event) => { this._oninput(event) }} value={area_storage} name='area_storage' type="number" label="ขนาดพืนทีเพาะปลูกทีได้รับการรับรองมาตรฐาน(ไร่)" s={12} /></Col>


                            
                        
                        </Row>
                        <div style={{display:'flex',flexDirection:'column'}}>


                        <div style={{display:'flex',flexDirection:'row'}} onChange={(event)=>console.log(event.target.value)}>

                              <Col s={6}> <Input  style={{marginBottom:50,width:300}}  onChange={(event) => { this._oninput(event) }} value={area_holding} name='area_holding' type="number" label="จํานวนแปลงทีถือครองมีกีแปลงรวมเป็นพื้นที่เท่าไหร" s={12} /></Col>
                           
                           <div style={{marginTop:20,fontSize:20,marginRight:5}}>
                               แปลง
                        
                           </div>
                            <div onChange={(event)=>console.log(event.target.value)}>
                                   <Col s={6}> <Input onChange={(event) => { this._oninput(event) }} value={area_holding_sum} name='area_holding_sum' type="number" label="รวมเป็นพื้นที่เท่าไหร" s={12} /></Col>
                     
                            </div>
                     
                        </div>
                  
                  
                  
                  
                   

                        </div>
                  
                   
                   
                    </div>

                    {JSON.stringify(this.state.checkbox_leader)}
                    <div style={{ width: 700 }}>
                        <Row >
                            {/* <Input name="checkbox_leader" type='checkbox' value='พื้นทีนานําฝน' label='พื้นทีนานําฝน' />
                        <Input name="checkbox_leader" type='checkbox' value='พืนทีนานําชลประทาน' label='พืนทีนานําชลประทาน' />
                        <Input name="checkbox_leader" type='checkbox' value='พืนทีนําบาดาล' label='พืนทีนําบาดาล' /> */}

                            <Col s={6}><Input onChange={(event) => { this._oninput(event) }} value={area_wather} name='area_wather' type="text" label="ลักษณะพื้นที่เพาะปลูก" s={12} /></Col>
                            <Col s={6}><Input onChange={(event) => { this._oninput(event) }} value={water_storage} name='water_storage' type="text" label="แหล่งเก็บนําในพืนที(สระ เหมือง ร่องนํา)" s={12} /></Col>

                        </Row>
                    </div>
                    <div style={{ width: 400 }}>

                        {/* <Row>
                            <Col s={12}><Input onChange={(event) => { this._oninput(event) }} name='water_storage' type="text" label="แหล่งเก็บนําในพืนที(สระ เหมือง ร่องนํา)" s={12} /></Col>

                        </Row> */}
                        <div style={{ fontWeight: 'bold' }}> พิกัด GPS</div>
                        <Col s={12}>
                            <Input onChange={(event) => { this._oninput(event) }} name='location_search' type="text" label="Search" s={8} />
                            <button style={{ width: 100, marginBottom: 20 }} className="default_button" onClick={() => { this.search_location() }}>Search</button>
                        </Col>

                        <div style={{ height: '100vh', width: '100%' }}>


                            <GoogleMapReact
                                bootstrapURLKeys={{
                                    key: google_map_api,
                                    language: 'th',
                                    region: 'th',
                                }}
                                layerTypes={['TrafficLayer', 'TransitLayer']}
                                defaultCenter={this.state.location_center}
                                defaultZoom={this.props.zoom}
                                heatmapLibrary={true}
                                center={this.state.location_center}

                                // onClick={ this.handleMapClick }
                                // ref={elem => this.map = elem}
                                onGoogleApiLoaded={this.handleMapLoaded}


                            >

                                <Location
                                    lat={this.state.location_lat}
                                    lng={this.state.location_lng}
                                // text={"test"}
                                />
                            </GoogleMapReact>





                        </div>



                        <Input value={this.state.location_lat} onChange={(event) => { this._oninput(event) }} name='location_lat' type="email" label="พิกัด GPS Latitude" s={12} />
                        <Input value={this.state.location_lng} onChange={(event) => { this._oninput(event) }} name='location_lng' type="email" label="พิกัด GPS Longitude" s={12} />
                        {/* <Input name='' type="email" label="แรงงานทีใช้" s={12} /> */}



                    </div>
                    <div style={{ width: 800 }}>
                        <div style={{ width: 500 }}>

                            <Row>
                                <Col s={6}><Input s={12} onChange={(event) => { this._oninput(event) }} value={chemical_date} name='chemical_date' type="number" label=" ครั้งสุดท้ายที่ใช้สารเคมี(ปี)" /></Col>



                            </Row>

                            <div style={{ fontSize: 20 }} >


                              
                                    

                                      เเรงงานที่ใช้
                                         



                                  

                             

                                <div style={{ display: 'flex', flexDirection: 'row' }} onChange={(event) => this._onradio(event)}>

                                    <input type="radio" name="employee_type" value="เเรงงานครอบครัว" id="q_1_1_1" checked={employee_type === "เเรงงานครอบครัว"} /><label for="q_1_1_1"  >เเรงงานครอบครัว</label>
                                    <input type="radio" name="employee_type" value="จ้างเเรงงาน" id="q_1_2_2" checked={employee_type === "จ้างเเรงงาน"} /><label for="q_1_2_2"  >จ้างเเรงงาน</label>

                                </div>

                            </div>

                            {employee_type === "เเรงงานครอบครัว" ? 
                            <div style={{ fontSize: 25, width: 300 }} onChange={(event)=>this.setState({employee_type_family_Hire:event.target.value})}>
                                <Col s={6}> <Input s={12} onChange={(event) => { this._oninput(event) }}   value={ employee_type_family_Hire} name=' employee_type_family_Hire' type="text" label="แรงงานในครอบครัวจำนวน(คน)"  /></Col>
                            </div>
                                : employee_type=== "จ้างเเรงงาน" ?

                                    <div style={{ fontSize: 25, width: 300 }} onChange={(event)=>this.setState({employee_type_family_Hire:event.target.value})}>
                                        <Col s={6}> <Input s={12} onChange={(event) => { this._oninput(event) }} value={ employee_type_family_Hire} name=' employee_type_family_Hire' type="text" label="จ้างเเรงงานจำนวน(คน)" /></Col>
                                    </div>

                                    : null
                            }





                        </div>
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row' ,marginTop:20}}>
                        <button style={{ width: 100, marginRight: 20 }} onClick={() => { this.Onsubmit() }} className="default_button">ตกลง</button>
                        <button style={{ width: 100 }} className="cancle_button">ยกเลิก</button>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        FarmerInformation: state.FarmerInformation,
        Area: state.Area
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setName: (aeradata) => {
            dispatch(
                {
                    type: "SET_AREA",
                    payload: aeradata
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


export default connect(mapStateToProps, mapDispatchToProps)(InformationCultivatedarea)