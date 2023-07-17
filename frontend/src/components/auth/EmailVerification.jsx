import React, { useEffect, useRef, useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Submit from '../form/Submit'

const OTP_LENGTH = 6;
let currentOtpIndex;



function EmailVerification() {
    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
    const [activeOtpIndex, setActiveOtpIndex] = useState(0);

    const inputRef = useRef();

    const focusNextInputField = (index) => {
        setActiveOtpIndex(index + 1);
    };

    const focusPrevInputField = (index) => {
        let nextIndex;
        const diff = index - 1;
        nextIndex = diff !== 0 ? diff : 0;
        setActiveOtpIndex(nextIndex);
    };

    const handleOtpChange = ({ target }) => {
        const { value } = target;
        const newOtp = [...otp];
        newOtp[currentOtpIndex] = value.substring(value.length - 1, value.length);

        if (!value) focusPrevInputField(currentOtpIndex);
        else focusNextInputField(currentOtpIndex);
        setOtp([...newOtp]);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOtpIndex]);


    function handleKeyDown({key} , index){
        currentOtpIndex = index;
        if(key==="Backspace"){
            focusPrevInputField(currentOtpIndex);
        }
    }

  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
        <Container>
            <form className='bg-secondary rounded p-6 w-96 space-y-6'>
                <div>
                    <Title>Please Enter OTP To Verify Account</Title>
                    <p className='text-center text-dark-subtle'>OTP has been sent to your email</p>
                </div>


                <div className='flex justify-center items-center space-x-4'>
                    {otp.map( ( _ , index) => {
                        return (
                            <input key={index} ref={activeOtpIndex === index ? inputRef : null} type='number' value={otp[[index]] || ''} onChange={handleOtpChange} 
                            onKeyDown={(e) => handleKeyDown(e, index)} className='w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none'></input>
                        )
                    })}
                </div>
                
                <Submit value='Submit'/>

            </form>
        </Container>
    </div>
  )
}

export default EmailVerification