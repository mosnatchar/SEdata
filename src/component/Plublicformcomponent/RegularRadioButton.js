import React, { Component } from 'react'



class RegularRadioButton extends Component {

    static defaultProps = {
        header: 'Radio',
        option: ["มี", "ไม่มี"],
        name : "test",
        value: null
    };

    render() {
        return (
            <div>
                <div style={{ fontSize: 25}}>
                {this.props.header}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 } }onChange={(event)=>this.props._onchange(event)} >

                    {
                        this.props.option.map((element, index) => {
                            return (
                                <div key={index} >
                                   <input type="radio" name={this.props.name} value={element} id={this.props.name+"_"+index}  checked={this.props.value===element} /><label for={this.props.name+"_"+index} >{element}</label>
                                </div>
                            )

                        })
                    }

                   

                </div>



            </div>
        )
    }

}

export default RegularRadioButton
