import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { admins, rewardPoints } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { fail } from 'node:assert';

// Split make DB into functions for more maintainable code

export const actions = {
	makeDB : async ({ request, cookies }) =>
    {
        let userSigninCookie = cookies.get("better-auth.session_token")
		try {
			// password : ITSupport
			await auth.api.signUpEmail({
				body:  {
					name : "IT Admin",
					email : 'itsuper@reelmovies.ie',
					password: "ITSupport"
				}
			})
			await db.insert(admins).values({userId: 1, id: 1, privilage: 1})
			await db.insert(rewardPoints).values({userId: 1, points: 100000})

			// password : reelmovies
			await auth.api.signUpEmail({
				body:  {
					name : "Admin",
					email : 'admin@reelmovies.ie',
					password: "reelmovies"
				}
			})
			await db.insert(admins).values({userId: 2, id: 2, privilage: 0})
			await db.insert(rewardPoints).values({userId: 2, points: 0})


			// password : password123
			let user = await auth.api.signUpEmail({
				body:  {
					name : "Glen",
					email : 'test@test.ie',
					password: "password123"
				}
			})
			console.log("USER", user)
			await db.insert(rewardPoints).values({userId: 3, points: 200})

			// password : SuperCool
			await auth.api.signUpEmail({
				body:  {
					name : "Alex",
					email : 'Alex@test.ie',
					password: "SuperCool"
				}
			})
			await db.insert(rewardPoints).values({userId: 4, points: 400})

			// password : password123
			await auth.api.signUpEmail({
				body:  {
					name : "Glen",
					email : 'glen@test.ie',
					password: "password123"
				}
			})

			// password : password123
			await auth.api.signUpEmail({
				body:  {
					name : "Glen",
					email : 'GLEN@test.com',
					password: "password123"
				}
			})
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
			return {message: "Success"}
		}
		catch (error)
		{
			console.log(error)
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
			return fail(400, {message : `error ${error.message}`})
		}
	} 
}