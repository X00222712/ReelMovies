// Must make tests when I get the change
import { runTest, TestCase, TestResults } from "$lib/server/utils/tests";
import { json } from "@sveltejs/kit";
import { APIError } from "better-auth/api";
import { validateUserLogin } from "$lib/server/db/validation";
import { ZodError } from "zod";
import { auth } from "$lib/server/auth";

export async function GET( { request, cookies } )
{
    const tests = [
        new TestCase( {email: "glen@test.ie", password: "password123"}, "Signed In" ),
        new TestCase( {email: "GLEN@test.com", password: "password123"}, "Signed In" ),
        new TestCase( {email: "glen@test.com", password: "password123"}, "Signed In" ),
        new TestCase( {email: "glen@test", password: "password123"}, "Must be a valid email" ),
        new TestCase( {email: "GLEN@test.ie", password: "password123"}, "Signed In" ),
        new TestCase( {email: "glen@TEST.ie", password: "password123"}, "Signed In" ),
        new TestCase( {email: "glen@test.ie", password: "PASSWORD123"}, "Invalid email or password" ),
        new TestCase( {email: "glen@test.ie", password: "Password123"}, "Invalid email or password" ),
        new TestCase( {email: "", password: "password123"}, "Email Cannot be null" ),
        new TestCase( {email: null, password: "password123"}, "Invalid input: expected string, received null" ),
        new TestCase( {email: "glen@test.ie", password: ""}, "Password Cannot be null" ),
        new TestCase( {email: "glen@test.ie", password: null}, "Invalid input: expected string, received null" )
    ]
    const results = await runTest(tests, async ( data ) => {

        // Store cookie
        let userSigninCookie = cookies.get("better-auth.session_token")
        // Set cookie to nothing to prevent log out
        cookies.set("better-auth.session_token", "", path="/")
        try {
            const validated = validateUserLogin.parse({
                email : data.email,
                password : data.password
            })

            const validatedEmail = validated.email
            const validatedPw = validated.password

            const signin = await auth.api.signInEmail({
                body : {
                    email: validatedEmail,
                    password: validatedPw,
                    callbackURL : '/auth/verification-success'
                }
            })
            const headers = request.headers

            // Sign new account out to prevent a pile up of sessions
            headers.cookie = `better-auth.session_token=${signin.token}`
            await auth.api.signOut({
                headers: headers
            })
            // Restore cookie to regain session
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
            return "Signed In"
        }
        catch (error)
        {
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
            if (error instanceof ZodError)
                { return JSON.parse(error)[0].message }
            else if (error instanceof APIError)
            { return error.message }
            else  {
                console.log("ERROR", error)
                return `else ${error.mesage}`
            }
        }
    })
    return json({name: "accountSignIn", data : results}, {status : 200});
}