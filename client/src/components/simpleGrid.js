import React, { useContext } from 'react';
import Link from "@mui/material/Link";
import { makeStyles } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';
import { Button } from '@mui/material';


function preventDefault(event) {
  event.preventDefault();
}

const randomData = [
    {id:1, name:'ramin',fammily:'habibi'},
    {id:2, name:'shahin',fammily:'habibi'},
    {id:3, name:'niloofar',fammily:'bakhtiari'},
]

export default function simpleGrid({title,datatable,supportCRUD,onCreate,onUpdate,onDelete}) {
  
  console.log(title);
  console.log(datatable);


  const data = datatable || randomData;
  
  return (
    <React.Fragment>
      
      <div>
        <Title>{title}</Title>
        <Button
        // className={classes.btn}
        // onClick={handleClickOpen}
        variant="contained"
        color="primary"
        type="submit"
        >
        Add New Customer
        </Button>


      </div>
      <Table size="small">
        
      <TableHead> 
          <TableRow>
            {Object.keys(data[0]).map(cloumn => (
                <TableCell>{cloumn}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
                {Object.keys(row).map(cloumn => (
                  <TableCell>{row[cloumn]}</TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      
        </Table>

      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more
        </Link>
      </div>

    </React.Fragment>
  );
}
