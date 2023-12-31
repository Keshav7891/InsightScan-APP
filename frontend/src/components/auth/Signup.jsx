import React, { useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import { containerStyle } from '../../utils/theme'
import FormContainer from '../form/FormContainer'
import { createUser } from '../../api/auth'
import { useNavigate } from 'react-router-dom'


const validateUserInfo = ({ name, email, password }) => {
  const isValidEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};



function Signup() {

  const [userInfo,setUserInfo] = useState({
    name : "",
    email : "",
    password : ""
  });

  const navigate = useNavigate();

  const handleChange = ({target}) => {
    const {value , name} = target;
    console.log(userInfo.name ,userInfo.email , userInfo.password , name);
    setUserInfo({...userInfo , [name] : value});
  };

  const handleSubmit = async(e) => {
      e.preventDefault();
      const {ok,error} = validateUserInfo(userInfo);
      if(!ok){
        return console.log(error);
      }
      
      const response = await createUser(userInfo);
      if(response.error) return console.log(response.error);


      navigate('/auth/verification' , {
        state : {user : response.user},
        replace : true,
      });
      
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