import { Icon } from '@iconify/react';
import { useState,useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';

// material
import {Card,Table,Stack,Avatar,Button,Checkbox,TableRow,TableBody,TableCell,Container,Typography,TableContainer,TablePagination, Alert} from '@mui/material';

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/_dashboard/user';
import CourseMoreMenu from './courseMoreMenu'

// utils / API
import { descendingComparator,getComparator,applySortFilter } from "../../utils/grid-filter";
import {getCourseByGymID,getCourseByStudentID,getCourseByTrainerID,activeDeactiveCourse} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";

// -------------------------------Header--------------------------------

const TABLE_HEAD = [
  { id: 'courseName', label: 'Course Name', alignRight: false },
  { id: 'trainerName', label: 'Trainer Name', alignRight: false },
  { id: 'startDate', label: 'Start Date', alignRight: false },
  { id: 'endDate', label: 'End Date', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];





export default function Trainer() {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('courseName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [courseList, setCourseList] = useState([]);
  const [refreshDataset,setRefreshDataset] = useState(false);

  let {loginType,loginId} = JSON.parse(getFromStorage('logininfo'));

  useEffect( () => {

    loadCourseList();

  },[refreshDataset])

  const loadCourseList = () => {

    switch (loginType) {

      case 'student':
        getCourseByStudentID(
          loginId
        ).then((result) => {
          console.log(result);
          setCourseList(result.data.data)
        }).catch((error) => {
          console.log(error.response);
          errorNotifyByErrorObject(error);
        })
        break;
      case 'trainer':
        getCourseByTrainerID(
          loginId
        ).then((result) => {
          console.log(result);
          setCourseList(result.data.data)
        }).catch((error) => {
          console.log(error.response);
          errorNotifyByErrorObject(error);
        })
        break;
      default:
        getCourseByGymID(
          loginId
        ).then((result) => {
          console.log(result);
          setCourseList(result.data.data)
        }).catch((error) => {
          console.log(error.response);
          errorNotifyByErrorObject(error);
        })
        break;
    }



  }

  const handleActivateMenuClick = (courseID) => {
    
    activeDeactiveCourse(
      courseID
    ).then((result) => {
      sucessNotify('The course status has been changed successfully!')
      loadCourseList();
    }).catch((error) => {
      console.log(error.response);
      errorNotifyByErrorObject(error);
    })

  }

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

  const filteredItems = applySortFilter(courseList, getComparator(order, orderBy), filterName,"Str_CourseName");

  const isUserNotFound = filteredItems.length === 0;

  return (
    <Page title="Courses | GymOnlineee">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Course List
          </Typography>

          {loginType === "gym" && (
            <Button
              variant="contained"
              component={RouterLink}
              to="/gym/newcourse"
              startIcon={<Icon icon={plusFill} />}          
            >
              New Course
            </Button>
          )}

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
                      const { Prk_Course,Str_CourseName,Str_TrainerName,Str_TrainerFamily,Str_StartDate,Str_EndDate,Int_CourseType,Bit_Active } = row;
                      const isItemSelected = selected.indexOf(Str_CourseName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={Prk_Course}
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
                          <TableCell align="left">{Str_StartDate}</TableCell>
                          <TableCell align="left">{Str_EndDate}</TableCell>

                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color= {(Int_CourseType==1) ? 'success' : 'error'}
                            >
                              {(Int_CourseType==1) ? 'Gym' : 'Online'}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color= {Bit_Active ? 'success' : 'error'}
                            >
                              {Bit_Active ? 'Active' : 'Disable'}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            {loginType === "gym" && (
                              <CourseMoreMenu courseID= {Prk_Course} courseName={Str_CourseName} onActivateMenuClick={(courseID) => handleActivateMenuClick(courseID)} />
                            )}             
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
