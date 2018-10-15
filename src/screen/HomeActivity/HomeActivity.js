import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import banner from '../../asset/image/Home/home21.png'


class HomeActivity extends Component {
    render() {
        return (
            <div >
                <div style={{ textAlign: 'center' }} >
                    <div style={{ position: 'absolute', width: "100%", textAlign: 'center', fontSize: 40 }}>
                        ระบบจัดการฐานข้อมูลกลุ่มวิสาหกิจเพื่อสังคม
                    </div>
                    <div style={{ alignItems:'center' }}>

                        <img style={{ width: "100%", height:"100%" }} src={banner} />

                    </div>

                </div>

            </div>
        )
    }
}
export default HomeActivity