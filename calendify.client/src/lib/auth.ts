import { Navigate } from "react-router-dom";

export const register = async (formData : any) => {
    // validate email and passwords
    if (formData.get('password') != formData.get('confirm-password')) {
        throw new Error("Passwords do not match.");
    } else {
        console.log(formData.get("first-name"), formData.get("last-name"))
        let url = "/register";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: formData.get('first-name'),
                lastName: formData.get('last-name'),
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        });
        // handle success or error from the server
        if (response.ok) {
            console.log("Account registered.");
            return true; // Return true to indicate success
        } else {
            let res = await response.json();
            if (Array.isArray(res) && res.length > 0) {
                const error = res[0];
                throw new Error(error["description"]); // Access the error message
            }
            else {
                throw new Error("An error occured");
            }
        }
    }
};

// handle submit event for the form
export const loginToBackend = async (formData : any) => {
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
                let error = await response.json()
                if (error["detail"] == "RequiresTwoFactor")
                {
                    return "RequiresTwoFactor"
                } else {
                    throw new Error("Invalid username or password.");

                }

            }
        }
    };

    export const loginWith2fa = async (formData : any) => {
    

            let loginurl = formData['remember'] ? "/login?useCookies=true" : "/login?useSessionCookies=true";

            const response = await fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData['email'],
                    password: formData['password'],
                    twoFactorCode: formData['otp']
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

    // define a fetch function that retries until status 200 or 401
export async function isLoggedIn(url : string, options : any) {
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


export const SaveSettings = async (formData : any) => {
    let url = "/v2/settings";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            imgurl: formData.get('imgurl') ? formData.get('imgurl')  : "",
        }),
    });
    if (response.ok) {
        console.log("Settings saved.");
        window.location.reload(false)

        return true; // Return true to indicate success
    } else {
        throw new Error("Error savins settings");
    }
};


