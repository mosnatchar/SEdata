import React, { Component } from 'react'
import ReactTable from 'react-table'
import Modal from 'react-responsive-modal'
import { ColorGraph } from '../../static/ColorGraph'
import ModalGraphComponent from '../ModalComponent/ModalGraphComponent'
import { post } from '../../service/service';
const user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInR5cGUiOiI0IiwiaWF0IjoxNTM4NDYxMDgyfQ.rmrMQ-f3pKDeM_fw5XovCKiV5lytkCwYSYEBfQZwdz8'


class TableChart extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            modal_valiable: null,
            graph_data: [],
            modal_data: [],
            plant: null,
            month: null
        }
    }





    graph_table = (percent, color, month, plant) => {
        return (
            <div style={{ marginTop: '25%', width: '100%', cursor: percent > 0 ? 'pointer' : 'default', display: 'block' }} onClick={() => percent > 0 ? this.data_on_modal(month, plant) : null}>
                {percent}
            </div>
        )
    }

    name_plant_graph = (plant_name) => {
        return (
            <div style={{ marginTop: '25%' }}>{plant_name}</div>
        )
    }



    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };


    data_on_modal = async (month, plant) => {
        let object = {
            month: month,
            plant: plant
        }
        try {
            await post(object, 'se/get_se_chart_value', user_token).then((result) => {
                if (result.success) {
                    console.log('สำเร็จ')
                    this.setState({ modal_data: result.result, plant: plant, month: month })
                    this.onOpenModal()
                } else {
                    alert(result.error_message)
                }
            }).catch((err) => {
            })
        } catch (error) {
            console.log(error)
        }
    }

    roll_dash_array_table = (result) => {
        let array_table = []
        result.map((element, index) => {
            array_table.push(
                {
                    plant_type: this.name_plant_graph(element.name),
                    january: this.graph_table(element.data[0], ColorGraph[index], "มกราคม", element.name),
                    fabuary: this.graph_table(element.data[1], ColorGraph[index], "กุมภาพันธ์", element.name),
                    march: this.graph_table(element.data[2], ColorGraph[index], "มีนาคม", element.name),
                    april: this.graph_table(element.data[3], ColorGraph[index], "เมษายน", element.name),
                    may: this.graph_table(element.data[4], ColorGraph[index], "พฤษภาคม", element.name),
                    june: this.graph_table(element.data[5], ColorGraph[index], "มิถุนายน", element.name),
                    july: this.graph_table(element.data[6], ColorGraph[index], "กรกฎาคม", element.name),
                    august: this.graph_table(element.data[7], ColorGraph[index], "สิงหาคม", element.name),
                    september: this.graph_table(element.data[8], ColorGraph[index], "กันยายน", element.name),
                    october: this.graph_table(element.data[9], ColorGraph[index], "ตุลาคม", element.name),
                    november: this.graph_table(element.data[10], ColorGraph[index], "พฤศจิกายน", element.name),
                    december: this.graph_table(element.data[11], ColorGraph[index], "ธันวาคม", element.name),
                }
            )
        })
        return array_table
    }

    render() {
        const data = this.roll_dash_array_table(this.props.result)

        const columns = [{
            Header: 'ชนิดของพืช',
            columns: [{
                Header: 'ชื่อ',
                accessor: 'plant_type'
            }]
        },
        {
            Header: 'เดือน',
            columns: [{
                Header: 'ม.ค.',
                accessor: 'january'
            }, {
                Header: 'ก.พ.',
                accessor: 'fabuary'
            }, {
                Header: 'มี.ค.',
                accessor: 'march'
            }, {
                Header: 'เม.ย.',
                accessor: 'april'
            }, {
                Header: 'พ.ค.',
                accessor: 'may'
            }, {
                Header: 'มิ.ค.',
                accessor: 'june'
            }, {
                Header: 'ก.ค.',
                accessor: 'july'
            }, {
                Header: 'ส.ค.',
                accessor: 'august'
            }, {
                Header: 'ก.ย.',
                accessor: 'september'
            }, {
                Header: 'ต.ค.',
                accessor: 'october'
            }, {
                Header: 'พ.ย.',
                accessor: 'november'
            }, {
                Header: 'ธ.ค.',
                accessor: 'december'
            }],
        }]



        return (

            <div>
                <div style={{ marginTop: 50, width: '100%', height: 100, justifyContent: 'center' }} >
                    <div className="table_yearround" style={{ textAlign: 'center', width: '80' }}>
                        <div style={{ borderStyle: 'solid', borderWidth: 1, borderColor: '#0000' }} >
                            < ReactTable style={{ borderStyle: 'solid', borderWidth: 1 }}
                                data={data}
                                columns={columns}

                            />
                        </div>


                    </div>
                </div>
                <div >
                    <Modal open={this.state.open} onClose={() => { this.onCloseModal() }} >
                        <div style={{ width: 500, height: 200, textAlign: 'center' }} >
                            <ModalGraphComponent result={this.state.modal_data} name={this.state.plant}
                                month={this.state.month} />
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default TableChart