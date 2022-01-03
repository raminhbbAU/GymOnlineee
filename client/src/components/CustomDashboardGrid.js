
// material
import {Card,Table,Stack,Avatar,Button,Checkbox,TableRow,TableBody,TableCell,Container,Typography,TableContainer,TablePagination} from '@mui/material';


const handleRequestSort = (event, property) => {
};

const handleSelectAllClick = (event) => {
};

export default function CustomDashboardGrid({TABLE_HEAD,dataList,order,orderBy}) {

    return (


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
                    {dataList
                        .map((row) => {
                        const { Int_PayType, Prk_StudentPayment,Frk_gym,Frk_Student,Str_Title,Int_Amount,Str_GenerateDate,Str_GenerateTime, Bit_Active,Str_Name,Str_Family } = row;
                        const isItemSelected = selected.indexOf(Str_Title) !== -1;

                        return (
                            <TableRow
                            hover
                            key={Prk_StudentPayment}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                            >
                            <TableCell align="left">
                                {/* {( Int_PayType == 1
                                ?  <Label variant="ghost" color= {'info'}>{'Course'}</Label>
                                :  <Label variant="ghost" color= {'success'}>{'Course'}</Label>
                                )} */}
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
                                <StudentMoreMenu studentID={Prk_StudentPayment} />
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


    )

}
