import React, { Component } from 'react'; 
import { Row, Input } from 'react-materialize' 
import { Bar, Line, Pie } from 'react-chartjs-2'; 
import {ChartColor} from '../../../static/ChartColor'

const mock_data = [ 
    {
        label: 'ข้าวหอม',
        data: [12, 19, 3, 5, 6, 3],
    }
   
] 
class EditProduct extends Component { 
    constructor(props) { 
        super(props); 
        this.state = {
            chartData: props.chartData
        }
    } 

    getChartData() {
        let datasets_array = []

        mock_data.map((element,index)=>{
            datasets_array.push(
                {
                    label: element.label,
                    data: element.data,
                    backgroundColor: [
                        ChartColor[index],
                        ChartColor[index+1],
                        ChartColor[index+2],
                        ChartColor[index+3],
                        ChartColor[index+4]


                    ],
                    borderColor: [
                        "transparent"

                    ]

                }
            )
        })
            this.setState({
            chartData: {
               labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                
                datasets: datasets_array
            }

        })
    }
    componentDidMount() {
        this.getChartData();
    }

    static defaultProps = { 
        displayTitle: true, 
        displayLegend: true, 
        legendPosition: 'right' 
    } 
    render() { 
        return ( 
            <div> 
                <div style={{ width: 500, padding: 50 }}> 
                    <div style={{ fontSize: 30 }}> 
                        รายละเอียดข้อมูลผลิตภัณฑ์ 
                        </div> 
                    {mock_data.map((element, index) => { 
                        return ( 
                            <div key={index}> 
 
                                <div class="item1"> {element.caption}</div> 
 
                            </div> 
 
 
 
                        ); 
                    })} 
                    <div style={{ fontSize: 32 }}>เลือกสูตรผลิตภัณฑ์ </div> 
                    <div style={{ marginTop: 10, marginBottom: 30 }}> 
 
                        <Row> 
                            <Input name='group1' type='checkbox' value='1' label='1' > 
                            <div class="center"> 
                                <div className="chart"> 
                                    < Pie 
                                        data={this.state.chartData} 
                                        options={{ 
                                            legend:{ 
                                                 
                                                position:"right" 
                                            } 
                                        }} 
                                    /> 
 
                                </div> 
                                </div> 
                               
                            </ Input>  <br/> 
                            <Input name='group1' type='checkbox' value='2'label='2'   > 
 
                                <div className="chart"> 
                                    < Pie 
                                        data={this.state.chartData} 
                                        options={{ 
                                            legend:{ 
                                                 
                                                position:"right" 
                                            } 
                                        }} 
                                    /> 
 
                                </div> 
                                
                            </ Input> 
                             <br/> 
                            <Input name='group1' type='checkbox' value='3'label='3'   > 
                                <div className="chart"> 
                                    < Pie 
                                        data={this.state.chartData} 
                                        options={{ 
                                            legend:{ 
                                                 
                                                position:"right" 
                                            } 
                                        }} 
                                    /> 
 
                                </div> 
                            </ Input> 
 
 
 
                        </Row> 
                    </div> 
                    <Input type="text" label="รายละเอียดเพิ่มเติม" s={12} /> 
 
 
 
                    <div style={{ display: 'flex', flexDirection: 'row' }}> 
                        <button style={{ width: 100, marginRight: 20 }} className="default_button">ตกลง</button> 
                        <button style={{ width: 100 }} className="cancle_button">ยกเลิก</button> 
                    </div> 
                </div> 
 
            </div> 
        ) 
    } 
} 
export default EditProduct;