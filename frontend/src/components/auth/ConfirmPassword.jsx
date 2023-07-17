import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import FormInput from '../form/FormInput'

function ConfirmPassword() {
  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
        <Container>
            <form className='bg-secondary rounded p-6 w-96 space-y-6'>
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
    </div>
  )
}

export default ConfirmPassword