import { Box, Button, Divider, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SaveSettings } from '../lib/auth';


import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp"

export default function SettingsPage() {
  const [formValues, setFormValues] = useState({'imgurl': '', 'otp': ''});
  const [sharedKey, setSharedKey] = useState(null);
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [otpDisabledSuccess, setOtpDisabledSuccess] = useState("");

  useEffect(() => {
    fetch("v2/settings", 
      {
          method: "GET",
          headers: {
              "Accept-Type": "application/json",
          }
      }
    ).then(response => {
      if (response.ok)
      {
        return response.json()
      }
    })
    .then(
        x => setFormValues( x )
    )
    
  }, []);

  function handleChange(event: any)
  {
    setFormValues({...formValues, imgurl: event.target.value})
  }

  const getSharedKey = async () => {
    try {
      const response = await fetch('/manage/2fa', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({})
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      setSharedKey(result["sharedKey"]);
    } catch (err) {
    }
  };


  const enable2fa = async () => {
    setOtpError("")
    setOtpSuccess("")
    try {
      const response = await fetch('/manage/2fa', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enable: true,
          twoFactorCode: otp
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result)
      setOtpSuccess("2FA enabled")

    } catch (err) {
      setOtpError("The OTP provided is invalid.")
    }
  };


  const disable2fa = async () => {
    try {
      const response = await fetch('/manage/2fa', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enable: false,
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      setOtpDisabledSuccess("2FA disabled")
    }
    catch (err) {
    }
  };

  return (<>
    <Typography variant='h4' sx={{fontWeight: 700, mb:2}}>Settings</Typography>
    <Divider/>

    <Typography variant='h5' sx={{fontWeight: 500, my: 2}}>Account</Typography>


    <Box
        component="form"
        onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            await SaveSettings?.(
                formData,
            );
        }}
    >

        <Box sx={{ display: 'block', alignItems: 'center'}}>
        <Typography variant='subtitle1' sx={{fontWeight: 500}}>Set profile picture (Image url): </Typography>
            <TextField size='small' id="imgurl" name="imgurl" value={formValues.imgurl} onChange={handleChange}  sx={{width: 640}} placeholder='https://image.png'/>
        </Box>

        <Box>
            <Button
                type="submit"
                size="medium"
                variant="contained"
                disableElevation
                color="primary"
                sx={{
                mt: 3,
                mb: 2,
                textTransform: 'capitalize',
                }}
            >
                Save
            </Button>
        </Box>


        <Box sx={{ display: 'block', alignItems: 'center', mt:4}}>
          <Typography variant='h6' sx={{fontWeight: 500}}>Setup 2FA </Typography>
          
          {!formValues.otp ? 
          
             <>
                 <Typography variant='body1' >Insert the SharedKey in your authenticator app </Typography>
              <Button
                    type="button"
                    size="small"
                    variant="contained"
                    disableElevation
                    onClick={getSharedKey}
                    color="primary"
                    sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: 'capitalize',
                    }}
                >
                    Get SharedKey
                </Button>
                  
                {sharedKey ? 
                  <>
                    <Typography variant='body1' sx={{fontWeight: 500, mb:2}}> Sharedkey: {sharedKey} </Typography> 
                    <Typography variant='body1' sx={{fontWeight: 500}}> Input OTP </Typography> 
                    
                    <InputOTP maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                    >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>



                  <Button
                    type="button"
                    size="small"
                    variant="contained"
                    disableElevation
                    onClick={enable2fa}
                    color="primary"
                    sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: 'capitalize',
                    }}
                >
                    Enable 2FA
                </Button>

                {otpError != "" ? <Typography variant='body1' sx={{fontWeight: 500, color:'red', mb:2}}> {otpError} </Typography>  : ""}
                {otpSuccess != "" ? <Typography variant='body1' sx={{fontWeight: 500, color:'green', mb:2}}> {otpSuccess} </Typography>  : ""}

                </>
                
                : ""}
             
             </>
          
          : 
          <>
          
          <Button
              type="button"
              size="small"
              variant="contained"
              disableElevation
              onClick={disable2fa}
              color="primary"
              sx={{
              mt: 3,
              mb: 2,
              textTransform: 'capitalize',
              }}
            >
              Disable 2FA
            </Button>
            {otpDisabledSuccess != "" ? <Typography variant='body1' sx={{fontWeight: 500, color:'green', mb:2}}> {otpDisabledSuccess} </Typography>  : ""}
          </>
          }

        </Box>

    </Box>
  </>)
  
}