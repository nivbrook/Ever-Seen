import React from 'react'
import { StylesProvider } from '@material-ui/core'
import SeenButton from '../buttons/SeenButton'
import { Link } from 'react-router-dom'

export default (props) => {
    const {year, title, id, character, seeList} = props


    const styles = {
        row: {
            display: "flex",
            fledDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        year: {
            fontSize: "30px"
        },
        title: {
            fontWeight: "bold",
            fontSize: "16px"
        },
        character: {
            fontStyle: "italic"
        },
        credit: {
            width: "200px"
        }
    }
    
    return(
        <div style={styles.row}>
            <div style={styles.year}>{year}</div>
            <div style={styles.credit}>
                <div style={styles.title}><Link to={"/movies/"+id}>{title}</Link></div>
                <div style={styles.character}>{character}</div>
            </div>
            <SeenButton movieID={id} movieTitle={title} seeList={seeList}/>
        </div>
    )
}