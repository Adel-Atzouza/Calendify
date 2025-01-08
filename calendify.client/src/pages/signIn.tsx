import { SignInPage } from "../components/SignInPage";
import { useNavigate } from "react-router-dom";
import { useSession } from '../SessionContext';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function SignIn() {
    const navigate = useNavigate();
    const { setSession } = useSession();

    // handle submit event for the form
    const loginToBackend = async (formData : any) => {
        // validate email and passwords
        if (!formData.get('email') || !formData.get('password')) {
            throw new Error("Please fill in all fields.");
        } else {
            let loginurl = formData.get('remember') ? "/login?useCookies=true" : "/login?useSessionCookies=true";

            const response = await fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            });

            // handle success or error from the server
            if (response.ok) {
                console.log("Successful Login.");
                return true; // Return true to indicate success
            } else {
                throw new Error("Invalid username or password.");
            }
        }
    };

    // define a fetch function that retries until status 200 or 401
    async function isLoggedIn(url : string, options : any) {
        try {
            let response = await fetch(url, options);

            if (response.status === 200) {
                console.log("Authorized");
                return response.json(); // return the response
            } else if (response.status === 401) {
                console.log("Unauthorized");
                return null; // return null for unauthorized
            } else {
                throw new Error("" + response.status);
            }
        } catch (error) {
            throw error;
        }
    }

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
            providers={[{id: "github", name: "Github"},{ id: "credentials", name: "Credentials" }]}
            slots={{
                forgotPasswordLink: forgotPasswordLink,
                signUpLink: signUpLink
            }}
            signIn={async (provider, formData, callbackUrl) => {
                try {
                    // Wait for the login to complete
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