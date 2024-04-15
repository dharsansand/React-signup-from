import React ,{useState} from 'react';
import './App.css';
import Popup from './components/Popup';


import { useFormik} from 'formik';

const validate = values =>{
  const errors = {};
  if(!values.firstname){
    errors.firstname="Required";

  }else if (values.firstname.length > 8){
    errors.firstname = "must be 8 characters or less";

  }

  if(!values.lastname){
    errors.lastname="Required";

  }else if (values.lastname.length < 1){ // Changed the condition
    errors.lastname = "must be at least 1 character";

  }

  if(!values.emailid){
    errors.emailid="Required";

  }else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.emailid)){ // Corrected email validation regex
    errors.emailid = "invalid email address"
  }
  if(!values.password){
    errors.password="Required";

  }else if (values.password.length > 8){
    errors.password = "must be 8 characters or less";
  }
  if(!values.comformpassword){ // Corrected field name
    errors.comformpassword="Required";

  }else if (values.password !== values.comformpassword ){
    errors.comformpassword = "Passwords do not match";
  }
  return errors;
}
const App =()=>{
 const [ bool, setBool]= useState(0);
 const formik= useFormik({
  initialValues :{
    firstname : '',
    lastname:'',
    emailid: '',
    password : '',
    comformpassword : '', // Corrected field name


  },
  validate,
  onSubmit : values =>{
    if(bool){
      setBool(0);
    }else{
      setBool(1);
      console.log(values);
    }
  }


 });
 console.log(formik.values);
  return(
   <div className='main'>
    <div className='signup'> {/* Corrected class name */}
      <h1>Signup Form</h1> 
      <form onSubmit={formik.handleSubmit}>
        <input type ="text" placeholder='First name...' name = "firstname" autoComplete='off' onChange={formik.handleChange } value = {
        formik.values.firstname} onBlur={formik.handleBlur}/>
        {
          formik.touched.firstname && formik.errors.firstname ? <span> {
            formik.errors.firstname}</span> : null
        }
  

        <input type ="text" placeholder='Last name...' name = "lastname" autoCapitalize='off' onChange={formik.handleChange} value = {
        formik.values.lastname}  onBlur={formik.handleBlur}/>

{
          formik.touched.lastname && formik.errors.lastname ? <span> {
            formik.errors.lastname}</span> : null
        }
  
 

  
        <input type ="text" placeholder='Email-id' name = "emailid" autoCapitalize='off' onChange={formik.handleChange}value = {
        formik.values.emailid}  onBlur={formik.handleBlur}/>

{
          formik.touched.emailid && formik.errors.emailid ? <span> {
            formik.errors.emailid}</span> : null
        }
  



        <input type ="password" placeholder='Password' name = "password" autoCapitalize='off' onChange={formik.handleChange}value = {
        formik.values.password} onBlur={formik.handleBlur}/>
         {
          formik.touched.password && formik.errors.password ? <span> {
            formik.errors.password}</span> : null
        }
  


  
        <input type ="password" placeholder='Confirmpassword ' name = "comformpassword" autoCapitalize='off'  onChange={formik.handleChange} value = {
        formik.values.comformpassword} onBlur={formik.handleBlur}/>
          {
          formik.touched.comformpassword && formik.errors.comformpassword ? <span> {
            formik.errors.comformpassword}</span> : null
        }

    
 
        <input type ="Submit"value='Submit ' />

     
      </form>



    </div>
    <div className='message-box'>
      {
        bool ? (<Popup onclick = {formik.handleSubmit}/>): null
      }

    </div>



   </div>

  );
}
export default App;