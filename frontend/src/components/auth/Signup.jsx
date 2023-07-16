import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'

function Signup() {
  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
        <Container>
            <form className='bg-secondary rounded p-6 w-72 space-y-6'>
                <Title>Sign Up</Title>
                <FormInput name='name' label="Name" placeholder='John Doe'/>
                <FormInput name='email' label="Email" placeholder='john@gmail.com'/>
                <FormInput name='password' label="Password" placeholder='********'/>
                <Submit value='Sign Up'/>


                <div className='flex justify-between'>
                    <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
                    <CustomLink to="/auth/signup">Sign Up</CustomLink>
                </div>

            </form>
        </Container>
    </div>
  )
}

export default Signup