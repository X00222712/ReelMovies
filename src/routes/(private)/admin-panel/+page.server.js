/*

Author : Glen Johnston
Create : 23 / Mar / 2026

Description

Admin panel functions and data

*/

// Third party
import { auth } from "$lib/server/auth"
import { fail, redirect } from '@sveltejs/kit';

// ours
import { idSchema, validateUser, validateUserEmail, validateUserPassword } from "$lib/server/db/validation"
import { usersService } from "$lib/server/services/users-service"
import { moviesService } from "$lib/server/services/movie-service"
import { genreService } from "$lib/server/services/genre-service"
import { db } from '$lib/server/db';
import { movieGenres, movies, screens, screenings } from '$lib/server/db/schema.js';
import { eq, asc } from 'drizzle-orm';
import { success } from "zod";

export async function load({ locals }) {
    if (!locals.user) { return redirect(302, '/account'); }
    // Validate the user
    let validatedId;
    try
        { validatedId = idSchema.parse({id : Number(locals.user.id)}).id }
    catch (error)
    // This will show an error message,
    // Could do something better but we only need it to work
        {
            console.log(error)
            return redirect(302, '/')
        }

    let access;
    try
        { access = await usersService.canAccessAdmin(validatedId) }
    catch (error)
        {
            console.log(error)
            return redirect(302, '/account')
        }

    if (1 > access.length || false === access?.admin)
        { return redirect(302, '/') }

    // Validate maybe in the future
    const users = await usersService.getUsersPageByID(1, 4)
    // Load genres for admin UI
    let genres = [];
    try {
        genres = await genreService.getAllGenres();
    } catch (err) {
        console.log('Failed to load genres', err);
    }

    let moviesList = [];
    let screensList = [];
    let screeningTimes = [];

    try {
        moviesList = await db
            .select({
                id: movies.id,
                title: movies.title
            })
            .from(movies)
            .orderBy(asc(movies.id));

        screensList = await db
            .select({
                id: screens.id,
                name: screens.name
            })
            .from(screens)
            .orderBy(asc(screens.id));

        screeningTimes = await db
            .select({
                id: screenings.id,
                movieId: screenings.movieId,
                screenId: screenings.screenId,
                date: screenings.date,
                time: screenings.time,
                movieTitle: movies.title,
                screenName: screens.name
            })
            .from(screenings)
            .innerJoin(movies, eq(screenings.movieId, movies.id))
            .innerJoin(screens, eq(screenings.screenId, screens.id))
            .orderBy(asc(screenings.id));
    } catch (err) {
        console.log('Failed to load screening data', err);
    }

    return {users, genres, movies: moviesList, screens: screensList, screenings: screeningTimes, failed: {}}

    }

