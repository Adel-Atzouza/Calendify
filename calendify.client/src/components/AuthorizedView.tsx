import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../SessionContext";
import Loading from "./Loading";

function AuthorizeView(props: { children: React.ReactNode }) {
  const { setSession } = useSession();

  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // add a loading state

  useEffect(() => {
    // Get the cookie value
    let retryCount = 0; // initialize the retry count
    let maxRetries = 10; // set the maximum number of retries
    let delay: number = 1000; // set the delay in milliseconds

    // define a delay function that returns a promise
    function wait(delay: number) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }

    // define a fetch function that retries until status 200 or 401
    async function fetchWithRetry(url: string, options: any) {
      try {
        // make the fetch request
        let response = await fetch(url, options);

        // check the status code
        if (response.status == 200) {
          console.log("Authorized");
          let j: any = await response.json();
          setSession({
            user: j,
          });
          setAuthorized(true);
          return response; // return the response
        } else if (response.status == 401) {
          console.log("Unauthorized");
          return response; // return the response
        } else {
          // throw an error to trigger the catch block
          throw new Error("" + response.status);
        }
      } catch (error) {
        // increment the retry count
        retryCount++;
        // check if the retry limit is reached
        if (retryCount > maxRetries) {
          // stop retrying and rethrow the error
          throw error;
        } else {
          // wait for some time and retry
          await wait(delay);
          return fetchWithRetry(url, options);
        }
      }
    }

    // call the fetch function with retry logic
    fetchWithRetry("/pingauth", {
      method: "GET",
    })
      .catch((error) => {
        // handle the final error
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false); // set loading to false when the fetch is done
      });
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    if (authorized && !loading) {
      return <>{props.children}</>;
    } else {
      return (
        <>
          <Navigate to="/sign-in" />
        </>
      );
    }
  }
}

export default AuthorizeView;
