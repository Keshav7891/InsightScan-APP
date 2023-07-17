import React, { useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import { containerStyle } from '../../utils/theme'
import FormContainer from '../form/FormContainer'


const validateUserInfo = ({name,email,password}) => {

  const isValidName = /^[a-z A-Z]+$/;
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(name.trim()===''){
    return {ok:false , error : 'Name is Missing'};
  }
  if(isValidName.test(name) === false){
    return {ok:false , error : 'Name is Invalid'};
  }

  if(email.trim() === ""){
    return {ok:false , error : 'Email is Missing'};
  }
  if(isValidEmail.test(email)){
    return {ok:false , error : 'Email is Invalid'};
  }

  if(password.trim() === ""){
    return {ok:false , error : 'Password is Missing'};
  }
  if(password.length < 8){
    return {ok:false , error : 'Password Must Be Minimum 8 Characters'};
  }
}


function Signup() {

  const [userInfo,setUserInfo] = useState({
    name : "",
    email : "",
    password : ""
  });

  const handleChange = ({target}) => {
    const {value , name} = target;
    console.log(userInfo.name ,userInfo.email , userInfo.password , name);
    setUserInfo({...userInfo , [name] : value});
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const {ok,error} = validateUserInfo(userInfo);
      if(!ok){
        return console.log(error);
      }
      console.log(userInfo);
    };

  const {name,email,password} = userInfo;

  return (
    <FormContainer>
        <Container>
            <form onSubmit={handleSubmit} className={containerStyle + ' w-72'}>
                <Title>Sign Up</Title>
                <FormInput value={name} onChange={handleChange} name='name' label="Name" placeholder='John Doe'/>
                <FormInput value={email} onChange={handleChange} name='email' label="Email" placeholder='john@gmail.com'/>
                <FormInput value={password} onChange={handleChange} name='password' label="Password" placeholder='********' type='password' />
                <Submit value='Sign Up'/>


                <div className='flex justify-between'>
                    <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
                    <CustomLink to="/auth/signup">Sign Up</CustomLink>
                </div>

            </form>
        </Container>
    </FormContainer>
  )
}

export default Signup