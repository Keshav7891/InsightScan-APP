import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import { containerStyle } from '../../utils/theme'

function ForgetPassword() {
  return (
    <FormContainer>
        <Container>
            <form className={containerStyle + ' w-96'}>
                <Title>Please Enter Your Email</Title>
                <FormInput name='email' label="Email" placeholder='john@gmail.com'/>
                <Submit value='Submit'/>


                <div className='flex justify-between'>
                    <CustomLink to="/auth/signin">Sign In</CustomLink>
                    <CustomLink to="/auth/signup">Sign Up</CustomLink>
                </div>

            </form>
        </Container>
    </FormContainer>
  )
}

export default ForgetPassword