export const actions = {
    async createUser( { request, cookies } ) {
        const data = await request.formData()
        const username = data.get("username")
        const email = data.get("email")
        const password = data.get("password")
        const reelpoints = Number(data.get("RM points")) ?? 0

        const admin = data.get("admin")
        const privilaged = data.get("privilaged")

        // Declare all expected values
        let newUser = {
            error : false,
            message : "Failed due to unknow reasons"
        };

        let validatedUser;
        let ValidatedRMPoints;
        try {
            validatedUser = validateUser.parse({
                name : username,
                email,
                password
            })
            ValidatedRMPoints = idSchema.parse({id : reelpoints})
        }
        catch (error) {
            newUser = {
                error : true,
                message : JSON.parse(error.message)[0].message
            }
            return fail(400, { newUser })
        }

        // The account information is valid
        // Save the current users information
        let userSigninCookie = cookies.get("better-auth.session_token")

        let CreatedUser;
        try {
            CreatedUser = await auth.api.signUpEmail({
                body : {
                    name : validatedUser.name,
                    email : validatedUser.email,
                    password : validatedUser.password,
                },
            })
        }
        catch (error)
        {
            newUser = {
                error : true,
                message : `Account Creation failed - ${error.message}`
            }
            // Restore the user's session token
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
            return fail(400, { newUser })
        }

        try
        {
            const userId = Number(CreatedUser.user.id)
            // Add RM points of the user
            await usersService.insertUserPoints(userId, Number(ValidatedRMPoints.id))

            // Add privilage
            if ("on" == privilaged)
                { await usersService.Insertadmins(userId, true, true) }
            // Add admin
            else if ("on" === admin)
                { await usersService.Insertadmins(userId, true, false) }

        }
        catch (error)
        {
            console.log(error)
            newUser = {
                error : true,
                message : `Account Creation failed to insert extra info`
            }
            // Restore the user's session token
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
            return fail(400, { newUser })
        }

        // Account created
        // Signout to remove session token from new user
        try
        {
            await auth.api.signOut({
                headers : { cookie : CreatedUser.token }
            })
            // Restore the user's session token
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
        }
        catch (error)
        {
            newUser = {
                error : true,
                message : `Account created, but failed with ${error.message}`
            }
            // Restore the user's session token
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
            return fail(400, { newUser })
        }  
        // Return expected values even if something goes wrong
        return { newUser }
    },
    
    // TODO
    // Make all fails and successes append to edits
    // so multiple messages can display
    async editAccount( { locals, request, cookies } )
    {
        const data = await request.formData()
        const email = data.get("email")
        // Things to edit
        const RMPCheck = "on" === data.get("edit RM")
        const adminCheck = "on" === data.get("edit admin")
        // Admin's password
        const password = data.get("admin password")

        let edits = {
            success : false,
            error : false,
            message : ""
        }

        let validatedId;
        try
        {
            const validatedEmail = validateUserEmail.parse({email}).email
            const userId = await usersService.getUserByEmail(validatedEmail)

            validatedId = Number(idSchema.parse(userId).id)
        }
        catch (error)
        {
            console.log(error)
            edits.error = true
            edits.message = `Unable to find user ${email}`
            return { edits }
        }

        // Reel points edit
        if (RMPCheck)
        {
            let validatedRMPoints = 0;

            try
            {
                const RMP = Number(data.get("RM points"));
// Only thing that'll error
                validatedRMPoints = idSchema.parse({id : RMP}).id
// I doubt this will ever fail
                await usersService.updateRMpoints(validatedId, validatedRMPoints)
                edits.success = true
                edits.message += "Changed RM points "
            }
            catch (error)
            {
                console.log(error)
                edits.error = true
                edits.message = JSON.parse(error)[0].message
                return { edits }
            }
        }

        else if (adminCheck)
        {

            const beAdmin = "on" === data.get("admin")
            const bePrivilaged = "on" === data.get("privilaged")

            try
                { await usersService.Insertadmins(validatedId, beAdmin, bePrivilaged )}
            catch
            {
                if (beAdmin)
                    { await usersService.setAdmin(validatedId) }
                else
                    { await usersService.removeAdmin(validatedId) }
                if (bePrivilaged)
                    { await usersService.setPrivilage(validatedId) }
                else
                    { await usersService.removePrivilage(validatedId) }
            }
            edits.success = true
            edits.message += "Changed admin status "
        }
    
        else
        {
            edits = {
                error : true,
                message : "Not implemented"
            }
        }

        return { edits }
    },

    async deleteAccount( { request, cookies } )
    {
        const data = await request.formData()
        const email = data.get("email")
        const password = data.get("admin password")

        let deleted = {
            error : false,
            message : "Account deleted"
        }

        let validatedId;
        try
        {
            const validatedEmail = validateUserEmail.parse({email}).email
            const userId = await usersService.getUserByEmail(validatedEmail)

            validatedId = idSchema.parse(userId).id
        }
        catch (error)
        {
            console.log(error)
            deleted = {
                error : true,
                message : `Unable to find user ${email}`
            }
            return { deleted }
        }

        

        try
        {
            const token = cookies.get("better-auth.session_token")
            await usersService.deleteUserData(validatedId, token, password)
            await usersService.deleteAccount(validatedId, token, password)
        }
        catch (error)
        {
            console.log(error)
            deleted = {
                error : true,
                message : "Failed to delete user"
            }
        }
        return { deleted }
    },

    // Movie CRUD
    async createMovie({ request }) {
        const data = await request.formData();
        const title = String(data.get('title') ?? '').trim();
        const rating = String(data.get('rating') ?? '').trim();
        const poster = String(data.get('poster') ?? '').trim();
        const ratingScore = data.get('ratingScore');
        const description = String(data.get('description') ?? '').trim();
        const selectedGenres = (data.getAll('genres') || []).map(x => Number(x)).filter(Boolean);

        const newMovie = { error: false, message: 'Created movie' };
        if (!title) {
            newMovie.error = true; newMovie.message = 'Title is required';
            return fail(400, { newMovie });
        }

        try {
            const created = await moviesService.addMovie({ title, rating, poster, description, ratingScore: ratingScore ? Number(ratingScore) : null });
            newMovie.id = created.id ?? null;
            newMovie.message = 'Movie created';
            // insert genre mappings if any
            if (created?.id && selectedGenres.length) {
                for (const gid of selectedGenres) {
                    await db.insert(movieGenres).values({ movieId: created.id, genreId: gid });
                }
            }
        } catch (err) {
            console.log(err);
            newMovie.error = true; newMovie.message = `Failed to create movie: ${err.message}`;
            return fail(500, { newMovie });
        }

        return { newMovie };
    },

    async editMovie({ request }) {
        const data = await request.formData();
        const id = Number(data.get('id')) || null;
        const title = String(data.get('title') ?? '').trim();
        const rating = String(data.get('rating') ?? '').trim();
        const poster = String(data.get('poster') ?? '').trim();
        const ratingScore = data.get('ratingScore');
        const description = String(data.get('description') ?? '').trim();
        const selectedGenres = (data.getAll('genres') || []).map(x => Number(x)).filter(Boolean);

        const edits = { success: false, error: false, message: '' };
        if (!id) { edits.error = true; edits.message = 'Movie id required'; return fail(400, { edits }); }

        try {
            const updated = await moviesService.updateMovie(id, { title, rating, poster, description, ratingScore: ratingScore ? Number(ratingScore) : null });
            edits.success = true; edits.message = 'Movie updated'; edits.movie = updated;
            // update genre mappings: remove existing then insert selected
            if (id) {
                await db.delete(movieGenres).where(eq(movieGenres.movieId, id));
                if (selectedGenres.length) {
                    for (const gid of selectedGenres) {
                        await db.insert(movieGenres).values({ movieId: id, genreId: gid });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            edits.error = true; edits.message = `Failed to update movie: ${err.message}`;
            return fail(500, { edits });
        }
        return { edits };
    },

    async deleteMovie({ request }) {
        const data = await request.formData();
        const id = Number(data.get('id')) || null;
        const deleted = { error: false, message: 'Movie deleted' };
        if (!id) { deleted.error = true; deleted.message = 'Movie id required'; return fail(400, { deleted }); }

        try {
            await moviesService.deleteMovie(id);
            deleted.message = 'Movie deleted';
        } catch (err) {
            console.log(err);
            deleted.error = true; deleted.message = `Failed to delete movie: ${err.message}`;
            return fail(500, { deleted });
        }

        return { deleted };
    },

    // Genre CRUD
    async createGenre({ request }) {
        const data = await request.formData();
        const name = String(data.get('name') ?? '').trim();
        const result = { error: false, message: 'Genre created' };
        if (!name) { result.error = true; result.message = 'Name is required'; return fail(400, { result }); }
        try {
            const created = await genreService.addGenre(name);
            result.genre = created;
            result.message = 'Genre created';
        } catch (err) {
            console.log(err);
            result.error = true; result.message = `Failed to create genre: ${err.message}`;
            return fail(500, { result });
        }
        return { result };
    },

    async editGenre({ request }) {
        const data = await request.formData();
        const id = Number(data.get('id')) || null;
        const name = String(data.get('name') ?? '').trim();
        const result = { success: false, error: false, message: '' };
        if (!id || !name) { result.error = true; result.message = 'id and name required'; return fail(400, { result }); }
        try {
            const updated = await genreService.updateGenre(id, name);
            result.success = true; result.message = 'Genre updated'; result.genre = updated;
        } catch (err) {
            console.log(err);
            result.error = true; result.message = `Failed to update genre: ${err.message}`; return fail(500, { result });
        }
        return { result };
    },

    async deleteGenre({ request }) {
        const data = await request.formData();
        const id = Number(data.get('id')) || null;
        const result = { error: false, message: 'Genre deleted' };
        if (!id) { result.error = true; result.message = 'id required'; return fail(400, { result }); }
        try {
            await genreService.deleteGenre(id);
            result.message = 'Genre deleted';
        } catch (err) {
            console.log(err);
            result.error = true; result.message = `Failed to delete genre: ${err.message}`; return fail(500, { result });
        }
        return { result };
    },

    async createScreening({ request }) {
	    const data = await request.formData();
	    const movieId = Number(data.get('movieId'));
	    const screenId = Number(data.get('screenId'));
	    const date = String(data.get('date') ?? '').trim();
	    const time = String(data.get('time') ?? '').trim();
	    const newScreening = {
		    error: false,
		    message: 'Screening created'
	    };

	    if (!movieId || !screenId || !date || !time) {
		    newScreening.error = true;
		    newScreening.message = 'Movie, screen, date and time are required';
		    return fail(400, { newScreening });
	    }

	    try {
		    await db.insert(screenings).values({
			    movieId,
			    screenId,
			    date,
			    time
		    });
	    } catch (err) {
		    console.log(err);
		    newScreening.error = true;
		    newScreening.message = `Failed to create screening: ${err.message}`;
		    return fail(500, { newScreening });
	    }

	    return { newScreening };
    },

    async editScreening({ request }) {
	    const data = await request.formData();
	    const id = Number(data.get('id'));
	    const movieId = Number(data.get('movieId'));
	    const screenId = Number(data.get('screenId'));
	    const date = String(data.get('date') ?? '').trim();
	    const time = String(data.get('time') ?? '').trim();
	    const screeningEdits = {
		    success: false,
		    error: false,
		    message: ''
	    };

	    if (!id || !movieId || !screenId || !date || !time) {
		    screeningEdits.error = true;
		    screeningEdits.message = 'Screening ID, movie, screen, date and time are required';
		    return fail(400, { screeningEdits });
	    }

	    try {
		    await db
			    .update(screenings)
			    .set({
				    movieId,
				    screenId,
				    date,
				    time
			    })
			    .where(eq(screenings.id, id));

		    screeningEdits.success = true;
		    screeningEdits.message = 'Screening updated';
	    } catch (err) {
		    console.log(err);
		    screeningEdits.error = true;
		    screeningEdits.message = `Failed to update screening: ${err.message}`;
		    return fail(500, { screeningEdits });
	    }
	    return { screeningEdits };
    },

    async deleteScreening({ request }) {
	    const data = await request.formData();
	    const id = Number(data.get('id'));
	    const screeningDeleted = {
		    error: false,
		    message: 'Screening deleted'
	    };

	    if (!id) {
		    screeningDeleted.error = true;
		    screeningDeleted.message = 'Screening ID required';
		    return fail(400, { screeningDeleted });
	    }

	    try {
		    await db.delete(screenings).where(eq(screenings.id, id));
	    } catch (err) {
		    console.log(err);
		    screeningDeleted.error = true;
		    screeningDeleted.message = `Failed to delete screening: ${err.message}`;
		    return fail(500, { screeningDeleted });
	    }

	    return { screeningDeleted };
    },

}