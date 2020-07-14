import React from 'react'
import {connect} from "react-redux"
import SeenButton from '../buttons/SeenButton'
import SortableTable from './SortableTable'
import SortableTable2 from './SortableTable2'
import Morley from '../moviepage/morley.jpg';


function SeenList(){
    const seeList = JSON.parse(localStorage.getItem("seeList"))
    
    return(
        <div style={{marginTop: '-22px',textAlign: 'center', fontFamily: 'Arial', height: '705px'}}>
            <h1>Seen List</h1>
                <SortableTable/>
            {/* <table class="sortable">
                <thead>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Runtime</th>
                    <th></th>
                </thead>
                <tbody>
            {seeList && seeList.sort((a, b)=>(a.title > b.title) ? 1: -1).map(movie=>{
                return(
                    <tr>
                        <td>{movie.title}</td>
                        <td>{movie.release_date.slice(0,4)}</td>
                        <td>{movie.runtime} min</td>
                        <td><SeenButton movieID={movie.id} movieTitle={movie.title} seeList={seeList}/></td>
                    </tr>
                )
            })}
            </tbody>
            </table> */}
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(
    mapStateToProps,
)(SeenList);