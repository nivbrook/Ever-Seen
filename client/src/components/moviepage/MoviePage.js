import React, { useEffect, useState } from "react";
import {View, ImageBackground, StyleSheet} from 'react-native';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import DirectorWriterBox from "./DirectorWriterBox"
import CastCall from "./CastCall"
import SeenButton from "../buttons/SeenButton";

const MoviePage = (props) => {

    const id = props.match.params.id;
    console.log(id)
    console.log(props)

    const [movie, setMovie] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [credits, setCredits] = useState(null)

    const seeList = JSON.parse(localStorage.getItem("seeList"))

    useEffect(()=>{
        axios.get('http://api.themoviedb.org/3/movie/'+id+'?api_key=dbc0a6d62448554c27b6167ef7dabb1b')
            .then(res => {
                setMovie(res.data);
                axios.get('http://api.themoviedb.org/3/movie/'+id+'/credits?api_key=dbc0a6d62448554c27b6167ef7dabb1b')
                .then(res => {
                    setCredits(res.data);
                    setLoaded(true);
                })
            })
    }, [])

    const useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
    });
    const classes = useStyles();

    function formatDate(inputDate) {
        var date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            // Months use 0 index.
            return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }
    }
    
    return(
        <div style={{backgroundColor: "black"}}>
        {loaded && (
            <ImageBackground
                style={styles.image}
                source={{uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}}
            >
                <View style={styles.child}>
                    <div style={styles.movieInfo}>
                        <h3 style={styles.mainTitle}>{movie.title}({movie.release_date.slice(0,4)})</h3>
                        <div style={styles.container}>
                            <div>
                                <img 
                                src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path}
                                height="435px"
                                width="290px"
                                />
                                <SeenButton movieID={movie.id} movieTitle={movie.title} seeList={seeList}/>
                            </div>
                            <div style={styles.detailsBox}>
                                <Card className={classes.root} style={{background: 'black', opacity: '.7'}}>
                                    <CardContent style={{color: 'white', fontWeight: 'bold'}}>
                                        <Typography variant="h6" component="h2">
                                            <p>{formatDate(movie.release_date)} • {movie.genres.map(genre=>genre.name).join(", ")} • {movie.runtime} minutes 
                                            • {movie.production_countries.map(prods=>"(" + prods.iso_3166_1+") ")}</p>
                                            <p>Overview:</p>
                                            <p>&nbsp;&nbsp;{movie.overview}</p>
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <DirectorWriterBox credits={credits}/>
                            </div>
                        </div>
                        <div style={styles.cast}>
                            <CastCall credits={credits}/>
                        </div>
                    </div>
                </View>
            </ImageBackground>
        )}
        </div>
    )

}

const styles = {
    image: {
        width: '100%',
        height: '100vh',
    },
    child: {
        width: "100%",
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
    },
    mainTitle: {
        margin: "0px auto",
        fontSize: "32",
        color: "white",
        fontFamily: "Arial Black",
        marginBottom: "10px"
    },
    movieInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: "column",
        paddingTop: '10px', //tell niv
    },
    detailsBox: {
        color: "white",
        fontFamily: "Arial",
        // background: 'green',
        margin: '0px 0px 0px 60px'
    },
    container: {
        display: 'flex',
        margin: '0px auto',
        width: '1100px',
        justifyContent: 'space-between',
        marginBottom: "20px"
    },
    cast: {
        display: 'flex',
        margin: 'auto',
        height: '320px',
        width: '1100px',
        background: 'black',
        padding: '15px',
        overflow: 'scroll',
    }
  };
  
  

export default MoviePage;