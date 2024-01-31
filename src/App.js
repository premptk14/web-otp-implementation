import React, { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [otp, setOtp] = useState();

  useEffect(()=>{
    const ac = new AbortController();
    if ('OTPCredential' in window) {
        const input = document.querySelector('input[autocomplete="one-time-code"]');
        if (!input) return;
        const form = input.closest('form');
        if (form) {
          form.addEventListener('submit', e => {
            ac.abort();
          });
        }
        navigator.credentials.get({
          otp: { transport:['sms'] },
          signal: ac.signal
        }).then(otp => {
          input.value = otp.code;
          setOtp(otp.code);
          // if (form) form.submit();
        }).catch(err => {
          console.log(err);
        });
    }
    
    return ()=>{ac.abort();};
  },[])

    return (
      <div className="App">
        
        <h2>Your OTP is: {otp}</h2>
        <form>
          <input autocomplete="one-time-code" required/>
          <input type="submit"/>
        </form>

      </div>
    );
  }

export default App;