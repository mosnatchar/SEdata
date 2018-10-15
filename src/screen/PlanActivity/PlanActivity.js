import React, { Component } from 'react'
import './PlanActivity.css'
import OrderActivity from '../../component/OrderActivity/AddProduct/AddProduct'
import Plan from '../../screen/YearRoundScreen/YearRound'
import ChartSE from '../../screen/YearRoundScreen/ChartSE'
import { SideNavItem, Collapsible, CollapsibleItem, Icon } from 'react-materialize'
import Linechart from '../../component/YearRoundComponent/LineChart'
import Tabelchart from '../../component/YearRoundComponent/TableChart'
import 'react-drawer/lib/react-drawer.css';
import { SideNav, Button } from 'react-materialize'
import { Menu } from 'material-ui';
import bsn from '../../asset/image/picture.png'
import b1 from '../../asset/image/pexels-photo-1200224.jpeg'
import YearRound from '../../screen/YearRoundScreen/YearRound';

class PlanActivity extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            element: null,
            noOverlay: false,
            page: "Line"
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onDrawerClose = this.onDrawerClose.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.setNoOverlay = this.setNoOverlay.bind(this);
    }
    setPosition(e) {
        this.setState({ position: e.target.value });
    }
    setNoOverlay(e) {
        this.setState({ noOverlay: e.target.checked });
    }
    toggleDrawer() {
        this.setState({ open: !this.state.open });
    }
    closeDrawer() {
        this.setState({ open: false });
    }
    onDrawerClose() {
        this.setState({ open: false });
    }
    onchangePage = (input_text) => {
        this.setState({ page: input_text })
    }
    open_page = (element, status) => {
        this.setState({
            element: element
            , page: status
        })
    }

    render() {

        return (
            <div>
                <div style={{ marginTop: 10 }} >
                    <SideNav
                        trigger={<a ><div style={{ fontSize: 30, color: "black" }}><img src={bsn} style={{ width: 50 }} />Menu</div></a>}
                        options={{ closeOnClick: true }}
                    >
                        <div style={{ width: "100%" }}>
                            <div style={{ width: "100%", textAlign: "center", marginTop: 10 }}>
                                <img src={b1} style={{ width: 200, cursor: "pointer", alignItems: "center" }} onClick={() => { this.open_page(null, "Line") }} />
                            </div>
                            <div >
                                <SideNavItem divider />
                                <SideNavItem onClick={() => { this.open_page(null, "Line") }}><div style={{ fontSize: 18 }}>amin</div></SideNavItem>
                                <SideNavItem onClick={() => { this.open_page(null, "Line") }}><div style={{ fontSize: 18 }}>admin@admin.com</div></SideNavItem>

                                <SideNavItem divider />
                                <Collapsible >
                                    <CollapsibleItem header='Home' icon='home' style={{ fontSize: 32 }} >
                                        <SideNavItem onClick={() => { this.open_page(null, "Line") }}>แผนการเพาะปลูก</SideNavItem>
                                        <SideNavItem onClick={() => { this.open_page(null, "Tabel") }}>กราฟข้อมูลทุก SE</SideNavItem>
                                        <SideNavItem href='#!second'>DasdBoard3</SideNavItem>
                                    </CollapsibleItem>
                                    <CollapsibleItem header='Form' icon='edit outline' style={{ fontSize: 32 }} >
                                        <SideNavItem onClick={() => { this.open_page(null, "Plan") }}>ข้อมูลผลิตภัณฑ์</SideNavItem>
                                        <SideNavItem onClick={() => { this.open_page(null, "Order") }}>สั่งทำผลิตภัณฑ์</SideNavItem>
                                        <SideNavItem onClick={() => { this.open_page(null, "edit") }}>แก้ไขผลิตภัณฑ์</SideNavItem>
                                    </CollapsibleItem>
                                    <CollapsibleItem header='Third' icon='home' style={{ fontSize: 32 }}>
                                        <SideNavItem href='#!second'>1</SideNavItem>
                                        <SideNavItem href='#!second'>2</SideNavItem>
                                        <SideNavItem href='#!second'>6</SideNavItem>
                                    </CollapsibleItem>
                                </Collapsible>
                            </div>
                        </div>

                    </SideNav>
                </div>
                <div >
                    {this.state.page === "Order" ? <OrderActivity /> : this.state.page === "Line" ? <Plan />
                        : this.state.page === "Tabel" ? <ChartSE /> : this.state.page === "Plan" ? <Plan /> : null}

                </div>
            </div>
        );
    }

}
export default PlanActivity;