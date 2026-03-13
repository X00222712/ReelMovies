import { auth } from "$lib/server/auth";

export async function newAccount() {
    let name = "glen"
    let email = "glen@a.com"
    let password = "Helloworld123!"
    try {
        await auth.api.signUpEmail({
            body : {
                name,
                email,
                password,
                callbackURL: '/auth/verification-success'
            }
        })
        return "Account Created";
    } catch (error) {
        return error.message;
    }
}