import React, { useEffect, useRef, useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Submit from '../form/Submit'
import FormContainer from '../form/FormContainer';
import { containerStyle } from '../../utils/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyUserEmail } from '../../api/auth';


const OTP_LENGTH = 6;
let currentOtpIndex;

const isValidOTP = (otp) => {
    let valid = false;
    for(let val of otp){
        valid = !isNaN(parseInt(val));
        if(!valid) break;
    }
    if(valid === true){
        return {ok : true}
    }
    else{
        return {ok : false , error : "Invalid OTP"};
    }
}



function EmailVerification() {
    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
    const [activeOtpIndex, setActiveOtpIndex] = useState(0);

    const inputRef = useRef();


    const {state} = useLocation();
    const user = state?.user;
    const navigate = useNavigate();


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

    useEffect( () => {
        if(!user){
            navigate('/not-found')
        }
    },[user])

    const handleSubmit = async(event) => {
        event.preventDefault();
        const {ok,error} = isValidOTP(otp);
        if(!ok){
            return console.log(error);
        }

        const response = await verifyUserEmail({OTP:otp.join('') , userId : user.id});
        if(response.error){
            return console.log(response.error);
        }


        console.log(response.message);
    }


  return (
    <FormContainer>
        <Container>
            <form onSubmit={handleSubmit} className={containerStyle + ' w-96'}>
                <div>
                    <Title>Please Enter OTP To Verify Account</Title>
                    <p className='text-center dark:text-dark-subtle text-light-subtle'>OTP has been sent to your email</p>
                </div>


                <div className='flex justify-center items-center space-x-4'>
                    {otp.map( ( _ , index) => {
                        return (
                            <input key={index} ref={activeOtpIndex === index ? inputRef : null} type='number' value={otp[[index]] || ''} onChange={handleOtpChange} 
                            onKeyDown={(e) => handleKeyDown(e, index)} className='w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white  focus:border-primary rounded bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none'></input>
                        )
                    })}
                </div>
                
                <Submit value='Submit'/>

            </form>
        </Container>
    </FormContainer>
  )
}

export default EmailVerification