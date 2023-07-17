import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import FormInput from '../form/FormInput'
import FormContainer from '../form/FormContainer'
import { containerStyle } from '../../utils/theme'

function ConfirmPassword() {
  return (
    <FormContainer>
        <Container>
            <form className= {containerStyle + ' w-96'}>
                <Title>Confirm Password</Title>
                <FormInput name='password' label="Password" placeholder='*******' type="password"/>
                <FormInput name='confirmPassword' label="Confirm Password" placeholder='*******' type="password"/>
                <Submit value='Confirm Password'/>


                <div className='flex justify-between'>
                    <CustomLink to="/auth/signin">Sign In</CustomLink>
                    <CustomLink to="/auth/signup">Sign Up</CustomLink>
                </div>

            </form>
        </Container>
    </FormContainer>
  )
}

export default ConfirmPassword