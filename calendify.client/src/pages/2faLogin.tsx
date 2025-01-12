import { useState } from 'react';
import { Button, useTheme } from '@mui/material';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "../components/ui/input-otp"
import { alpha, Box, Container, Stack, Typography } from '@mui/material';

import { isLoggedIn, loginWith2fa } from '../lib/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';

export default function OtpLogin() {
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
      const theme = useTheme();

      const location = useLocation();
      const { state } = location;

      const navigate = useNavigate();

      const { setSession } = useSession();


  return (<>

        <Stack sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>

            <Container component="main" maxWidth="xs">
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        p: 4,
                        border: '1px solid',
                        borderColor: alpha(theme.palette.grey[400], 0.4),
                        boxShadow: theme.shadows[4],
                    }}
                    >

                    <form
                      onSubmit={async (event) => {
                        event.preventDefault();
                        try{
                            await loginWith2fa({
                                ...state,
                                otp: otp
                            });

                            // Now check if the user is logged in
                            let response = await isLoggedIn("/pingauth", {
                                method: "GET",
                            });
        
                            if (response) {
                                let session = {
                                    user: response
                                };
                                setSession(session);
                            }
        
                            navigate('/', { replace: true });
                            return {};
                        } catch {
                            setError("Invalid 2FA code")
                        }
                        
                      }}
                    >

                        <Typography variant='h4' sx={{fontWeight: 500, mb:6}}>Enter 2FA code</Typography>

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
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      disableElevation
                      color="primary"
                      sx={{
                        mt: 3,
                        mb: 2,
                        textTransform: 'capitalize',
                      }}
                    >
                      Sign in
                    </Button>

                    {error != "" ? <Typography variant='body1' sx={{fontWeight: 500, color:'red', mb:2}}> {error} </Typography>  : ""}


                      </form>

                    </Box>

                    
            </Container>
        </Stack>

  </>)
}