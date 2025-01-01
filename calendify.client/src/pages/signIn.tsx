// 'use client';
// import { SignInPage } from '@toolpad/core/SignInPage';
// import type { Session } from '@toolpad/core/AppProvider';
// import { useNavigate } from 'react-router-dom';
// import { useSession } from '../SessionContext';
// import axios from 'axios';





// const loginToBackend = async (formData: FormData): Promise<Session> => {
//     const email = formData.get('email');
//     const password = formData.get('password');
  
//     try {
//       const response = await axios.post(`https://localhost:5165/login?useCookies=true`, {
//         email,
//         password,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true, // Include cookies in the request
//       });
  
//       // Assuming the response contains user information
//       const data = response.data;
  
//       return {
//         user: {
//         //   name: data.name, // Adjust according to your API response
//         //   email: data.email,
//           image: data.image || 'https://avatars.githubusercontent.com/u/19550456', // Default image if not provided
//         },
//       };
//     } catch (error) {
//       // Handle error appropriately
//       if (axios.isAxiosError(error) && error.response) {
//         throw new Error(error.response.data.message || 'Incorrect credentials or server error.');
//       }
//       throw new Error('An error occurred while logging in.');
//     }
//   };


// // export default function SignIn() {
// //   const { setSession } = useSession();
// //   const navigate = useNavigate();
// //   return (
// //     <SignInPage
// //       providers={[{ id: 'credentials', name: 'Credentials' }]}
// //       signIn={async (provider, formData, callbackUrl) => {
// //         // Demo session
// //         try {
// //           const session = await fakeAsyncGetSession(formData);
// //           if (session) {
// //             setSession(session);
// //             navigate(callbackUrl || '/', { replace: true });
// //             return {};
// //           }
// //         } catch (error) {
// //           return {
// //             error: error instanceof Error ? error.message : 'An error occurred',
// //           };
// //         }
// //         return {};
// //       }}
// //     />
// //   );
// // }





import { SignInPage } from "@toolpad/core";
import { useNavigate } from "react-router-dom";
import { useSession } from '../SessionContext';

function SignIn() {

    // state variable for error messages
    const navigate = useNavigate();
    const { setSession } = useSession();

    // handle submit event for the form
    const loginToBackend = async (formData : any) => {
        // validate email and passwords
        if (!formData.get('email') || !formData.get('password')) {
          throw new Error("Please fill in all fields.");
        } else {
            var loginurl = "";
            console.log(formData)
            if (formData.get('rememberme') == true)
                loginurl = "/login?useCookies=true";
            else
                loginurl = "/login?useSessionCookies=true";

            fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            })

                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok) {
                        console.log("Successful Login.");
                        // window.location.href = '/';
                    }
                    else
                        throw new Error("Error Logging In.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    throw new Error("Error Logging in.");
                });
        }
    };

    // define a fetch function that retries until status 200 or 401
    async function isLoggedIn(url: string, options: any) {
        try {
            // make the fetch request
            let response = await fetch(url, options);

            // check the status code
            if (response.status == 200) {
                console.log("Authorized");
                return response; // return the response
            } else if (response.status == 401) {
                console.log("Unauthorized");
                return null; // return the response
            } else {
                // throw an error to trigger the catch block
                throw new Error("" + response.status);
            }
        } catch (error) {
          throw error;
        }
    }

       


    return (
      <SignInPage
        // providers={[{ id: 'github', name: 'GitHub' },
        //             { id: 'google', name: 'Google' },]}
        providers={[{ id: "credentials", name: "Credentials" }]}
        signIn={async (provider, formData, callbackUrl) => {
          try {
            await loginToBackend(formData);
            let response = await isLoggedIn("/pingauth", {
                method: "GET",
            })
            if (response)
            {
              let session = {
                user: {
                  
                  image: 'https://avatars.githubusercontent.com/u/19550456'
                }
              }
              setSession(session);
            }
            navigate(callbackUrl || '/', { replace: true });
            return {};
          } catch (error) {
            return {
              error: error instanceof Error ? error.message : 'An error occurred',
            };
          }
          return {};
        }}
        
        // slotProps={{
        //   signUpLink: <SignUpLink/>
        // }}
      />
    );
}

export default SignIn;


