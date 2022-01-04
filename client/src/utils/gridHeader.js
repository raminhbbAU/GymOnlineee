const DashboardCourse_HEAD = [
    { id: 'courseName', label: 'Course',field: 'Str_CourseName', alignRight: false },
    { id: 'trainerName', label: 'Trainer',field: 'Str_TrainerFullName',alignRight: false },
    { id: 'dayOfWeek', label: 'Day Of Week',field: 'Str_DayOfWeek',alignRight: false },
    { id: 'startTime', label: 'Start Time',field: 'Str_StartTime', alignRight: false },
    { id: 'endTime', label: 'End Time',field: 'Str_EndTime', alignRight: false },
  ];


  const DashboardEnrollStudent_HEAD = [
    { id: 'courseName', label: 'Course',field: 'Str_CourseName', alignRight: false },
    { id: 'studentName', label: 'Student',field: 'Str_StudentFullName',alignRight: false },
    { id: 'register', label: 'Register',field: 'Int_RegisteredSession',alignRight: false },
    { id: 'attendance', label: 'Attendance+Absent',field: 'Int_AttendanceCount', alignRight: false },
    { id: 'reminder', label: 'Reminder',field: 'Int_ReminderSession', alignRight: false },
  ];


  const DashboardDebtorStudent_HEAD = [
    { id: 'studentName', label: 'Student',field: 'Str_StudentFullName',alignRight: false },
    { id: 'mobile', label: 'Mobile',field: 'Str_Mobile',alignRight: false },
    { id: 'totalBill', label: 'Total Bill',field: 'Int_BillAmount',alignRight: false },
    { id: 'totalPayment', label: 'Total Payment',field: 'Int_PayAmount', alignRight: false },
    { id: 'reminder', label: 'Reminder',field: 'Int_Reminder', alignRight: false },
  ];

  
  export {DashboardCourse_HEAD,DashboardEnrollStudent_HEAD,DashboardDebtorStudent_HEAD}