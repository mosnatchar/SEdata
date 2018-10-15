import React, { Component } from 'react'
import { Row, Input, Table, Navbar, Col, Icon, Section, Preloader } from 'react-materialize'
import { post, get } from '../../service/service'
import { Link, Redirect } from 'react-router-dom'
import { user_token } from '../../static/Constance';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import moment from 'moment'
import SmartDataTable from 'react-smart-data-table'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Checkbox from '@material-ui/core/Checkbox';
import ShowInformation from '../ShowInformation/ShowInformation';

moment.locale('th');







class ManagementActivity extends Component {


    constructor() {
        super()
        this.state = {


            first_name: null,
            last_name: null,
            age: null,
            address: null,
            date_time: null,
            member: null,
            passion: null,
            getfarmerid: null,
            farmer_information: [],
            redirect_inputdata: false,
            redirect_showinformation: false,
            filter: null,
            boxarry: [],
            choose: false,
            notchoose: true,
            data: makeData(),
            uniquevalue: 0,
            visit: null,
            checked_all: false,
            delete: null,
            deletebox: []



        }
    }




    get_famer = async () => {

        this.setState({ farmer_information: [] })
        try {
            await get('farmer/user_get_farmer', user_token).then((res) => {

                if (res.success) {
                    console.log("length", res.result.length)
                    this.setState({ farmer_information: res.result })
                    this.props.setShowallinformationFamer(res.result)

                    setTimeout(() => {
                       
                        this._Pushdata()
                    }, 100)

                    // alert("ส่งข้อมูลสำเร็จ")
                    // // this.props.get_order()

                    // // this.props.onClose()

                } else {
                    console.log(res.error_message)
                }
            })

        } catch (err) {
            console.log(err)
        }


    }


    _ondelete = async (farmer_id) => {
        const object = { farmer_id }
        swal("คุณต้องการลบช้อมูลใช่หรือไม่", {
            buttons: {
                catch: {
                    text: "ตกลง",
                    value: "submit"
                },


                catch1: {
                    text: "ยกเลิก"

                },
            },
        })
            .then((text) => {
                switch (text) {

                    case "submit":

                        this.deletevalue(farmer_id)

                        break;
                }
            });
    }
    deletevalue = async (farmer_id) => {
        let seleck = []
        let farmer_id_data

        if (typeof farmer_id === "object") {
            farmer_id_data = JSON.stringify(farmer_id)
        } else {
            farmer_id_data = JSON.stringify([farmer_id])
        }


        const object = {
            farmer_id: farmer_id_data,



        }






        // this.state.farmer_information.map((element,index)=>{
        //    const  farmer_information=element.farmer_information
        //    seleck.push({farmer_id:farmer_information.farmer_id})
        // })



        console.log(farmer_id)
        try {
            await post(object, 'farmer/user_delete_farmer', user_token).then((res) => {

                if (res.success) {
                    this.get_famer()

                    swal("เสร็จสิ้น!", "ข้อมูลถูกลบแล้ว!", "success");
                    window.location.href = "/management"
                } else {
                    console.log(res.error_message)
                }
            })

        } catch (err) {
            console.log(err)
        }
    }

    _on_edit = async (farmer_id, element) => {
        const object = {
            farmer_id: farmer_id

        }
        try {
            await post(object, 'manufacture/user_get_plant_type', user_token).then((res) => {

                if (res.success) {
                    this.props.setEditFarmer(element)
                    this.props.setPlantType(res.result)
                    this.get_Addmember(farmer_id)

                } else {
                    console.log(res.error_message)
                }
            })

        } catch (err) {
            console.log(err)
        }


        this.props.setFrmer_id(farmer_id)

    }

    get_Addmember = async (farmer_id) => {
        const object = {
            farmer_id: farmer_id
        }
        try {
            await post(object, "member/user_get_member", user_token).then((res) => {
                if (res.success) {
                    console.log("member", res.result)
                    this.props.setAddMember(res.result)
                    setTimeout(() => { this.setState({ redirect_inputdata: true }) }, 100)
                } else {
                    console.log(res.error_message)
                }
            })


        } catch (err) {
            swal("ไม่มีข้อมูล")
            console.log(err)
        }
    }


    get_member = async (farmer_id) => {
        const object = {
            farmer_id: farmer_id

        }

        try {
            await post(object, 'member/user_get_member', user_token).then((res) => {

                if (res.success) {

                    this.props.setmember(res.result)

                    setTimeout(() => { this.setState({ redirect_showinformation: true }) }, 100)


                } else {
                    alert("ไม่มีสมาชิก")
                    console.log(res.error_message)

                }


            })
        } catch (err) {
            console.log(err)
        }


    }

    get_plant_type = async (farmer_id) => {
        const object = {

            farmer_id: farmer_id

        }
        try {
            await post(object, 'manufacture/user_get_plant_type', user_token).then((res) => {
                if (res.success) {
                    this.props.setPlantty(res.result)


                } else {
                    alert("ไม่มีข้อมูลพืช")
                    console.log(res.error_message)
                }
            })

        } catch (err) {
            console.log(err)

        }


    }





