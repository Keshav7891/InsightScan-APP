import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'

function Signin() {
  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
        <Container>
            <form className='bg-secondary rounded p-6 w-72 space-y-6'>
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
    </div>
  )
}

export default Signin