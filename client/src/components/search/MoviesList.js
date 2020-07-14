import React from 'react'
import { Link } from 'react-router-dom'
import SeenButton from '../buttons/SeenButton'

const MoviesList = (props) => {
  const seeList = JSON.parse(localStorage.getItem("seeList"))

  const listStyle = {
    height: "20em",
    lineHeight: "2em",
    border: "1px solid #ccc",
    padding: "0",
    margin: "0",
    overflow: "scroll",
    overflowX: "hidden"
  }

  const options = props.list.map(movie => (
    <li 
    key={movie.id}>
      <Link to={"/movies/"+movie.id}>{movie.title} {movie.release_date && "("+movie.release_date.slice(0,4)+")"}</Link><SeenButton movieID={movie.id} movieTitle={movie.title} seeList={seeList}/>
    </li>
  ))
  return <ul style={listStyle}>{options}</ul>
}

export default MoviesList
