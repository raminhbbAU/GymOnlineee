import toast from 'react-hot-toast';

const defPosition = "top-center";

const sucessNotify = (message,position) => {
    toast.success(message,{
        position: position || defPosition
   });
} 

const errorNotify = (message,position) => {
    toast.error(message,{
         position: position || defPosition
    });
} 

const errorNotifyByErrorObject = (error,position) => {

    let message = ''
    console.log('/////////');
    console.log(error);
    //console.log(error.response);

    if (error.response)
    {
      if (error.response.data)
      {
        if (error.response.data.data) {
          message = error.response.data.data;
        }
        else{
          message = error.response.data;
        }
      }
      else
      {
          message = "An unexpected error occurred !"
      }
    }
    else
    {
      message = "Network Error! Please try again a bit later"
    }


    console.log(message);

    toast.error(message,{
         position: position || defPosition
    });
} 

export  {sucessNotify,errorNotify,errorNotifyByErrorObject};