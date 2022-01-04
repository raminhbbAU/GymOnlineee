
// material
import {Table,Stack,Avatar,Button,Checkbox,TableRow,TableBody,TableCell,Container,Typography,TableContainer,TablePagination} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import alerttrianglefill from '@iconify/icons-eva/alert-triangle-fill';
import { Icon } from '@iconify/react';
import { alpha, styled } from '@mui/material/styles';

//Component
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
import Scrollbar from '../components/Scrollbar';


const handleRequestSort = (event, property) => {
};

const handleSelectAllClick = (event) => {
};



const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
      theme.palette.primary.dark,
      0.24
    )} 100%)`
  }));
  

export default function CustomDashboardGrid({TABLE_HEAD,dataList,order,orderBy,idFieldName,isLoading,isError,onClick}) {


    if (isError)
    {
          return (
              <>
              <IconWrapperStyle>
                  <Icon icon={alerttrianglefill} width={24} height={24} />
              </IconWrapperStyle>
              <Typography variant="h6"> {"unable to fetch"}</Typography>
              </>
          )
    }
  
    if (isLoading)
    {
        return (
            <>
              <CircularProgress />
            </>
        )
    }

    return (

        <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
                <Table>

                    <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={dataList.length}
                    selectioncolumn={false}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    />
                    
                    <TableBody>
                    {dataList
                        .map((row) => {

                        return (
                            <TableRow
                            hover
                            key={row[idFieldName]}
                            tabIndex={-1}
                            selected={false}
                            >
                                {TABLE_HEAD
                                    .map( (column) => {
                                        return(
                                            <TableCell align="left"> {row[column.field]}</TableCell>
                                        )
                                    })
                                }

                            </TableRow>
                        );
                        })}

                    </TableBody>

                </Table>
            </TableContainer>
        </Scrollbar>


    )

}
