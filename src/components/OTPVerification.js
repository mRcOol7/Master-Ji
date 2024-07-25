import React, { useState } from 'react';
import './OTPVerification.css';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    // Check if all OTP fields are filled
    if (otpCode.length < 4) {
      setErrorMessage('Please enter all 4 digits.');
      setVerificationStatus('');
      setIsSubmitted(false);
      return;
    }

    // Clear error message if all OTP digits are entered
    setErrorMessage('');
    
    // Check OTP code validity
    if (otpCode === '1234') {
      setVerificationStatus('success');
    } else {
      setVerificationStatus('failure');
    }
    setIsSubmitted(true);
  };

  const handleResendCode = () => {
    // Handle resend OTP code logic here
  };

  return (
    <div className="otp-verification">
      <div className="otp-container">
        <h1>Mobile Phone Verification</h1>
        <p>Enter the 4-digit verification code that was sent to your phone number.</p>
        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                maxLength="1"
                className="otp-input"
              />
            ))}
          </div>
          <button type="submit" className={`verify-button ${verificationStatus}`}>
            {isSubmitted ? (verificationStatus === 'success' ? 'Verified' : 'Verification Failed') : 'Verify Account'}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="resend-code">
          <p>Didn’t receive code? <button onClick={handleResendCode}>Resend</button></p>
        </div>
        {isSubmitted && verificationStatus === 'success' && <p className="success-message">Verification code submitted successfully!</p>}
      </div>
    </div>
  );
};

export default OTPVerification;
