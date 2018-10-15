import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'


class ModalGraphComponent extends Component {

    constructor() {
        super()
        this.state = {
            se_data: [],
            values: 0
        }

    }

    progres_bar = (percent, color, number, content, values) => {
        return (
            <div >
                <div style={{ width: '80%', fontSize: 15, display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                    <div >
                        {number + '. ' + content}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', marginLeft: 250 }}>
                        <div style={{ width: 50 }}>{values + ' kg.'}</div>
                        <div>
                            <div style={{ width: 150, height: 15, borderStyle: 'solid', borderWidth: 0.5, borderRadius: 3 }}>
                                <div style={{ height: 15, width: percent + '%', backgroundColor: color, borderRadius: 2.8 }} />
                            </div>
                        </div>
                        <div style={{ width: 50 }}>{Math.round(percent) + ' %'}</div>
                    </div>
                </div>
            </div>

        )
    }

    componentWillMount() {
        this.percent_on_progres(this.props.result)
    }

    percent_on_progres = (result) => {
        let values = 0
        result.map((element, index) => {
            values += element.data
        })

        this.setState({ values: values })
    }

    calculate_percent = (data) => {
        return (data * 100) / this.state.values
    }

    render() {
        return (
            <div style={{ marginTop: 60, width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <div>{this.props.name} </div>
                    <div>&nbsp;เดือน {this.props.month}</div>
                    <div>&nbsp;ปริมาณรวม {this.state.values} กิโลกรัม</div>

                </div>
                {
                    this.props.result.map((element, index) => {
                        return this.progres_bar(this.calculate_percent(element.data), '#474747', index + 1, element.se_name, element.data)
                    })
                }

                {/* < ReactHighcharts config={percent_se} /> */}
            </div >
        )
    }
}

export default ModalGraphComponent