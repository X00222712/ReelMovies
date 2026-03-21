// Third part
import { db } from '$lib/server/db';
import { auth } from '$lib/server/auth';
import { fail, json, redirect } from '@sveltejs/kit';
import { admins, rewardPoints } from '$lib/server/db/schema';

export async function load( { locals } )
{
    if (locals.user?.name)
        { redirect(307, "/account") }
}

async function makeAccounts(cookies)
{
	let userSigninCookie = cookies.get("better-auth.session_token")
    try {
        // password : ITSupport
        await auth.api.signUpEmail({
            body:  {
                name : "IT Admin",
                email : 'itsuper@reelmovies.ie',
                password: "ITSuport"
        }})
        await db.insert(admins).values({userId: 1, id: 1, admin: 1, privilage: 1})
        await db.insert(rewardPoints).values({userId: 1, points: 100000})

        // password : reelmovies
        await auth.api.signUpEmail({
            body:  {
                name : "Admin",
                email : 'admin@reelmovies.ie',
                password: "reelmovies"
        }})
        await db.insert(admins).values({userId: 2, id: 2, admin: 1, privilage: 0})
        await db.insert(rewardPoints).values({userId: 2, points: 0})


        // password : password123
        let user = await auth.api.signUpEmail({
            body:  {
                name : "Glen",
                email : 'test@test.ie',
                password: "password123"
        }})
        console.log("USER", user)
        await db.insert(rewardPoints).values({userId: 3, points: 200})

        // password : SuperCool
        await auth.api.signUpEmail({
            body:  {
                name : "Alex",
                email : 'Alex@test.ie',
                password: "SuperCool"
        }})
        await db.insert(rewardPoints).values({userId: 4, points: 400})

        // password : password123
        await auth.api.signUpEmail({
            body:  {
                name : "Glen",
                email : 'glen@test.ie',
                password: "password123"
        }})

        // password : password123
        await auth.api.signUpEmail({
            body:  {
                name : "Glen",
                email : 'GLEN@test.com',
                password: "password123"
        }})
    
        cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
        return true
    } catch (error)
    {
        console.log(error)
        cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
        return false
    }
}

export const actions = {
	default : async ({ request, cookies }) =>
    {
        const data = await request.formData();
        const password = data.get("password")
        // Temp password
        if ("RM" !== password) { return fail(401, {failed: true, message : "Password incorrect"}) }

        if (!(await makeAccounts(cookies)))
        { return fail(400, {failed: true, message : "Failed to create accounts" }) }

        return { failed: false, message : "DB setup" }
	} 
}