    set_data_to_page = (farmer_id, element) => {
        this.props.setPage(element)
        this.props.setFrmer_id(farmer_id)
        this.get_member(farmer_id)
        this.get_plant_type(farmer_id)


    }

    _LoopForshow_farmerid = () => {
        const arry = []
        this.state.farmer_information.map((e, i) => {
            const farmer_information = e.farmer_information
            arry.push({ farmer_id: farmer_information.farmer_id })
        })
        console.log(arry)
    }

    _Pushdata = (farmer_id) => {
        let boxarry = []
        

        this.state.farmer_information.map((element, index) => {

            boxarry.push({
                checked: true,
                num: <FormControlLabel

                    control={
                        <Checkbox
                            checked={element.checked}
                            onChange={this.handleChange(element.farmer_information.farmer_id)}
                            value="choose"
                        />
                    }
                    label="เลือก"


                />


                , ...element.farmer_information,
                visit: <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <Link style={{ color: "#474747", marginTop: 5, cursor: 'pointer' }} to="/ShowInformation">
                        <div onClick={() => this.set_data_to_page(element.farmer_information.farmer_id, element)}>
                            <Icon>visibility</Icon>
                        </div>
                    </Link>
                    <div style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => this.deletevalue(element.farmer_information.farmer_id)}>
                        <Icon small >delete</Icon>
                    </div>
                </div>
                ,
                province: element.farmer_information.address.province,
                district: element.farmer_information.address.district

                , age: moment().format("YYYY") - moment(element.farmer_information.age).format("YYYY")
            })


        })



        // alert(JSON.stringify(this.state.farmer_information))



        this.setState({ boxarry: boxarry })
        // console.log(boxarry)

    }




    priceFormatter(cell, row) {
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }

    defaultFilterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true
    }


    handleChange = name => event => {
        let index_delete = this.state.deletebox.findIndex(element => element === name)

        let deletebox = this.state.deletebox
        if (event.target.checked === true) {
            deletebox.push(name)
        } else {
            deletebox.splice(index_delete, 1)

        }
        this.setState({ deletebox: deletebox })








        let index = this.state.boxarry.findIndex(element => element.farmer_id === name);

        let change_object = this.state.boxarry[index]

        change_object.checked = event.target.checked;
        change_object.num = <FormControlLabel
            control={
                <Checkbox
                    checked={event.target.checked}
                    onChange={this.handleChange(name)}
                    value="choose"
                />

            }
            label="เลือก"

        />
        let used_object = [

            ...this.state.boxarry.slice(0, (index + 1) - 1),
            change_object,
            ...this.state.boxarry.slice(index + 1)

        ]
        this.setState({ boxarry: used_object, checked_all: false })
        console.log(used_object)

    };


    handleChange_all = name => event => {
        this.setState({ [name]: event.target.checked });



        let used_object = []

        this.state.boxarry.map((element, index) => {
            used_object.push({
                ...element,
                checked: event.target.checked,
                num: <FormControlLabel
                    control={
                        <Checkbox
                            checked={event.target.checked}
                            onChange={this.handleChange(element.farmer_id)}
                            value="choose"
                        />

                    }
                    label="เลือก"

                />

            })

            console.log(event.target.checked)
        })

        console.log("data", used_object)
        let deletebox = this.state.deletebox
        if (event.target.checked === true) {
            this.state.boxarry.map((element) => {

                deletebox.push(element.farmer_id)


            })
        } else {
            deletebox = []
        }





        this.setState({ boxarry: used_object, uniquevalue: this.state.uniquevalue + 1, deletebox: deletebox })
        console.log(this.state.uniquevalue)

    };


    componentWillMount = () => {

        this.get_famer()


    }

    _deleteall = () => {
        this.deletevalue(this.state.deletebox)
    }




    render() {

        var ReactBSTable = require('react-bootstrap-table');
        var BootstrapTable = ReactBSTable.BootstrapTable;
        var TableHeaderColumn = ReactBSTable.TableHeaderColumn;
        const { classes } = this.props;

        if (this.state.redirect_inputdata) {
            return <Redirect push to="/inputdata" />;
        } else if (this.state.redirect_showinformation) {
            return <Redirect push to="/showinformation" />;
        } else if (!user_token) {
            return <Redirect push to="/" />;
        }
        const { filter } = this.state
        const { data } = this.state

        return (

            <div >






                <button onClick={() => this._LoopForshow_farmerid()}>55</button>
                <button onClick={() => console.log(this.state.data)}>testconsollog</button>
                <button onClick={() => this._deleteall()}>ลบข้อมูล</button>
              
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.checked_all}
                            onChange={this.handleChange_all('checked_all')}
                            value="choose"
                        />
                    }
                    label="เลือกทั้งหมด"

                />



                <div style={{ display: "flex", justifyContent: 'center', width: '100%' }} >
                    <div className="show_information" style={{ marginTop: 20, width: 800 }} >


                        <div style={{ textAlign: 'center' }}>
                            <ReactTable
                                key={this.state.uniquevalue}
                                data={this.state.boxarry}

                                columns={[

                                    {
                                        //  Header: "Name",
                                        columns: [
                                            {
                                                Header: "รหัส",
                                                accessor: "num"
                                            },
                                            {
                                                Header: "รหัส",
                                                accessor: "farmer_id"
                                            },
                                            {
                                                Header: "ชื่อ",
                                                // id: "lastName",
                                                accessor: "first_name"
                                            },
                                            {
                                                Header: "นามสกุล",
                                                // id: "lastName",
                                                accessor: "last_name"
                                            }
                                        ]
                                    },
                                    {
                                        //  Header: "Info",
                                        columns: [
                                            {
                                                Header: "Age",
                                                accessor: "age"
                                            },
                                            {
                                                Header: "จังหวัด",
                                                accessor: "province"
                                            },
                                            {
                                                Header: "อำเภอ",
                                                accessor: "district"
                                            },
                                            {
                                                Header: "ดูข้อมูล",
                                                accessor: "visit"
                                            },
                                            {
                                                Header: "ลบข้อมูล",
                                                accessor: "delete"
                                            }


                                        ]
                                    },


                                ]}

                                defaultPageSize={10}
                                className="-striped -highlight"
                                showPageJump={true}
                                collapseOnSortingChange={true}
                                collapseOnPageChange={true}
                                collapseOnDataChange={true}
                                filterable={true}
                                sortable={true}
                                multiSort={true}
                                resizable={true}
                                pageSizeOptions={[5, 10, 20, 25, 50, 100]}


                                showPagination={true}

                                showPaginationBottom={true}
                                showPageSizeOptions={true}

                            />
                            <br />
                            {/* <Tips />
                            <Logo /> */}
                        </div>






                        {/* <input onChange={(event) => this.setState({ filter: event.target.value })}></input>
                        {this.state.farmer_information ?
                            <SmartDataTable
                                data={this.state.boxarry}
                                name='test-table'
                                className='ui compact selectable table'
                                sortable

                                withLinks
                                withHeaders
                                parseBool
                                parseImg
                                filterValue={filter}
                            /> : null
                        }







 */}


                    </div>
                </div>



            </div>


        )


    }


}

