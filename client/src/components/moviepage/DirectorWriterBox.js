import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'



const DirectorWriterBox = (props) => {
    const { credits } = props;

    const directors = credits.crew.filter(person=>person.job==="Director")
    const writers = credits.crew.filter(person=>person.department==="Writing")

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

    for (var i=0; i<writers.length-1; i++){
        for (var j=i+1; j<writers.length; j++){
            if (writers[i].name===writers[j].name){
                writers[i].job=writers[i].job+"/"+writers[j].job
                writers.splice(j,1)
            }
        }
    }

    return (
        <Card className={classes.root} style={{background: 'black', opacity: '.7', marginTop: "20px"}}>
            <CardContent style={{color: 'white', fontWeight: 'bold'}}>
                <Typography variant="h6" component="h2">
                    <p>Directed by: {directors.map(director=>{
                        return(
                        <Link to={'/people/' + director.id}>{director.name}{" "}</Link>)
                    })}</p>
                    <p>Written by: {writers.map(writer=>{
                        var writerStr = writer.name
                        if (writer.job!=="Writer"){
                            writerStr=writerStr+"("+writer.job+")"
                        }
                        writerStr+=" "
                        return <Link to={'/people/' + writer.id}>{writerStr}</Link>
                    }
                    )}</p>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default DirectorWriterBox;