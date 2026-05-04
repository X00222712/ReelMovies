import { idSchema } from "$lib/server/db/validation";
import { feedbackService } from "$lib/server/services/feedback-service";
import { fail, redirect } from "@sveltejs/kit";


export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(303, '/auth/signin');
    }

    const feedback = await feedbackService.getAllFeedback()
    return { feedback }
}

export const actions = {
    submitFeedback: async ({ request, locals }) => {
		const data = await request.formData();

        const userId = Number(locals?.user.id)
        const rating = data.get('rating')
        const review = data.get('review')
        console.log(rating)

        console.log("Send feeback")

        try {
            const validatedRating = idSchema.parse({id : Number(rating)}).id
            feedbackService.addFeedback( userId, validatedRating, review )
        }
        catch (e)
        {
            console.log(e)
            return fail(400, {message : 'Unable to submit, try again'})
        }

        return
    }
}