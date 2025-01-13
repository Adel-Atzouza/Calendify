import { SignInPage } from "../components/SignInPage";
import { useNavigate } from "react-router-dom";
import { useSession } from '../SessionContext';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { loginToBackend, isLoggedIn } from "../lib/auth";

function SignIn() {
    const navigate = useNavigate();
    const { setSession } = useSession();



    function forgotPasswordLink()
    {
        return (
            <Typography variant="body2" mx={2} mt={1}>

            <Link href="forgot-password" style={{fontWeight: 700}}>
                    Forgot password?
            </Link>
                </Typography>
        );
    }

    function signUpLink()
    {
        return (
            
            <Typography variant="body2" mx={2} mt={1}>
                Don't have an account? <Link style={{fontWeight: 700}} href="sign-up">Sign up</Link>

            </Typography>
        );
    }

    return (
        <SignInPage
            providers={[{id: "google", name: "Google"},{ id: "credentials", name: "Credentials" }]}
            slots={{
                forgotPasswordLink: forgotPasswordLink,
                signUpLink: signUpLink
            }}
            signIn={async (provider, formData, callbackUrl) => {
                try {
                    // Wait for the login to complete
                    let res = await loginToBackend(formData);

                    if (res == "RequiresTwoFactor")
                    {
                        navigate('/2fa', {
                            state: {
                                email: formData.get("email"),
                                password: formData.get("password"),
                                remember: formData.get('remember')
                            }
                        })
                        return {};
                    }

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

                    navigate(callbackUrl || '/', { replace: true });
                    return {};
                } catch (error) {
                    return {
                        error: error instanceof Error ? error.message : 'An error occurred',
                    };
                }
            }}
        />
    );
}

export default SignIn;