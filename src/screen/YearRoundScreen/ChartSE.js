import React, { Component } from 'react'
import GraphSE from '../../component/YearRoundComponent/GraphSE'
import { post, get } from '../../service/service'
const user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInR5cGUiOiI0IiwiaWF0IjoxNTM4NDYxMDgyfQ.rmrMQ-f3pKDeM_fw5XovCKiV5lytkCwYSYEBfQZwdz8'

const mock_se_graph = [
    {
        se_name: "se_เชียงราย",
        data: [{
            name: 'ข้าว',
            data: [25, 0, 0, 45, 52, 0, 128, 76, 45, 0, 12, 89]
        }, {
            name: 'น้ำผึ้ง',
            data: [54, 58, 0, 8, 88, 85, 0, 0, 0, 45, 3, 3]
        }, {
            name: 'อ้อย',
            data: [0, 0, 0, 25, 77, 52, 0, 75, 55, 7, 44, 39]
        }]
    },
    {
        se_name: "se_กรุงเทพ",
        data: [{
            name: 'มะนาว',
            data: [77, 87, 78, 58, 85, 188, 18, 18, 18, 181, 181, 181]
        }, {
            name: 'มะยม',
            data: [0, 0, 0, 8, 0, 0, 0, 0, 0, 45, 3, 3]
        }, {
            name: 'มะขาม',
            data: [36, 63, 63, 78, 66, 36, 36, 36, 63, 36, 36, 39]
        }]
    },
    {
        se_name: "se_พะเยา",
        data: [{
            name: 'ข้าวโพด',
            data: [14, 410, 14, 45, 54, 78, 0, 10, 20, 30, 40, 50]
        }]
    },
    {
        se_name: "se_เชียงราย ",
        data: [{
            name: 'มะนาว',
            data: [77, 87, 78, 58, 85, 188, 18, 18, 18, 181, 181, 181]
        }, {
            name: 'มะยม',
            data: [0, 0, 0, 8, 0, 0, 0, 0, 0, 45, 3, 3]
        }, {
            name: 'มะขาม',
            data: [36, 63, 63, 78, 66, 36, 36, 36, 63, 36, 36, 39]
        }]
    }

]


class ChartSE extends Component {

    constructor() {
        super();
        this.state = {
            se_result: []
        }
    }

    // se_result = async () => {

    //     try {
    //         await get('se/get_plant_type_chart', user_token).then((result) => {
    //             if (result.success) {
    //                 this.setState({ se_name: result.result })

    //             } else {
    //                 alert(result.error_message)
    //             }

    //         }).catch((err) => {

    //         });
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    componentWillMount() {
        this.setState({ se_result: mock_se_graph })
    }




    render() {
        return (
            <div>
                {
                    this.state.se_result.map((element, index) => {
                        return (
                            <div key={index} style={{ marginTop: 50 }}>
                                <GraphSE result={element} />
                            </div>
                        )
                    })
                }


            </div>
        )
    }
}
export default ChartSE