import React, { Component } from 'react'
import { Table } from 'react-materialize';
import { connect } from 'react-redux';

// const mock_data = [
//     { id: 1, name: "ton", last_name: "naja", education: "university", branch: "Computer engineer" },
//     { id: 2, name: "fff", last_name: "sdfg", education: "university", branch: "Computer engineer" },
//     { id: 3, name: "sss", last_name: "nasdfgja", education: "university", branch: "Computer engineer" }

// ]
// [{"member_id":48,"first_name":"2","last_name":"2","age":2,"education":"2","department":"2","farmer_id":107}]



class MemberComponent extends Component {



    constructor() {
        super()
        this.state = {
            member: []
        }
    }
    componentWillMount = () => {
        this.setState({ member: this.props.member })

        console.log("member", this.props)


    }


    render() {

        return (
            <div>
                <div style={{ width: 800 }}  >

                    <div style={{ fontSize: 50 }} >สมาชิกในครอบครัว </div>

                    {JSON.stringify(this.state.member) !== "[]"  ?
                    
                        <Table >
                            <thead style={{ fontSize: 25 }} >
                                <tr  >
                                    <th> ลำดับที่  </th>
                                    <th> ชื่อ </th>
                                    <th> นามสกุล </th>
                                    <th> อายุ </th>
                                    <th> การศึกษา </th>
                                    <th> สาขาวิชา </th>
                                   

                                </tr>
                            </thead>

                            <tbody style={{ fontSize: 20 }} >
                                {
                                    this.state.member ?
                                        this.state.member.map((element, index) => {
                                            return <tr>
                                                <td>{index+1}</td>
                                                <td>{element.first_name}</td>
                                                <td>{element.last_name}</td>
                                                <td>{element.age}</td>
                                                <td>{element.education}</td>
                                                <td>{element.department}</td>
                                              
                                               

                                            </tr>
                                        })

                                        : null

                                }


                            </tbody>


                        </Table>

                        : <div>ไม่มีข้อมูลสมาชิกในครอบครัว</div>

                    }



                </div>
            </div>




        )
    }
}

// const mapStateTopProps = (state) => {

//     return {

//         member: state.Member
//     }


// }



// export default connect(mapStateTopProps, null)(MemberComponent)
export default MemberComponent