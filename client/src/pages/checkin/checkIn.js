import { Icon } from '@iconify/react';
import { useState,useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink,useParams } from 'react-router-dom';
import { replace } from "lodash";

// material
import {Card,Table,Stack,Avatar,Button,Checkbox,TableRow,TableBody,TableCell,Container,Typography,TableContainer,TablePagination} from '@mui/material';

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/_dashboard/user';
import CheckInMoreMenu from './checkInMoreMenu';

// utils / API
import { descendingComparator,getComparator,applySortFilter } from "../../utils/grid-filter";
import API_Student from "../../api/student";

import {getFromStorage} from "../../storage/localstorage.js";


// -------------------------------Header--------------------------------

const TABLE_HEAD = [
  { id: 'courseName', label: 'Course Name', alignRight: false },
  { id: 'trainerName', label: 'Trainer Name', alignRight: false },
  { id: 'studentName', label: 'Student Name', alignRight: false },
  { id: 'Date', label: 'Date', alignRight: false },
  { id: 'Status', label: 'Present', alignRight: false },
];




export default function Enrolment() {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('courseName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [checkInList, setCheckInList] = useState([]);
  const [refreshDataset,setRefreshDataset] = useState(false);

  console.log(useParams());

  let {Prk_Gym_AutoID} = JSON.parse(getFromStorage('logininfo'));
  let { studentID,courseID } = useParams();



  useEffect( () => {

    if (studentID && !courseID)
    {
        API_Student.getStudentAttendanceListbyStudentID(
          studentID
        ).then((result) => {
          console.log(result);
          setCheckInList(result.data.data)
        }).catch((error) => {
          console.log(error.response);
        })
    }
    else if (!studentID && courseID)
    {
        API_Student.getStudentAttendanceListbyCourseID(
          courseID
        ).then((result) => {
          console.log(result);
          setCheckInList(result.data.data)
        }).catch((error) => {
          console.log(error.response);
        })
    }
    else if (!studentID && !courseID)
    {
        API_Student.getStudentAttendanceListbyGymID(
          Prk_Gym_AutoID
        ).then((result) => {
          console.log(result);
          setCheckInList(result.data.data)
        }).catch((error) => {
          console.log(error.response);
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
      const newSelecteds = checkInList.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - checkInList.length) : 0;

  const filteredItems = applySortFilter(checkInList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredItems.length === 0;



  return (
    <Page title="Check-in Activity List | GymOnlineee">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Check-in Activity List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/gym/NewCheckIn"
            startIcon={<Icon icon={plusFill} />}          
          >
            New Check-In
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
                  rowCount={checkInList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredItems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { Prk_StudentCheckInCheckOut,Str_Date,Int_Status,Str_AbsentReason,Str_TrainerNote,Prk_Course,Str_CourseName,Prk_Trainer,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_Family } = row;
                      const isItemSelected = selected.indexOf(Str_CourseName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={Prk_StudentCheckInCheckOut}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, Str_CourseName)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                              {Str_CourseName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{Str_TrainerName + ' ' + Str_TrainerFamily}</TableCell>
                          <TableCell align="left">{Str_Name + ' ' + Str_Family}</TableCell>
                          <TableCell align="left">{Str_Date}</TableCell>
                          <TableCell align="left">
                            {(() => {
                              switch (Int_Status) {
                                case 1:
                                  return <Label variant="ghost" color='success'>Present</Label>
                                case 2:
                                  return <Label variant="ghost" color='error'>Absent</Label>
                                case 3:
                                  return <Label variant="ghost" color='info'>AcceptableAbsence</Label>
                                default:
                                  return null
                              }
                            })()}
                          </TableCell>

                          <TableCell align="right">
                            <CheckInMoreMenu StudentCheckInCheckOut={Prk_StudentCheckInCheckOut} />
                          </TableCell>
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
            count={checkInList.length}
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
