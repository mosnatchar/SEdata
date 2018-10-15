import React, { Component } from 'react';

import ReactHighcharts from 'react-highcharts'
import { SymblArray } from '../../static/SymbolArray'
// import { user_token } from '../../static/Constance'

class LineChart extends Component {
    constructor() {
        super();
        this.state = {

        }
    }




    roll_dash_graph_data = (result) => {
        let result_array = []
        result.map((element, index) => {
            result_array.push(
                {
                    name: element.name,
                    data: element.data,

                }
            )
        })

        return result_array


    }




    render() {
        const options = {
            chart: {
                type: 'spline',

            },
            title: {
                text: 'แผนการเพาะปลูก'
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
            },
            series: this.roll_dash_graph_data(this.props.result)
        }
        return (
            <div style={{ marginTop: 50, width: '100%' }}>

                <ReactHighcharts config={options} />
            </div>

        )
    }
}
export default LineChart