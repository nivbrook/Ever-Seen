import React, { useState, useEffect } from 'react';
import {connect} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from 'material-ui-rating'
import axios from 'axios';
import { updateSeeList } from "../../actions/updateSeeList";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function SeenButton(props) {
    var {movieID, movieTitle} = props;

    var seeList = JSON.parse(localStorage.getItem("seeList"))
    
  const classes = useStyles();

  const [selected, setSelected] = useState(false)
  const [rating, setRating] = useState(0)

  let seenMovie = [];

    if(seeList.length>0){
      seenMovie = seeList.filter(movie=>movie.id===movieID)
    }

    useEffect(() => {
        if(seenMovie.length>0){
            setSelected(true)
            setRating(seenMovie[0].rating)
        }
    }, [])

    const [movie, setMovie] = useState(null)


  const handleClick = (e)=>{
      e.preventDefault()
      if (!selected){
        setSelected(true)
        Promise.all([axios.get('http://api.themoviedb.org/3/movie/'+movieID+'?api_key=dbc0a6d62448554c27b6167ef7dabb1b'), axios.get('http://api.themoviedb.org/3/movie/'+movieID+'/credits?api_key=dbc0a6d62448554c27b6167ef7dabb1b')])
        .then((responses)=>{
            const [returnedMovie, returnedCredits] = responses;
            console.log(returnedMovie.data)
            console.log(returnedCredits.data)
            seeList = JSON.parse(localStorage.getItem("seeList"))
            seeList.push({...returnedMovie.data, ...returnedCredits.data, rating: 0})
            localStorage.setItem("seeList", JSON.stringify(seeList))
            updateSeeList()
            
        })
          // setSelected(true)
          // seeList.push({
          //     id: movieID,
          //     title: movieTitle,
          //     rating: 0
          // })
          // localStorage.setItem("seeList", JSON.stringify(seeList))
      }
      else{
          setRating(0)
          setSelected(false)
          seeList = JSON.parse(localStorage.getItem("seeList"))
          var index = seeList.map(x => {
            return x.id;
          }).indexOf(movieID);
          console.log(index)
          seeList.splice(index, 1);
          localStorage.setItem("seeList", JSON.stringify(seeList))
          updateSeeList()
          
      }
  }

  const handleRating = (value)=>{
    setRating(value)
    seeList = JSON.parse(localStorage.getItem("seeList"))
    seeList.find(movie=>movie.id===movieID).rating = value;
    localStorage.setItem("seeList", JSON.stringify(seeList))
    updateSeeList()
  }

  const styles = {
    falseStyle: {
        backgroundColor: "grey",
        height: "40px",
        width: "90px"
    },
    trueStyle: {
        backgroundColor: "orange",
        height: "40px",
        width: "90px"
    },
    divStyle: {
        display: "flex",
        justifyContent: "center"
    }
  }

  return (
    <div className={classes.root} style={styles.divStyle}>
      <Button
      variant="contained"
      onClick={e=>handleClick(e)}
      style={selected? styles.trueStyle: styles.falseStyle}>
        SEEN IT
      </Button>
      <Rating
            disabled={!selected}
            value={rating}
            max={5}
            onChange={(value) => handleRating(value)}
        />
    </div>
  );
}

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(
    mapStateToProps,
)(SeenButton);