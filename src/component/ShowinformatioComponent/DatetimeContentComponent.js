import React, { Component } from 'react'
import { Col, Input } from 'react-materialize'
import { DatePicker } from 'antd'
import moment from 'moment'
import localization from 'moment/locale/th';

moment.locale("th", localization)

export default class EditDateContent extends Component {

    constructor(){
        super()
        this.state={
            date:null,
            duration: moment().format("YYYY-MM-DD")
        }
        
    }


    render() { 
   
        return (
           
            <Col s={this.props.col} >
                <div style={{ marginLeft: 50 }}>
                    <div style={{ float: "left", fontWeight: "bold" }}  >{this.props.header} </div>
                    <br />

                   <div   style={{ fontSize: 30,  float: "left" }}> 
                   <DatePicker
                        showTime
                        format="DD-MM-YYYY"
                        style={{ fontFamily: "Kunlasatri" }}
                        value={this.props.date ? moment(this.props.date) :null}
                        onChange={(e) => { 
                            console.log(e)
                             e?
                            this.props.onChange(e.format("YYYY-MM-DD"),this.props.name)
                             : this.props.onChange(null,this.props.name)

                        }}
                        onOpenChange={this.handleStartOpenChange}
                    />
                    </div>
                </div>
            </Col>
        );
    }
}