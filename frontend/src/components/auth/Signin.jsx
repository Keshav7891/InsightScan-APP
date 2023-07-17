import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import { containerStyle } from '../../utils/theme'
import FormContainer from '../form/FormContainer'

function Signin() {  
  return (
    <FormContainer>
        <Container>
            <form className = {containerStyle + ' w-72'}>
                <Title>Sign In</Title>
                <FormInput name='email' label="Email" placeholder='john@gmail.com'/>
                <FormInput name='password' label="Password" placeholder='********'/>
                <Submit value='Sign In'/>


                <div className='flex justify-between'>
                    <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
                    <CustomLink to="/auth/signup">Sign Up</CustomLink>
                </div>

            </form>
        </Container>
    </FormContainer>
  )
}

export default Signin