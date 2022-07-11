import React, { useState } from 'react'

import PhoneScreen from './Email/PhoneScreen';
import OtpScreen from './OTP/OtpScreen';


const Steps = {
    1: PhoneScreen,
    2: OtpScreen,
}

const Authenticate = () => {
    const [step, setstep] = useState(1);
    const Step = Steps[step];

    function onNext (){
        setstep(step + 1)
    }
    
    return (
        <div>
            <Step onNext={onNext} />
        </div>
    );
}

export default Authenticate;