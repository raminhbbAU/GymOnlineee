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
import EnrolmentMoreMenu from './enrolmentMoreMenu';

// utils / API
import { descendingComparator,getComparator,applySortFilter } from "../../utils/grid-filter";
import {getStudentEnrolledCourses,getEnrolledCoursesByCourseID,getEnrolledCoursesByGymID} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";

// -------------------------------Header--------------------------------

const TABLE_HEAD = [
  { id: 'courseName', label: 'Course Name', alignRight: false },
  { id: 'trainerName', label: 'Trainer Name', alignRight: false },
  { id: 'studentName', label: 'Student Name', alignRight: false },
  { id: 'enrolDate', label: 'Enrol Date', alignRight: false },
  { id: 'session', label: 'Session', alignRight: false },
  { id: 'Status', label: 'Present', alignRight: false },

];





export default function Enrolment() {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('courseName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [courseList, setCourseList] = useState([]);
  const [refreshDataset,setRefreshDataset] = useState(false);

  console.log(useParams());

  let {Prk_Gym_AutoID} = JSON.parse(getFromStorage('logininfo'));
  let { studentID,courseID } = useParams();



  useEffect( () => {

    if (studentID && !courseID)
    {
        getStudentEnrolledCourses(
          studentID
        ).then((result) => {
          console.log(result);
          setCourseList(result.data.data)
        }).catch((error) => {
          console.log(error.response);
          errorNotifyByErrorObject(error);
        })
    }
    else if (!studentID && courseID)
    {
        getEnrolledCoursesByCourseID(
          courseID
        ).then((result) => {
          console.log(result);
          setCourseList(result.data.data)
        }).catch((error) => {
          console.log(error.response);
          errorNotifyByErrorObject(error);
        })
    }
    else if (!studentID && !courseID)
    {
        getEnrolledCoursesByGymID(
          Prk_Gym_AutoID
        ).then((result) => {
          console.log(result);
          setCourseList(result.data.data)
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
      const newSelecteds = courseList.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseList.length) : 0;

  const filteredItems = applySortFilter(courseList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredItems.length === 0;



  return (
    <Page title="Enrolment List | GymOnlineee">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
             Enrolment List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/gym/NewEnrolment"
            startIcon={<Icon icon={plusFill} />}          
          >
            New Enrolment
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
                  rowCount={courseList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredItems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { Prk_StudentVCourse,Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Prk_Student_AutoID,Str_Name,Str_family,Str_RegisterDate,Int_RegisteredSession,Present,Absent,AcceptableAbsence } = row;
                      const isItemSelected = selected.indexOf(Str_CourseName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={Prk_StudentVCourse}
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
                          <TableCell align="left">{Str_Name + ' ' + Str_family}</TableCell>
                          <TableCell align="left">{Str_RegisterDate}</TableCell>
                          <TableCell align="left">{Int_RegisteredSession}</TableCell>

                          <TableCell align="left">
                            <Label variant="ghost" color='success'>
                              {Present}
                            </Label>
                            <Label variant="ghost" color= 'error'>
                              {Absent}
                            </Label>
                            <Label variant="ghost" color= 'info'>
                              {AcceptableAbsence}
                            </Label>
                          </TableCell>


                          <TableCell align="right">
                            <EnrolmentMoreMenu enrolmentID={Prk_StudentVCourse} />
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
            count={courseList.length}
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
