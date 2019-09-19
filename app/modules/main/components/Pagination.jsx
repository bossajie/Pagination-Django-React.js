import React from 'react'
import axios from 'axios'

export default class Pagination extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentPage : '',
            nextPage: '',
            prevPage: '',
            totalCount: '',
            totalPage: '',
        }
    }
    componentDidMount(){
        this.changePageRequest()
    }

    changePageRequest(action,e){
        // let page = action==='next' ? this.state.currentPage + 1 : this.state.currentPage - 1 ? action===
        let page
        if (action==='next'){
            page = this.state.currentPage + 1
        }
        else if (action==='prev'){
            page = this.state.currentPage - 1
        }
        else if (action==='last'){
            page = this.state.totalPage
        }
        else if (action==='first'){
            page = 1
        }

        axios.get(this.props.url,{
            params :{
                'current_page': !action ? 1 : page,
                'limit_per_page': this.props.limitPerPage,
            }
        }).then((res)=>{
            if (res.data.message==='success'){
                let pageInfo = res.data.page_info
                this.setState({
                    // first page is the default
                    currentPage: pageInfo.current_page,
                    nextPage: pageInfo.next_page_number,
                    prevPage: pageInfo.prev_page_number,
                    totalCount: pageInfo.total_count,
                    totalPage: pageInfo.total_page,
                })
                this.props.onChangePage(res.data.data)
            }
        })
    }

    render(){
        return(
            <div>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={this.state.prevPage===0 ? 'page-item disabled' : 'page-item' }>
                        <a className="page-link" tabIndex="-1" onClick={this.state.prevPage===0 ? null : this.changePageRequest.bind(this,'prev')} style={this.state.prevPage===0 ? {} : {'cursor':'pointer'}}>Previous</a>
                        </li>
                        {this.state.currentPage-1 !==0 ?
                            <li className="page-item" onClick={this.state.prevPage===0 ? null : this.changePageRequest.bind(this,'first')} style={{'cursor':'pointer'}}><a className="page-link" >1....</a></li>
                        : ''}
                        <li className="page-item active">
                        <a className="page-link" >{this.state.currentPage} <span className="sr-only">(current)</span></a>
                        </li>

                        {this.state.currentPage !== this.state.totalPage ? 
                        <li className="page-item" onClick={this.state.nextPage===0 ? null : this.changePageRequest.bind(this,'last')} style={{'cursor':'pointer'}}><a className="page-link">....{this.state.totalPage}</a></li>
                        : ''}
                        <li  className={this.state.nextPage===0 ? 'page-item disabled' : 'page-item' }>
                        <a className="page-link" onClick={this.state.nextPage===0 ? null : this.changePageRequest.bind(this,'next')} style={this.state.nextPage===0 ? {} : {'cursor':'pointer'}}>Next</a>
                        </li>
                    </ul>
                </nav>
                Page {this.state.currentPage} out of {this.state.totalPage}
                <br />
                Total Items: {this.state.totalCount}
            </div>
        )
    }
}