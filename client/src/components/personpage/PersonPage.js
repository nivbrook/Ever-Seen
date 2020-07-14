import React, { useEffect, useState } from "react";
import {View, ImageBackground } from 'react-native';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Filmography from './Filmography';
import Morley from '../moviepage/morley.jpg'

const MoviePage = (props) => {

    const id = props.match.params.id;
    console.log(id)

    


    const [person, setPerson] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [credits, setCredits] = useState(null)
    const [ background, setBackground ] = useState('');

    const backgroundImg = (data) => {
        data.cast.sort((a, b)=>(a.popularity < b.popularity) ? 1: -1)[0].backdrop_path
            ? setBackground("https://image.tmdb.org/t/p/original/"+data.cast.sort((a, b)=>(a.popularity < b.popularity) ? 1: -1)[0].backdrop_path)
            : document.body.style= "background: black"
    }
    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/person/'+id+'?api_key=dbc0a6d62448554c27b6167ef7dabb1b')
            .then(res => {
                setPerson(res.data);
                axios.get('https://api.themoviedb.org/3/person/'+id+'/movie_credits?api_key=dbc0a6d62448554c27b6167ef7dabb1b')
                .then(res => {
                    setCredits(res.data);
                    setLoaded(true);
                    backgroundImg(res.data)
                })
            })

    }, [])

    const useStyles = makeStyles({
        background: {
            backgroundImage: `url(${background})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            minHeight: "100vh",
            // {loaded? backgroundImage: `url("https://image.tmdb.org/t/p/original/${credits.cast.sort((a, b)=>(a.popularity < b.popularity) ? 1: -1)[0].backdrop_path}")`: " "}
        },
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

    // if (loaded == true && person.known_for_department=="Acting"){
    //     credits.cast=credits.cast.sort((a, b)=>(a.popularity < b.popularity) ? 1: -1)
    //     setBackground(credits.cast[0].backdrop_path)
    // }
    const classes = useStyles();

    return(
        <div className={classes.background}>
            {loaded && (
            // <ImageBackground
            //     style={styles.image}
            //     source={{uri: `https://image.tmdb.org/t/p/original/${credits.cast.sort((a, b)=>(a.popularity < b.popularity) ? 1: -1)[0].backdrop_path}`}}
            // >
                <View style={styles.child}>
                    <h3 style={styles.name}>{person.name}</h3>
                    <div style={styles.personInfo}>
                        <div style={styles.container}>
                            <div>
                            { person.profile_path
                                ?   <img 
                                    src={"https://image.tmdb.org/t/p/w500/"+person.profile_path}
                                    height="420px"
                                    width="280px"
                                    />
                                :   <img 
                                    src={Morley}
                                    height="420px"
                                    width="280px"
                                    />
                            }
                            </div>
                            <div style={styles.detailsBox}>
                            {person.biography 
                                ? <Card className={classes.root} style={{background: 'black', opacity: '.7'}}>
                                    <CardContent style={{color: 'white', fontWeight: 'bold'}}>
                                        <Typography variant="h6" component="h2">
                                            <label>Biography</label><br/>
                                            <p style={{fontSize: "12px"}}>{person.biography}</p>
                                        </Typography>
                                    </CardContent>
                                </Card>
                                : ''}
                                <Filmography credits={credits} person={person} />
                            </div>
                        </div>
                    </div>
                </View>
            // </ImageBackground>
            )}
        </div>
    )
}
const styles = {
    image: {
        width: '100%',
        height: '2000px',
    },
    child: {
        width: "100%",
        flex: 1,
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%"
    },
    name: {
        margin: "0px auto",
        marginTop: '10px',
        fontSize: "32",
        color: "white",
        fontFamily: "Arial Black",
        marginBottom: "10px"
    },
    personInfo: {
        width: '100%',
        display: 'flex',
        height: '100%',
        flexDirection: "column",
        paddingTop: '10px',
    },
    detailsBox: {
        color: "white",
        fontFamily: "Arial",
        margin: '0px 0px 0px 60px',
        width: '700px'
    },
    container: {
        display: 'flex',
        margin: '0px auto',
        width: '1100px',
        justifyContent: 'space-between',
    },
};

export default MoviePage