import { Icon } from '@iconify/react';
import { useState,useEffect } from 'react';
import arrowrightfill from '@iconify/icons-eva/arrow-right-fill';
import arrowleftfill from '@iconify/icons-eva/arrow-left-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink,useParams } from 'react-router-dom';

// material
import {Card,Table,Stack,Avatar,Button,Checkbox,TableRow,TableBody,TableCell,Container,Typography,TableContainer,TablePagination} from '@mui/material';

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/_dashboard/user';
// import StudentMoreMenu from './studentMoreMenu'

// utils / API
import { descendingComparator,getComparator,applySortFilter } from "../../utils/grid-filter";
import {getBillListByGymID,getBillListByStudentID} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";

// -------------------------------Header--------------------------------

const TABLE_HEAD = [
  { id: 'source', label: 'Source', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'studentName', label: 'Name', alignRight: false },
  { id: 'datetime', label: 'Date/Time', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
];





export default function StudentBill() {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataList, setdataList] = useState([]);
  const [refreshDataset,setRefreshDataset] = useState(false);

  let {loginType,loginId} = JSON.parse(getFromStorage('logininfo'));
  let { studentID } = useParams();

  useEffect( () => {

    if (!studentID){

      getBillListByGymID(
          loginId
          ).then((result) => {
            console.log(result);
            setdataList(result.data.data)
          }).catch((error) => {
            console.log(error.response);
            errorNotifyByErrorObject(error);
          })

    }
    else
    {

      getBillListByStudentID(
            studentID
          ).then((result) => {
            console.log(result);
            setdataList(result.data.data)
          }).catch((error) => {
            console.log(error.response);
            errorNotifyByErrorObject(error);
          })

    }

  },[refreshDataset])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0;

  const filteredItems = applySortFilter(dataList, getComparator(order, orderBy), filterName,"Str_Name");

  const isUserNotFound = filteredItems.length === 0;

  return (
    <Page title="Bills | GymOnlineee">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student Bills
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/gym/NewBill"
            startIcon={<Icon icon={plusFill} />} 
            disabled         
          >
            New Bill
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataList.length}
                  numSelected={selected.length}
                  selectioncolumn={false}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredItems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { Int_BillType, Prk_StudentBill,Str_Title,Int_Amount,Str_GenerateDate,Str_GenerateTime,Frk_Student,Bit_Active,Str_Name,Str_Family } = row;
                      const isItemSelected = selected.indexOf(Str_Title) !== -1;

                      return (
                        <TableRow
                          hover
                          key={Prk_StudentBill}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell align="left">
                            {( Int_BillType == 1
                               ?  <Label variant="ghost" color= {'info'}>{'Course'}</Label>
                               :  <Label variant="ghost" color= {'success'}>{'Course'}</Label>
                            )}

                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {Str_Title}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="subtitle2" noWrap>
                              {Str_Name + ' ' + Str_Family}
                            </Typography>                              
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="subtitle2" noWrap>
                                {Str_GenerateDate + ' ' + Str_GenerateTime}
                            </Typography>                              
                          </TableCell>
                          <TableCell align="left">{Int_Amount}</TableCell>
                          <TableCell align="left">
                            {(Bit_Active==false &&
                                  <Label variant="ghost" color= {Bit_Active ? 'success' : 'error'}>
                                      {Bit_Active ? '' : 'Deleted'}
                                  </Label>
                              )}
                          </TableCell>

                          {/* <TableCell align="right">
                            <StudentMoreMenu studentID={Prk_StudentBill} />
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
