import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { usersService } from './services/users-service';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	advanced: {
		database: {
			generateId: 'serial'
		}
	},
	database: drizzleAdapter(db, { provider: 'sqlite' }),
	emailAndPassword: { enabled: true},
	user : {
		deleteUser : {
			enabled : true,
			sendDeleteAccountVerification: false,
			beforeDelete: async (user) => {
				await usersService.deleteUser(user.id)
			}
		},
		changeEmail : {
			enabled : true,
			updateEmailWithoutVerification: true
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)] // make sure this is the last plugin in the array
});
