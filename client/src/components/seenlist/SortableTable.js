import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import SeenButton from '../buttons/SeenButton';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

   
export default (props) =>{

    const classes = useStyles();
    
    
    const seeList = JSON.parse(localStorage.getItem("seeList")).sort((a, b)=>(a.title > b.title) ? 1: -1)
    console.log(seeList)

    return (
        <TableContainer component={Paper} style={styles.tableContainer}>
            <Table stickyHeader className={classes.table} size="small" aria-label="a dense table">
                <TableHead style={styles.tableHead}>
                    <TableRow>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Year</TableCell>
                        <TableCell align="center">Runtime</TableCell>
                        <TableCell align="center">Director</TableCell>
                        <TableCell align="center">Seen It?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {seeList.map(movie=>(
                        <TableRow key={movie.id}>
                            <TableCell component="th" scope="row"><Link to={"/movies/"+movie.id}>{movie.title}</Link></TableCell>
                            <TableCell align="center">{movie.release_date.slice(0,4)}</TableCell>
                            <TableCell align="center">{movie.runtime} min</TableCell>
                            <TableCell align="center">{movie.crew.filter(crew=>crew.job=="Director").map(crew=>crew.name).join(", ")}</TableCell>
                            <TableCell align="center" width="350px"><SeenButton movieID={movie.id} movieTitle={movie.title} seeList={seeList}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const styles = {
    tableContainer:{
        margin: '0px auto',
        width: '1200px',
    },
};