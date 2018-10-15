import React, { Component } from 'react';
import { Row, Input, Table } from 'react-materialize'

const mock_data = [
    {
        image: "dsfsdffffffffff1",
    },
    {
        image: "2sdfffffffffffffffffffffffff",
    },
    {
        image: "sdfsdfdfsdfsd3",
    },
    {
        image: "4sdfffffffffffffffffffffffffffffff",
    }
]
class SeProduct extends Component {
    constructor() {

        super()

        this.state = {

            element: null,

            openmodal: false,

            modal_Order: null

        }

    }
    render() {
        return (
            <div >
                <div></div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Table >
                        <thead>
                            <tr>
                                <th >Name</th>
                                <th >รายละเอียดผลิตภัณฑ์</th>
                                <th ></th>
                            </tr>
                        </thead>
                        {mock_data.map((element, index) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>asdad</td>
                                        <td>{element.image}</td>
                                        <td><button className="default_button" >เพิ่ม</button>
                                            <button className="cancle_button">ยกเลิก</button></td>
                                    </tr>
                                </tbody>
                            );
                        })
                        }
                    </Table>
                </div>
            </div>
        )
    }

} export default SeProduct;