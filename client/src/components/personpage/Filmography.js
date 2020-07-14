import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SeenButton from '../buttons/SeenButton';
import { Link } from 'react-router-dom'
import Credit from './Credit';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

export default props => {
  const classes = useStyles();
  const { credits, person } = props;
  const [ value, setValue ] = useState();

  const seeList = JSON.parse(localStorage.getItem("seeList"))


  const knownFor = person.known_for_department;

  const getKnown = (knownFor) =>{
    if (knownFor === 'Acting'){
      setValue(0);
    }
    else if (knownFor === 'Directing') {
      setValue(1);
    }
    else if (knownFor === 'Writing'){
      setValue(2);
    }
    else{
      setValue(0)
    }
  }

  useEffect(()=>{
    getKnown(knownFor);
  }, [])
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


    
  var actingCredits = credits.cast;
  const crewCredits = credits.crew;

  actingCredits.sort((a, b)=>(a.release_date < b.release_date) ? 1: -1)

//   actingCredits = actingCredits.filter(movie=>!movie.character.includes("Himself")).filter(movie=>!movie.character.includes("Herself"))
  
  var directingCredits = crewCredits.filter(movie=>movie.department==="Directing").sort((a, b)=>(a.release_date < b.release_date) ? 1: -1)
  var writingCredits = crewCredits.filter(movie=>movie.department==="Writing").sort((a, b)=>(a.release_date < b.release_date) ? 1: -1)

  actingCredits = actingCredits.filter(movie=>movie.release_date !== "")
  actingCredits = actingCredits.filter(movie => movie.release_date)
  actingCredits = actingCredits.filter(movie=> Date.parse(movie.release_date)<Date.now())

  directingCredits = directingCredits.filter(movie=>movie.release_date !== "")
  directingCredits = directingCredits.filter(movie => movie.release_date)
  directingCredits = directingCredits.filter(movie=> Date.parse(movie.release_date)<Date.now())

  writingCredits = writingCredits.filter(movie=>movie.release_date !== "")
  writingCredits = writingCredits.filter(movie => movie.release_date)
  writingCredits = writingCredits.filter(movie=> Date.parse(movie.release_date)<Date.now())
    

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  if (actingCredits.length === 0) actingCredits = []
  if (directingCredits.length === 0) directingCredits = []
  if (writingCredits.length === 0) writingCredits = []

  return (
    <Card className={classes.root} style={{ color: 'white', background: 'black', opacity: '.9', marginTop: "20px"}}>
        <div className={classes.root}>
            <AppBar position="static" style={{background: 'white'}}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="nav tabs example">
                    {actingCredits === [] ? '' : <LinkTab style={{color: 'black'}} label="Acting" {...a11yProps(0)}/> }
                    {directingCredits === [] ? '' : <LinkTab style={{color: 'black'}}  label="Directing" {...a11yProps(1)} />}
                    {writingCredits === []  ? '' : <LinkTab style={{color: 'black'}}  label="Writing" {...a11yProps(2)} />}
                </Tabs>
            </AppBar>
            <CardContent>
                {actingCredits.length !== 0
                  ? <TabPanel value={value} index={0}>
                        <Typography>
                                {actingCredits.map((movie, idx)=>{
                                    return(
                                      <>
                                        <div style={styles.row}>
                                            <div style={styles.year}>{movie.release_date.slice(0,4)}</div>
                                            <div style={styles.credit}>
                                                <div style={styles.title}><Link to={"/movies/"+movie.id}>{movie.title}</Link></div>
                                                <div style={styles.character}>{movie.character}</div>
                                            </div>
                                            <SeenButton movieID={movie.id} movieTitle={movie.title}/>
                                        </div>
                                      </>
                                    )
                                })}
                        </Typography>
                    </TabPanel>
                  : <TabPanel value={value} index={0}>
                      <Typography>
                        <p style={{color: 'white'}}>This person does not have any acting credits.</p>
                      </Typography>
                    </TabPanel>
                }    
                {directingCredits.length !== 0
                  ? <TabPanel value={value} index={1}>
                      <Typography>
                              {directingCredits.map((movie, idx)=>{
                                  return(
                                    <>
                                    <div style={styles.row}>
                                        <div style={styles.year}>{movie.release_date.slice(0,4)}</div>
                                        <div style={styles.credit}>
                                            <div style={styles.title}><Link to={"/movies/"+movie.id}>{movie.title}</Link></div>
                                            <div style={styles.character}>{movie.job}</div>
                                        </div>
                                        <SeenButton movieID={movie.id} movieTitle={movie.title}/>
                                    </div>
                                  </>                                  )
                              })}
                      </Typography>
                    </TabPanel>
                  : <TabPanel value={value} index={1}>
                      <Typography>
                        <p style={{color: 'white'}}>This person does not have any directing credits.</p>
                      </Typography>
                    </TabPanel>
                }
                {writingCredits.length !== 0
                  ? <TabPanel value={value} index={2}>
                      <Typography>
                              {writingCredits.map((movie, idx)=>{
                                  return(
                                    <>
                                    <div style={styles.row}>
                                        <div style={styles.year}>{movie.release_date.slice(0,4)}</div>
                                        <div style={styles.credit}>
                                            <div style={styles.title}><Link to={"/movies/"+movie.id}>{movie.title}</Link></div>
                                            <div style={styles.character}>{movie.job}</div>
                                        </div>
                                        <SeenButton movieID={movie.id} movieTitle={movie.title}/>
                                    </div>
                                  </>
                                  )
                              })}
                      </Typography>
                  </TabPanel>
                  : <TabPanel value={value} index={2}>
                      <Typography>
                        <p style={{color: 'white'}}>This person does not have any writing credits.</p>
                      </Typography>
                    </TabPanel>
                }
            </CardContent>
        </div>
    </Card>
  );
}

