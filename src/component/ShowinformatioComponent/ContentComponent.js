import React, { Component } from 'react'
import { Col } from 'react-materialize'


export default class Content extends Component {
    render() {
        return (
            <Col s={this.props.col} >
                <div style={{ marginLeft: 50 }}>
                    <div style={{ float: "left", fontWeight: "bold" }}>{this.props.header}</div>
                    <br />
                    <div style={{ fontSize: 30,  float: "left" }}>{this.props.content}</div>
                </div>
            </Col>
        );
    }

}
