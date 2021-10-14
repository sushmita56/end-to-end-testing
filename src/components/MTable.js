import faker, { company, phone } from 'faker'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { makeStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { borderRadius, minWidth } from '@mui/system';
import { green } from '@mui/material/colors';


    let USERS = [], STATUS =  ["Active", "Pending","Blocked"];

    const useStyle = makeStyles((theme) => ({
        table:{
            minWidth:650
        },
        tableContainer:{
            borderRadius:15,
            margin:'10px 10px',
            maxWidth:950
        },
        tableHeaderCell:{
            fontSize:20,
            fontWeight:'bold',
            backgroundColor:'#ff4400'
            
        },
        cellPadding:{
            backgroundColor:"red",
            height:30
        }

    }));

    for(let i= 0; i<5  ; i++)
    {
        USERS[i] ={
            name:faker.name.findName(),
            email:faker.internet.email(),
            phone:faker.phone.phoneNumber(),
            jpbTitle:faker.name.jobTitle(),
            company:faker.company.companyName(),
            joinDate:faker.date.past().toLocaleDateString('en-US'),
            status:STATUS[Math.floor(Math.random() * STATUS.length)]
        }
        console.log(USERS);
    }
    function Mtable(){

        const classes = useStyle();
        return(
            <div>
                 <TableContainer component={Paper} className = {classes.tableContainer}>
                <Table>
                    <TableHead >
                    <TableRow>
                        <TableCell width="50%" style = {{color:"white", fontWeight:"bold"}} className = {classes.tableHeaderCell}>User Info</TableCell>
                        <TableCell style = {{color:"white", fontWeight:"bold"}} className = {classes.tableHeaderCell}>Job Info</TableCell>
                        <TableCell style = {{color:"white", fontWeight:"bold"}} className = {classes.tableHeaderCell}>Joining Date</TableCell>
                        <TableCell style = {{color:"white", fontWeight:"bold"}} className = {classes.tableHeaderCell}>Status</TableCell>
                    
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {USERS.map((row) => (
                        <TableRow key={row.name} >
                        <TableCell style = {{padding:"30px"}}>
                            {row.name}
                            {row.email}
                            {row.phone}
                        </TableCell >
                        <TableCell style = {{padding:"30px"}}>
                            {row.jobTitle}
                            {row.company}
                            </TableCell>
                        <TableCell style = {{padding:"30px"}}>{row.joinDate}</TableCell>
                        <TableCell style = {{padding:"30px"}}>{row.status}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        )
    }

    export default Mtable;