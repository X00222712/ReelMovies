// Third part
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';


// Is the user not signed in, then redirect
export const load = async ( { locals } ) => {
	if (!locals.user) {
		return redirect(302, '/');
	}
};

export const actions = {
    // 
    default: async ({ request }) =>
    {
        await auth.api.signOut({
			headers: request.headers
		});
		return redirect(302, '/');
    }
}