import React, { Component } from 'react';
import './OrderActivity.css';
import Chart from '../../screen/PlanActivity/Chart/Chart'
import Typography from '@material-ui/core/Typography';
import { Row, Input } from 'react-materialize'


const mock_data = [
  {
    image: "1",
  },
  {
    image: "2",
  },
  {
    image: "3",
  },
  {
    image: "4",
  }
]
class OrderActivity extends Component {
  constructor() {

    super()

    this.state = {

      element: null,

      openmodal: false,

      modal_Order: null

    }

  }





  render() {

    return (

      <div>

     

        <Typography variant="h4" gutterBottom component="h3" style={{ marginTop: 10 }}>
          ส่งข้อมูลผลิตภัณฑ์
                        </Typography>
        <Row>

          <Input s={8} label="ผลิตภัณฑ์ที่ต้องการ *" />
          <Input s={8} type='select' label="สูตรอาหารที่ต้องการ *" defaultValue='2'>
            <option value='1'>Option 1</option>
            <option value='2'>Option 2</option>
            <option value='3'>Option 3</option>
          </Input> <Input s={8} type='select' label="ปริมาณที่ต้องการ *" defaultValue='2'>
            <option value='1'>Option 1</option>
            <option value='2'>Option 2</option>
            <option value='3'>Option 3</option>
          </Input>
        </Row>
        <div style={{ width: "100%", alignContent: "center" }}>
          <button style={{ width: 100, marginRight: 20 }} className="default_button">ตกลง</button>
          <button style={{ width: 100, marginRight: 20 }} className="cancle_button">ยกเลิก</button>
        </div>

      </div>

    )

  }

}

export default OrderActivity