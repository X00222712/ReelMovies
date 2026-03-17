// Third part
import { ZodError } from "zod";
import { auth } from "$lib/server/auth";
import { json } from "@sveltejs/kit";

// Ours
import { usersService } from "$lib/server/services/users-service";
import { runTest, TestCase } from "$lib/server/utils/tests";
import { validateUser } from "$lib/server/db/validation";
import { ValidationError } from "$lib/server/utils/errors";


export async function GET( { cookies } ) {
    // Load test data
    let userSigninCookie = cookies.get("better-auth.session_token")
    // console.log(userSigninCookie)

    let testData = [

        new TestCase({name : "Glen", email : "use@test.ie", password : "Password123"}, ["name : Glen, email : use@test.ie", "User already exists. Use another email."]),
        new TestCase({name : "Glen", email : "use@test.ie", password : "Password123"}, "User already exists. Use another email."),
        new TestCase({name : "hi", email : "test@test.ie", password : "Password123"}, "Username must be at least 4 characters"),
        new TestCase({name : "12345678901234567890123", email : "test@test.ie", password : "Password123"}, "User already exists. Use another email."),
        new TestCase({name : "Glen", email : "test", password : "Password123"}, "Must be a valid email"),
        new TestCase({name : "Glen", email : "test@test", password : "Password123"}, "Must be a valid email"),
        new TestCase({name : null, email : "test@test.ie", password : "Password123"}, "Invalid input: expected string, received null"),
        new TestCase({name : "", email : "test@test.ie", password : "Password123"}, "Username cannot be null Username must be at least 4 characters"),
        new TestCase({name : "Glen", email : null, password : "Password123"}, "Invalid input: expected string, received null"),
        new TestCase({name : "Glen", email : "", password : "Password123"}, "Email Cannot be null Must be a valid email"),
        new TestCase({name : "Glen", email : "test@test.ie", password : null}, "Invalid input: expected string, received null"),
        new TestCase({name : "Glen", email : "test@test.ie", password : ""}, "Password Cannot be null Password must be at least 6 characters"),

    ]
    let testResult = await runTest(testData, async (data) => {
            let name = data.name
            let email = data.email
            let password = data.password

            try
            { validateUser.parse( { name, email, password } ); }
            catch (error)
            {
                let errorOut = error.message
                if(error instanceof ZodError)
                    {
                        let errors = JSON.parse(error.message)
                        errorOut = ""
                        errors.forEach(errorEvent => {
                            errorOut += errorEvent.message + " "
                        });

                    }
                let errorMessage = errorOut.trim()
                throw new ValidationError(errorMessage)
            }


            let result = await auth.api.signUpEmail({
                body : {
                    name,
                    email,
                    password
                }
            })
            // console.log(result)

            // Restore to original usertoken
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
            return `name : ${result.user.name}, email : ${result.user.email}`;
    });
    return json({ name : "accountSignup", data : testResult }, {status : 200});

}