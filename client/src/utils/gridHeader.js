
const DashboardCourse_HEAD = (t) => {
  return (
    [
      { id: 'courseName', label: t('Course'),field: 'Str_CourseName', alignRight: false },
      { id: 'trainerName', label: t('Trainer'),field: 'Str_TrainerFullName',alignRight: false },
      { id: 'dayOfWeek', label: t('Day Of Week'),field: 'Str_DayOfWeek',alignRight: false },
      { id: 'startTime', label: t('Start Time'),field: 'Str_StartTime', alignRight: false },
      { id: 'endTime', label: t('End Time'),field: 'Str_EndTime', alignRight: false },
    ]
  )
}

const DashboardEnrollStudent_HEAD = (t) => {
  return (
    [
      { id: 'courseName', label: t('Course'),field: 'Str_CourseName', alignRight: false },
      { id: 'studentName', label: t('Student'),field: 'Str_StudentFullName',alignRight: false },
      { id: 'register', label: t('Register'),field: 'Int_RegisteredSession',alignRight: false },
      { id: 'attendance', label: t('Attendance+Absent'),field: 'Int_AttendanceCount', alignRight: false },
      { id: 'reminder', label: t('Reminder'),field: 'Int_ReminderSession', alignRight: false },
    ]
  )
}


const DashboardDebtorStudent_HEAD = (t) => {
  return (
    [
      { id: 'studentName', label: t('Student'),field: 'Str_StudentFullName',alignRight: false },
      { id: 'mobile', label: t('Mobile'),field: 'Str_Mobile',alignRight: false },
      { id: 'totalBill', label: t('Total Bill'),field: 'Int_BillAmount',alignRight: false },
      { id: 'totalPayment', label: t('Total Payment'),field: 'Int_PayAmount', alignRight: false },
      { id: 'reminder', label: t('Reminder'),field: 'Int_Reminder', alignRight: false },
    ]
  )
}
  
  export {DashboardCourse_HEAD,DashboardEnrollStudent_HEAD,DashboardDebtorStudent_HEAD}