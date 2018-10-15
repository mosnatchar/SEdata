import React, { Component } from 'react'
import { Table } from 'react-materialize';
import { connect } from 'react-redux';

class ModalcropComponent extends Component {

    constructor(props) {
        super()
        this.state={
            plant:[]
        }
        
    }
    componentWillMount = () => {
       
       this.setState({plant: this.props.plant})

    }
    


    render() {

        return (

           
            <div>
                <div style={{ width: 800 }}  >
                    <div style={{ fontSize: 50}} >ชนิดพของพืชที่ปลูก</div>
                    
                        <Table >
                            <thead style={{fontSize:25}} >
                                <tr  >
                                    <th> plant_id </th>
                                    <th> farmer_id </th>
                                    <th> พืช </th>
                                    <th> user_id </th>

                                </tr>
                            </thead>
                            
                            <tbody style={{ fontSize: 20 }} >
                                {
                                    this.plant ?
                                        this.plant.map((element, index) =>{
                                            return  <tr>
                                                 <td>{element.plant_id}</td>
                                                 <td>{element.farmer_id}</td>
                                                 <td>{element.plant}</td>
                                                 <td>{element.user_id}</td>
                                                   </tr>
                                            
                                           
                                                  
                               
                                        })
                                        : null

                                }

                                
                            </tbody>
                            

                        </Table>
                        

                    </div>
                </div>
 



        )
    }
}
const mapStateTopProps = (state) => {

    return {

        plant: state.Plant_type
    }


}



 export default  connect(mapStateTopProps, null)(ModalcropComponent)