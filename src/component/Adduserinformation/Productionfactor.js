import React,{Component} from 'react'
import Row from 'react-materialize/lib/Row';
import { Input, NavItem ,Col} from 'react-materialize';
import Button from 'react-materialize/lib/Button';
import Dropdown from 'react-materialize/lib/Dropdown';
import { post } from '../../service/service'
import {user_token} from '../../static/Constance'
import { connect } from 'react-redux';
import swal from 'sweetalert'
import ManagementActivity from '../../screen/ManagementActivity/ManagementActivity'
import {Redirect} from 'react-router-dom'
class Productionfactor extends React.Component{
        constructor(){
            super()
            this.state={
                checkbox_leader: [],
                seed:null,
                manure:null,
                manure_use:"-",
                manure_type:"-",
                equipment:null,
              
                
               

            }
        }
        Onsubmit = async () => {
            const { seed, manure, manure_use, manure_type, equipment,} = this.state
            const object = {
                farmer_id:this.props.FarmerInformation.farmer_id,
                seed: seed,
                manure: manure,
                manure_use: manure_use,
                manure_type: manure_type,
                equipment:equipment,
               
              
               
    
    
            }
            
            console.log("object",object)
    
            if(seed&&manure&&manure_use&&manure_type&&equipment){
                
        
                console.log('object', object)
                try {
                    await post(object, 'factor/user_add_factor',user_token).then((res) => {
                        if (res.success) {
                            // this.props.setFarmer_id(res.result.farmer_id)
                            // this.props.setNextstep(res.result.step)

                            this.props.setFactor(object)
                            swal("ส่งข้อมูลสำเร็จ")
                      
                          
                            // this.props.get_order()
        
                            // this.props.onClose()
        
                        } else {
                            console.log(res.error_message)
                        }
                        this.props.NextStep()
                    })
        
                } catch (err) {
                    console.log(err)
                }
            }else{
                swal("กรุณากรอกข้อมูลให้ครบถ้วน")
            }
            
        }
        _oninput=event=>{
            this.setState({[ event.target.name] : event.target.value})
        }



        // _oncheckbox = event => {
        //     let index
        //     let leader_array = this.state[event.target.name]
        //     console.log("checkbok_leader", this.state[event.target.name].indexOf(event.target.value))
        //     index = this.state[event.target.name].indexOf(event.target.value)
        //     if (index === -1) {
        //         leader_array.push(event.target.value)
        //     } else {
        //         leader_array.splice(index, 1)
        //     }
        //     this.setState({ [event.target.name]: leader_array })
        // }
        _onradio_manure=(event)=>{
            console.log(event.target.value)
            this.setState({manure:event.target.value})
        }
        _onradio_equipment=(event)=>{
            console.log(event.target.value)
            this.setState({equipment:event.target.value})
        }

        componentWillMount = () => {
            this.setState(this.props.Factor)
        }


       

