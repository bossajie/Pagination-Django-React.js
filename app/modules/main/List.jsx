import React from 'react'
import axios from 'axios'
import Pagination from './components/Pagination'

export default class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: [],
            pageOfItems: [],
            isLoaded: false
        }        
    }
    componentDidMount(){
        this.setState({
            isLoaded: true
        })
    }
    deleteStudent(id){
        axios.post('main/delete/',{
            'id' : id
        }).then((res=>{
            if (res.data.message==='success'){
                this.setState({isLoaded: false})

                setTimeout(() =>{

                },2000);
                this.setState({
                    isLoaded: true
                })
            }
        }))
    }

    // for Pagination on django
    onChangePage(pageItems){
        this.setState({ pageOfItems: pageItems, isLoaded: true })
    }

    render(){
        if (this.state.isLoaded){
            return(
                <div className="container">
                        <hr />
                            <a href="#/add">
                                <button className="btn btn-success btn-sm pull-right">ADD STUDENT</button>
                            </a>
                    <h1>Student List</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>Birth Date</th>
                                <th>Course</th>
                                <th>Year Level</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pageOfItems.map((a,b)=>{
                                return(
                                    <tr key={b}>
                                        <td>{a.id}</td>
                                        <td>{a.firstName}</td>
                                        <td>{a.middleName}</td>
                                        <td>{a.lastName}</td>
                                        <td>{a.birthDate}</td>
                                        <td>{a.course}</td>
                                        <td>{a.yearLevel}</td>
                                        <td><a href={`#/update/${a.id}`}>EDIT</a>| <a style={{'cursor':'pointer'}} onClick={()=> {if(window.confirm('Are you sure to delete?')) this.deleteStudent(a.id)} }>DEL</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className='pull-right'>
                        <Pagination 
                            url='main/getallstudents' limitPerPage={10} 
                            onChangePage={this.onChangePage.bind(this)}
                        />
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                </div>
            )
        }
    }
}