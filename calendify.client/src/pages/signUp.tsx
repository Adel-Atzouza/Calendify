import { SignOutPage } from "../components/SignUpPage";
import { useNavigate } from "react-router-dom";
import { useSession } from '../SessionContext';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { register, isLoggedIn, loginToBackend } from "../lib/auth";

function SignIn() {
    const navigate = useNavigate();
    const { setSession } = useSession();



    function signInLink()
    {
        return (
            
            <Typography variant="body2" mx={2} mt={1}>
                Do you already have an account? <Link style={{fontWeight: 700}} href="sign-in">Sign in</Link>
            </Typography>
        );
    }

    return (
        <SignOutPage
            providers={[{id: "google", name: "Google"},{ id: "credentials", name: "Credentials" }]}
            slots={{
                signUpLink: signInLink
            }}
            signIn={async (provider, formData, callbackUrl) => {
                try {
                    // Wait for the login to complete
                    let success = await register(formData);

                    if (success)
                    {
                        await loginToBackend(formData);

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
                    }
 
 

                    navigate(callbackUrl || '/sign-up', { replace: true });
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