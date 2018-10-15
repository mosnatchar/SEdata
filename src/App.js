import React, { Component } from 'react';
import './App.css';
import HomeActivity from './screen/HomeActivity/HomeActivity';
import RouterChild from './static/Router'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { Navbar, NavItem, Icon } from 'react-materialize'
import Banner0 from '../src/asset/image/logo/slide-logo-3.png'
import Banner1 from '../src/asset/image/pexels-photo-1002778.jpeg'
import Banner2 from '../src/asset/image/pexels-photo-1200224.jpeg'
import Banner3 from '../src/asset/image/pexels-photo-1200224.jpeg'
import Modal from 'react-responsive-modal'
import Login from './screen/Login/Login';
import Dropdown from 'react-materialize/lib/Dropdown';
import moment from 'moment'
import { user_token } from './static/Constance'
import './Datepicker.css'



class App extends Component {

  constructor() {
    super()
    this.state = {
      element: null,
      openmodal: false
    }
  }
  show_dialog = (element) => {
    this.setState({
      element: element
      ,
    })

    setTimeout(() => {
      this.OpenModal()
    }, 20);
  }


  OpenModal = () => {
    this.setState({ openmodal: true });
  }



  CloseModal = () => {
    this.setState({ openmodal: false });
  }


  _onlogout = () => {
    localStorage.removeItem('user_token')
    window.location.href = '/'
  }




  render() {


    return (
      <Router>
        <div>
          <div style={{ textAlign: 'center', marginTop: 10, width: "100%" }}>

            {/* <div style={{ display: 'flex', justifyContent: 'row', width: "100%", alignItems: 'center', justifyContent: 'center' }}>
              <img src={Banner0} style={{ width: 200, marginRight: 50 }} />
              <button onClick={() => { this.show_dialog() }}> Login / REGISTER </button>
            </ div> */}



            {/* {moment().format('dddd DD MM YYYY')} */}


            {/* <div >
              <Link to="/inputinformation" >ข้อมูลส่วนตัวเกษตรกร</Link> &nbsp;
          <Link to="/informationmanufacturing">กรอกข้อมูลการผลิต</Link> &nbsp;
          <Link to={{ pathname: "/informationmanufacturing" }}>กรอกข้อมูลการผลิต</Link> &nbsp;
          <Link to={{ pathname: "/informationcultivatedarea" }}>ข้อมูลพืนทีเพาะปลูก</Link> &nbsp;
          <Link to={{ pathname: "/informationdelivery" }}>ข้อมูลการขนส่งสินค้า</Link> &nbsp;
          <Link to={{ pathname: "/Plan" }}>กราฟแสดงผลผลิต</Link>&nbsp;
          <Link to={{ pathname: "/Order" }}>ผลิตภัณฑ์</Link> &nbsp;
          <Link to={{ pathname: "/Se" }}>SE หลัก</Link>
            </div>
 */}

            {/* <div style={{ alignItems: 'center', marginTop: 20, justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
              <img src={Banner1} style={{ width: 500, marginRight: 20 }} /> */}



            <Navbar right >



              {user_token ? <NavItem ><Link className="link_nav" to={{ pathname: "/inputdata" }}>กรอกข้อมูลผลผลิต</Link></NavItem>
                : null}

              {user_token ? <NavItem ><Link className="link_nav" to={{ pathname: "/management" }}>จัดการข้อมูลเกษตรกร</Link></NavItem>
                : null}
              {user_token ? <NavItem ><Link className="link_nav" to={{ pathname: "/Plan" }}>กราฟข้อมูลผลผลิต</Link></NavItem>
                : null}

              <NavItem onClick={() => { user_token ? this._onlogout() : this.show_dialog() }}>  {user_token ? "Logout" : "Login"} </NavItem>

            </Navbar>
          </div >
          <div>
            <RouterChild />
          </div>
          <Modal styles={{ backgroundColor: '#FFFF66', width: 500 }} open={this.state.openmodal} onClose={() => { this.CloseModal() }}>

            <Login />
          </Modal>
        </div>
      </Router >
    );
  }
}

export default App;
