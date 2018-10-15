import React, { Component } from 'react'
import { Row, Input, Column } from 'react-materialize'
import { post } from '../../service/service'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null
        }
    }

    oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    _onlogin = async () => {
        let object = {
            username :this.state.email,
            password :this.state.password
        }
        try{
            await post(object,'user/user_login',null).then((res)=>{
                
                if(res.success){
                    localStorage.setItem('user_token',res.token)
                    window.location.href='/'
                }else{
                    alert(res.error_message)
                }
            })
        }catch(error){
            alert(error)
        }
    }

    render() {
        return (
            <div>
                <div style={{ padding: 5, width: 600 }}>

                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: 500, padding: 20, alignSelf: "center", display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 30 }}>
                                LOGIN
                            </div>
                            <Input onChange={(event) => {this.oninput(event) }} type='text' name="email" style={{ fontSize: 20 }} label="Email address" />
                            <Input onChange={(event) => {this.oninput(event) }} type='password' name="password" style={{ fontSize: 20 }} label="Password *" />
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                <button style={{ width: 100, marginRight: 20 }} onClick={()=>{this._onlogin()}} className="default_button">ตกลง</button>
                                <button style={{ width: 100 }} className="cancle_button">ยกเลิก</button>
                            </div>


                        </div>
                        {/* <div style={{ width:500,display: 'flex', flexDirection: 'column' , backgroundColor: "#CCFFFF"}}>
                            REGISTER
                        <Input placeholder=" email address" s={6} label="Email address * *" />
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <button style={{ width: 100, marginRight: 20 }} className="default_button">ตกลง</button>
                                <button style={{ width: 100 }} className="cancle_button">ยกเลิก</button>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        )
    }
}

export default Login