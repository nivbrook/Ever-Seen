import React from 'react'
import { Link } from 'react-router-dom'
import SeenButton from '../buttons/SeenButton'

const PeopleList = (props) => {
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

  const options = props.list.map(person => (
    <li 
    key={person.id}>
      <Link to={"/people/"+person.id}>{person.name}</Link>
    </li>
  ))
  return <ul style={listStyle}>{options}</ul>
}

export default PeopleList
