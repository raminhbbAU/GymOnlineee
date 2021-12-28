import { useState,useEffect } from "react";
import { useFormik} from 'formik';
import {courseRegisterSchema} from '../../utils/yup.validation';
import { useNavigate,useParams } from 'react-router-dom';

// material
import {TextField,Button,Stack,Container,Typography,MenuItem} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// utils / API
import {getStudentInfoByGymID,getStudentInfoByStudentID,registerNewPayment} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";

export default function PaymentForm () {

    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [studentList, setStudentlist] = useState([]);
    const [payTypeList, setPayTypeList] = useState([]);

    const navigate = useNavigate();
    let {Prk_Gym_AutoID} = JSON.parse(getFromStorage('logininfo'));
    let { studentID } = useParams();


    useEffect( () => {   
        loadPayType();    
        loadStudentList();        
      },[])

    const loadStudentList = () => {

        if (!studentID)
        {
            getStudentInfoByGymID(
                Prk_Gym_AutoID
              ).then((result) => {
                
                console.log(result.data.data);
                setStudentlist(result.data.data)
                setIsLoading(true);           
        
              }).catch((error) => {
                console.log(error.response);
                errorNotifyByErrorObject(error);
            })
        }
        else
        {   
            getStudentInfoByStudentID(
                Prk_Gym_AutoID,
                studentID
              ).then((result) => {               
                console.log(result.data.data);
                setStudentlist(result.data.data)
                setIsLoading(true);                   
              }).catch((error) => {
                console.log(error.response);
                errorNotifyByErrorObject(error);
            })
        }
    
  
    }

    const loadPayType = () => {

        let data = [{id:1,name:'Cash'},{id:2,name:'Card-Transfer'},{id:3,name:'Online'}]
        setPayTypeList(data);

    }

    const formik = useFormik({
        initialValues: {
            Student:'' ,
            PayType:1,
            Amount:0,
            TraceNumber:'',
            Date:'',
        }, 
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDateChange = (filedName,newValue) => {
      formik.setFieldValue(filedName, newValue.toISOString().split('T')[0]);
    };

    const handleSubmit = (values) => {


        registerNewPayment(
            values.Student,
            values.Amount,
            values.PayType,
            0, //OnlinePaymentDetail
            values.TraceNumber,
            values.Date
          ).then((result) => {
            console.log(result);
            navigate("/gym/payment");
          }).catch((error) => {
            console.log(error.response);
            errorNotifyByErrorObject(error);
          })

    }


    return (
        <Page title="New Payment | GymOnlineee">

        {isLoading && (
                       <Container>
            
                       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                         <Typography variant="h4" gutterBottom>
                            Add New Payment
                         </Typography>
                       </Stack>
           
                       <Scrollbar>
                           <div>
                               <form onSubmit={formik.handleSubmit}>
           
                                  <TextField
                                    fullWidth
                                    id="Student"
                                    name="Student"
                                    select
                                    label="Student"
                                    value={formik.values.Student}
                                    onChange={formik.handleChange}
                                    error={formik.touched.Student && Boolean(formik.errors.Student)}
                                    helperText={formik.touched.Student && formik.errors.Student}
                                    margin="normal"
                                  >
                                    {studentList.map((Student) => (
                                      <MenuItem key={Student.Prk_Student_AutoID} value={Student.Prk_Student_AutoID}>
                                        {Student.Str_Name + ' ' + Student.Str_Family}
                                      </MenuItem>
                                    ))}
                                  </TextField>

                                  <TextField
                                    fullWidth
                                    id="PayType"
                                    name="PayType"
                                    select
                                    label="PayType"
                                    value={formik.values.PayType}
                                    onChange={formik.handleChange}
                                    error={formik.touched.PayType && Boolean(formik.errors.PayType)}
                                    helperText={formik.touched.PayType && formik.errors.PayType}
                                    margin="normal"
                                  >
                                    {payTypeList.map((payType) => (
                                      <MenuItem key={payType.id} value={payType.id}>
                                        {payType.name}
                                      </MenuItem>
                                    ))}
                                  </TextField>


                                   <TextField
                                       fullWidth
                                       id="Amount"
                                       name="Amount"
                                       label="Amount"
                                       value={formik.values.Amount}
                                       onChange={formik.handleChange}
                                       error={formik.touched.Amount && Boolean(formik.errors.Amount)}
                                       helperText={formik.touched.Amount && formik.errors.Amount}
                                       margin="normal"
                                   />
           
                                   <TextField
                                       fullWidth
                                       id="TraceNumber"
                                       name="TraceNumber"
                                       label="Trace Number"
                                       value={formik.values.TraceNumber}
                                       onChange={formik.handleChange}
                                       error={formik.touched.TraceNumber && Boolean(formik.errors.TraceNumber)}
                                       helperText={formik.touched.TraceNumber && formik.errors.TraceNumber}
                                       margin="normal"
                                   />
           
                                    <LocalizationProvider dateAdapter={AdapterDateFns} margin="normal">
                                          <DesktopDatePicker
                                                    fullWidth
                                                    id="Date"
                                                    name="Date"
                                                    label="Start Date"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={formik.values.Date}
                                                    onChange={(value) => handleDateChange('Date',value)}
                                                    error={formik.touched.Date && Boolean(formik.errors.Date)}
                                                    helperText={formik.touched.Date && formik.errors.Date}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    margin="normal"
                                          />                                    
                                    </LocalizationProvider>
           
                                   <Button color="primary" variant="contained" fullWidth type="submit" margin="normal">
                                       Submit
                                   </Button>

                               </form>
                           </div>
                         </Scrollbar>
                     </Container>   
        )}

        </Page>
      );



}