const mapStateToProps = (state) => {
    return {
        FarmerInformation: state.FarmerInformation,
        Manufacturing: state.Manufacturing,
        Showallfarmer: state.Showallfarmer,
        Manufacturing: state.Manufacturing,
        Delivery: state.Delivery,
        Area: state.Area


    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        setFarmerinformation: (data) => {
            dispatch(
                {
                    type: "SET_FARMER_INFORMATION",
                    payload: data.farmer_information
                }
            )
        },

        setFrmer_id: (data) => {
            dispatch(
                {
                    type: "SET_FARMER_ID",
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

        },
        setShowallinformationFamer: (data) => {
            dispatch(
                {
                    type: "Set_ALLINFORMATIONFAMER",
                    payload: data
                }

            );
        },
        setManufacturing: (data) => {
            dispatch(
                {
                    type: "SET_MANUFACTURING",
                    payload: data
                }
            );
        },
        setDelivery: (data) => {
            dispatch(
                {

                    type: "SET_DELIVERY",
                    payload: data
                }

            );
        },

        setPage: (data) => {
            dispatch(
                {
                    type: "Set_INFORMATIONFAMER_UNIQUE",
                    payload: data


                }
            );
        },
        setEditFarmer: (data) => {
            dispatch(
                {
                    type: "SET_FARMER_INFORMATION",
                    payload: data.farmer_information
                }
            )
            dispatch(
                {
                    type: "SET_MANUFACTURING",
                    payload: data.manufacture_information
                }
            )
            dispatch(
                {
                    type: "SET_FACTOR",
                    payload: data.factor_information
                }
            )
            dispatch(
                {
                    type: "SET_AREA",
                    payload: data.area_information


                }
            );
            dispatch(
                {
                    type: "SET_DELIVERY",
                    payload: data.logistic_information


                }
            );
        },
        setPlantType: (data) => {
            dispatch(
                {
                    type: "SET_MANUFACTURING_PLANT_TYPE",
                    payload: data
                }
            )
        },


        setArea: (data) => {
            dispatch(
                {
                    type: "SET_AREA",
                    payload: data


                }
            );
        },
        setmember: (data) => {

            dispatch(
                {
                    type: "SET_MEMBER",
                    payload: data

                }
            )
        },
        setAddMember: (addmember) => {
            dispatch(
                {
                    type: "SET_MEMBER",
                    payload: addmember
                }
            );
        },

        setPlantty: (data) => {
            dispatch(
                {
                    type: "SET_PLANT_TYPE",
                    payload: data
                }
            )
        }




    }
}





export default connect(mapStateToProps, mapDispatchToProps)(ManagementActivity)

