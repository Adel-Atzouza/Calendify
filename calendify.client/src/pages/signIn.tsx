'use client';
import { SignInPage } from '@toolpad/core/SignInPage';
import type { Session } from '@toolpad/core/AppProvider';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';
import axios from 'axios';


// const fakeAsyncGetSession = async (formData: any): Promise<Session> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (formData.get('password') === 'password') {
//         resolve({
//           user: {
//             name: 'Bharat Kashyap',
//             email: formData.get('email') || '',
//             image: 'https://avatars.githubusercontent.com/u/19550456',
//           },
//         });
//       }
//       reject(new Error('Incorrect credentials.'));
//     }, 1000);
//   });
// };



const loginToBackend = async (formData: FormData): Promise<Session> => {
    const email = formData.get('email');
    const password = formData.get('password');
  
    try {
      const response = await axios.post(`https://localhost:5165/login?useCookies=true`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies in the request
      });
  
      // Assuming the response contains user information
      const data = response.data;
  
      return {
        user: {
        //   name: data.name, // Adjust according to your API response
        //   email: data.email,
          image: data.image || 'https://avatars.githubusercontent.com/u/19550456', // Default image if not provided
        },
      };
    } catch (error) {
      // Handle error appropriately
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Incorrect credentials or server error.');
      }
      throw new Error('An error occurred while logging in.');
    }
  };


// export default function SignIn() {
//   const { setSession } = useSession();
//   const navigate = useNavigate();
//   return (
//     <SignInPage
//       providers={[{ id: 'credentials', name: 'Credentials' }]}
//       signIn={async (provider, formData, callbackUrl) => {
//         // Demo session
//         try {
//           const session = await fakeAsyncGetSession(formData);
//           if (session) {
//             setSession(session);
//             navigate(callbackUrl || '/', { replace: true });
//             return {};
//           }
//         } catch (error) {
//           return {
//             error: error instanceof Error ? error.message : 'An error occurred',
//           };
//         }
//         return {};
//       }}
//     />
//   );
// }

export default function SignIn() {
    const { setSession } = useSession();
    const navigate = useNavigate();
    
    return (
      <SignInPage
        providers={[{ id: 'credentials', name: 'Credentials' }]}
        signIn={async (provider, formData, callbackUrl) => {
          try {
            const session = await loginToBackend(formData);
            if (session) {
              setSession(session);
              navigate(callbackUrl || '/', { replace: true });
              return {};
            }
          } catch (error) {
            return {
              error: error instanceof Error ? error.message : 'An error occurred',
            };
          }
          return {};
        }}
      />
    );
  }
