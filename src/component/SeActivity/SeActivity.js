import React from 'react';
import ReactDOM from 'react-dom';
import ReactDrawer from 'react-drawer';
import SeProduct from './SeProduct/SeProduct'

/* if you using webpack, should not apply identity to this css */
import 'react-drawer/lib/react-drawer.css';

class SeActivity extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            position: 'left',
            noOverlay: false
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

    render() {
        const { page } = this.state
        return (
            <div>
                <div style={{ margintop: 10 }}>
                    <button
                        style={{ margin: 20 }}
                        onClick={this.toggleDrawer}

                    >
                        {!this.state.open ? <span>show drawer</span> : <span>close drawer</span>}
                    </button>
                </div>
                <ReactDrawer
                    open={this.state.open}
                    position={this.state.position}
                    onClose={this.onDrawerClose}
                    noOverlay={this.state.noOverlay}>
                    <i onClick={this.closeDrawer} className="icono-cross"></i>
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: 30 }}>
                        ข้อมูล SE กลาง
        </div>
                    <div >
                        <ul>
                            <li><a className="grey-text text-lighten-3" href="SeProduct">ความต้องการ</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                        </ul>
                        }
                      
                                    </div>
                </ReactDrawer>
            </div>
        );
    }
} export default SeActivity;