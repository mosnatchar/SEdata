import React,{Component} from 'react'
import { Col,Input } from 'react-materialize'


export default class EditContent extends Component {
    render() {
        return (
            <Col s={this.props.col} >
                <div style={{ marginLeft: 50 }}>
                    <div style={{ float: "left", fontWeight: "bold" }}  >{this.props.header} </div>
                    <br />

                    <input onChange={(event)=>{this.props.onChange(event)}} name={this.props.name} style={{ fontSize: 30,  float: "left", width:300 }}  type="text" value={this.props.content} />
            
                </div>
            </Col>
        );
    }
}