    render(){
        const {  seed,
            manure,
            manure_use,
            manure_type,
            equipment
           
            } = this.state
        return(
        
            <div style={{padding:50}}>
            <div style={{width:800,marginLeft:400}}>
                       
                   {/* <div style={{fontSize:50,marginBottom:20,textIndent:100}} > ปัจจัยการผลิต </div> */}
                   {/* <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexDirection: "row",marginRight:50 }}>
                                Farmer_ID:
                            {this.props.FarmerInformation ? this.props.FarmerInformation.farmer_id : null}
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                Step:
                            {this.props.FarmerInformation ? this.props.FarmerInformation.next_step : null}
                            </div>
                        </div> */}
                <div style={{fontSize:25,marginBottom: 20 }} >
                เมล็ดพันธ์และกิ่งพันธ์ได้มาโดย 
                
                </div>
                <div style={{marginTop:10,width:300}}>
                     {/* <Row >
                       <Input s={2} name="Group1" type="radio" value="1" label="ซื้อมา" />
                       <Input s={2} name="Group1" type="radio" value="0" label="จ้างผลิต" />
                  
                    </Row> */}
                     <Input value={seed} onChange={(event)=>this._oninput(event)} name="seed" type="text" label="เก็บเอง/ซื้อมา/อื่นๆ" s={12} />
                </div>
                <div style={{fontSize:25 }} >
                      ใช้ปุ๋ยหรือไม่
                      {manure}
                      <div  style={{display:'flex',flexDirection:'column'}}  onChange={(event) => this._onradio_manure(event)}>
                   
                    <input  type="radio" name="manure" value="ใช้" id="q_1_1" checked={ manure === "ใช้"} /><label for="q_1_1">ใช้</label>
                    <input type="radio" name="manure" value="ไม่ใช้" id="q_1_2" checked={ manure === "ไม่ใช้"} /><label for="q_1_2">ไม่ใช้</label>
                    
               </div>
                      {manure==="ใช้" ?  <div style={{fontSize:25,width:300}}>
                                 ผลิตปุ๋ยเองหรือซื้อ
                                 {/* <Row>
                                     <Input s={2} name="Group3" type="radio" value="1" label="ผลิตเอง" />
                                     <Input s={2} name="Group3" type="radio" value="0" label="ซื้อมา" />
                                 </Row> */}
                                  <Input value={manure_use}  onChange={(event)=>this._oninput(event)}name="manure_use"  type="text"  label="ผลิตปุ๋ยเองหรือซื้อ" s={12} />
                                  <div style={{width:300}}>
                            ชนิดของปุ๋ย
                           <Input value={manure_type}  onChange={(event)=>this._oninput(event)}name="manure_type" type="text" label="ชนิดของปุ๋ย" s={12} />
               </div>
                            </div> :null}
                           

                               
                                

                         {/* <div style={{fontSize:25}}>
                      
                       
                            <Row onChange={(event) => { this._oncheckbox(event) }}>
                                <Input s={2} name="checkbox_leader" type="checkbox" value="เคมี" label="เคมี" />
                                 <Input s={2} name="checkbox_leader" type="checkbox" value="อินทรีย์" label="อินทรีย์" />
                                 <Input s={4} name="checkbox_leader" type="checkbox" value="น้ำหมักชีวภาพ" label="น้ำหมักชีวภาพ" />
                                
                                   
                           </Row>
                        </div>
                            <Row >
                                <Input  s={2} name="Group1" type="checkbox" value="สารชีวภัณฑ ์" label="สารชีวภัณฑ์" />
                                 <Input s={3} name="Group1" type="checkbox" value="สารสกัดธรรมชาติทีผลิตเอง" label="สารสกัดธรรมชาติทีผลิตเอง" />
                                   
                           </Row> */}
                        
                </div>

                <div style={{fontSize:25,fontWeight:80,marginBottom:30}}> 
                        เครื่องมือทางการเกษตร
                     {/* < Row>
                         <Input s={3} name="Group4" type="radio" value="1" label="ใช้ของตัวเอง" />
                         <Input s={3} name="Group4" type="radio" value="0" label="ไม่ได้ใช้ของตัวเอง" />
                     </Row> */}
                     <div  style={{display:'flex',flexDirection:'column',marginRight:200}} defaultValue={equipment} onChange={(event) => this._onradio_equipment(event)}>
                  
                    <input  type="radio" name="equipment" value="ของตัวเอง" id="q_1_11" checked={ equipment === "ของตัวเอง"} /><label for="q_1_11">ของตัวเอง</label>
                    <input  type="radio" name="equipment" value="ยืม" id="q_1_22"  checked={ equipment === "ยืม"}/><label for="q_1_22">ยืม</label>
                     <input type="radio" name="equipment" value="จ้าง/ทำเกษตรอินทรีย์" checked={ equipment === "จ้าง/ทำเกษตรอินทรีย์"} id="q_1_33" /><label for="q_1_33">จ้าง/ทำเกษตรอินทรีย์</label>
                   <input type="radio" name="equipment" value="จ้าง/ไม่ทำเกษตรอินทรีย์" checked={ equipment === "จ้าง/ไม่ทำเกษตรอินทรีย์"} id="q_1_44" /><label for="q_1_44">จ้าง/ไม่ทำเกษตรอินทรีย์</label>
           
               </div>
                      {/* <Input   onChange={(event)=>this._oninput(event)}name="equipment" type="text" label="เครื่องมือทางการเกษตร" s={12} /> */}

                 </div>

                    {/* <div style={{fontSize:25}}> 
                         อุปกรณ์ทางการเกษตร คนที่ยืม/จ้าง ทำเกษตรอินทรีย์หรือไม่
                        {/* < Row>
                                <Input s={3}  name="Group5" type="radio" value="1" label="ทำเกษตรอินทรีย์" />
                                 <Input s={3} name="Group5" type="radio" value="0" label="ไม่ได้เกษตรอินทรีย์" />
                        </Row> */}
                        {/* <Input  onChange={(event)=>this._oninput(event)}name="equipment1"  type="text" label="   อุปการณ์ทางการเกษตร คนที่ยืม/จ้าง ทำเกษตรอินทรีย์หรือไม่" s={12} />

                    </div> */} 

                    <button style={{ width: 100, marginRight: 20 }}className="default_button"  onClick={()=>this.Onsubmit()}>ตกลง</button>
                    <button style={{ width: 100 }} className="cancle_button ">ยกเลิก</button>



                </div>
                    
            </div>

                                


        );
    }
}
const mapStateToProps = (state) => {
    return {
        FarmerInformation: state.FarmerInformation,
        Factor:state.Factor
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNextstep: (next_step) => {
            dispatch(
                {
                    type: "SET_NEXT_STEP",
                    payload: next_step
                }

            );
        },

        setFactor: (data) => {
            dispatch(
                {
                    type: "SET_FACTOR",
                    payload: data
                }

            );
        }
        
        
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Productionfactor)