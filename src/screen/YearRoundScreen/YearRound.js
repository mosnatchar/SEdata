import React, { Component } from 'react'
import LineChart from '../../component/YearRoundComponent/LineChart'
import TableChart from '../../component/YearRoundComponent/TableChart'
import { post, get } from '../../service/service'
const user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInR5cGUiOiI0IiwiaWF0IjoxNTM4NDYxMDgyfQ.rmrMQ-f3pKDeM_fw5XovCKiV5lytkCwYSYEBfQZwdz8'

class YearRound extends Component {

    constructor() {
        super();
        this.state = {
            LineChart: [],
            TableChart: []
        }
    }

    on_get_graph_result = async () => {
        // ต้องใส่ team_code ไม่งั้น error
        // let object = {
        //     team_code: 19
        // }
        try {
            await get('se/get_plant_type_chart', user_token).then((result) => {
                if (result.success) {
                    this.setState({ LineChart: result.result, TableChart: result.result })

                } else {
                    alert(result.error_message)
                }

            }).catch((err) => {

            });
        } catch (error) {
            console.log(error)
        }
    }


    componentWillMount() {
        this.on_get_graph_result()
    }




    render() {
        return (
            <div>
                <LineChart result={this.state.LineChart} />
                <TableChart result={this.state.TableChart} />
            </div>
        )
    }
}
export default YearRound