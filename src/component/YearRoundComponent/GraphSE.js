import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'
import { get } from '../../service/service'
const user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInR5cGUiOiI0IiwiaWF0IjoxNTM4NDYxMDgyfQ.rmrMQ-f3pKDeM_fw5XovCKiV5lytkCwYSYEBfQZwdz8'



class GraphSE extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    data_se_name = (result) => {
        let se_name = []
        result.map((element, index) => {
            se_name.push(
                {
                    name: element.name,
                    data: element.data

                }
            )
        })

        return se_name
    }




    render() {
        const options = {
            chart: {
                type: 'spline',

            },
            title: {
                text: this.props.result.se_name
            },
            credits: {
                enabled: false
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ค.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'ปริมาณ'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                split: true,
                valueSuffix: ' กิโลกรัม'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            }, series: this.props.result.data


            // series: this.roll_dash_graph_data(this.props.result)
        }

        return (
            <div>
                <ReactHighcharts config={options} />
            </div>
        )
    }
}

export default GraphSE
