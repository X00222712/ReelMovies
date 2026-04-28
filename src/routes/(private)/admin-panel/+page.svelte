<!--
Author : Glen Johnston (Movie CRUD by Alex D)
Create : 23 / Mar / 2026

Description

Admin panel front end for CRUD of different features
-->

<script>
	import { getEnvVar } from 'better-auth';
	import { json } from 'zod';


    const {data, form} = $props()

    let userInfo = $state(data.users)
    let genres = $state(data.genres)
    let movies = $state(data.movies);
    let screens = $state(data.screens);
    let screeningTimes = $state(data.screenings);

    let failed = $derived(() => data?.failed)

    // If 9 in nextId then the next arrow goes to pageId 9
    let nextId = $state(3)
    // If 1 in lastId then the prev arrow goes to pageId 1
    let lastId = $state(-1)

    async function updatePage(event) {
        console.log(event.target.value ?? 1)
        const response = await fetch(`/admin-panel?type=users&values=${event.target.value ?? 1}`, {
            method : "GET",
        })

        const data = await response.json()
        userInfo = data.users
        lastId = data.lastpage
        nextId = data.nextpage

    }

</script>

{#if failed.status}

<!-- Show an error for more information -->
    <div class="w-75 mx-auto my-5">

        <h1 class="text-danger">FAILED</h1>
        <p class="px-2">{failed}</p>

    </div>

{:else}

    <div class="m-3">
        <div class="p-2 my-4 border border-3 border-dark">
            <h2>Users</h2>

            <!-- User read -->
            {#each userInfo as user}

                <div class="my-3 p-1 py-3" style="box-shadow: 0 0 5px 2px black;">
                <!-- Profile -->
                    <div class="d-flex gap-2 m-2">
                        <div class="col-2 col-md-1 mx-2 text-center">
                            <i class="bi bi-person-circle"></i>
                            <p>{user?.name}</p>
                        </div>

                        <div class="col-10 col-md-11">
                            <p class="m-0">{user?.email}</p>
                            <p class="m-0">{user?.RMPoints ?? 0}RM</p>
                        </div>
                    </div>

                    <div class="d-flex gap-2 mx-3">
                        <p class="px-2 text-center bg-danger rounded-pill">ID : {user?.id}</p>
                        {#if user?.admin}
                            <p class=" px-2 text-center bg-info rounded-pill">Admin</p>
                            {#if user?.privilage}
                                <p class="px-2 text-center bg-info rounded-pill">Privilaged</p>
                            {/if}
                        {/if}
                    </div>
                </div>
                
            {/each}

            <!-- Scroll users -->
            <div class="mx-auto d-flex" style="width: fit-content;">
            <!-- Previous -->
                <div class="text-center">
                    <button class="btn bi bi-arrow-left" type="submit" value={lastId} onclick={updatePage}>
                            <span class="visually-hidden">prev</span>
                    </button>
                    <p>{lastId > 0 ? lastId : "End"}</p>
                </div>

            <!-- Next -->
                <div class="text-center">
                    <button class="btn bi bi-arrow-right" type="submit" value={nextId} onclick={updatePage}>
                            <span class="visually-hidden">next</span>
                    </button>
                    <p>Next</p>
                </div>
            </div>

            <div class="d-block d-md-flex flex-wrap gap-4 justify-content-between mx-3">
                <!-- Create -->
                <div class="col-12 col-md-5 col-lg-3 mx-1 my-4 my-md-0">
                    <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">

                        <h3 class="text-center">Create account</h3>
                        <div class="d-flex flex-column justify-content-center">


                            <div>
                                {#if form?.newUser?.error}
                                <div class="col-12 col-md-6 mx-auto">
                                    <div class="text-center border border-danger border-3 mx-auto">
                                        <p class="m-2">{form?.newUser.message}</p>
                                    </div>
                                </div>
                                {/if}
                            </div>

                            <form class="m-3" action="?/createUser" method="post">
                                <div class="createUserForm mx-auto">
                                    <input class="w-100" type="text" name="email" id="email" placeholder="Email address" required="true">
                                </div>

                                <div class="createUserForm mx-auto">
                                    <input class="w-100" type="password" name="password" id="password" placeholder="Password" required="true">
                                </div>

                                <div class="createUserForm mx-auto">
                                    <input class="w-100" type="text" name="username" id="username" placeholder="username" required="true">
                                </div>

                                <div class="createUserForm mx-auto">
                                    <input class="w-100" type="text" name="RM points" id="RM points" placeholder="IT Reel Points" required="true">
                                </div>

                                <div class="createUserForm mx-auto d-flex flex-column flex-sm-row gap-4">
                                    <div>
                                        <input type="checkbox" name="admin" id="admin" >
                                        <label for="admin">Admin</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="privilaged" id="privilaged">
                                        <label for="admin">privilaged</label>
                                    </div>
                                </div>

                                <div class="buttonStyles mx-auto">
                                    <button class="w-100 btn btn-success" type="submit">Create User</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

                <!-- Edit -->
                <div class="col-12 col-md-5 col-lg-4 mx-1 my-4 my-md-0">
                    <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
                        
                        <h3 class="text-center">Edit account</h3>

                        <div>
                    <!-- Error message -->
                            <div>
                                {#if form?.edits?.error || form?.edits?.success}
                                <div class="col-12 col-md-6 mx-auto">
                                    <div class="text-center border {form?.edits?.error ? "border-danger" : "border-warning"} border-3 mx-auto">
                                        <p class="m-2">{form?.edits.message}</p>
                                    </div>
                                </div>
                                {/if}
                            </div>

                            <form action="?/editAccounut" method="POST">
                                <input class="w-100 my-3" type="text" name="email" id="email" placeholder="email address" required>

                                <div class="my-3">
                                    <div>
                                        <input class="mx-1" type="checkbox" name="edit RM" id="edit RM">
                                        <label class="mx-1" for="edit RM">Reel points</label>
                                    </div>
                                    <input class="w-100" type="number" name="RM points" id="RM points" placeholder="Amount">
                                </div>

                                <div>
                                    <div>
                                        <input class="mx-1" type="checkbox" name="edit admin" id="edit admin">
                                        <label class="mx-1" for="edit admin">Edit admins</label>
                                    </div>
                                    <input class="mx-1" type="checkbox" name="admin" id="admin">
                                    <label class="mx-1" for="admin">Admin</label>

                                    <input class="mx-1" type="checkbox" name="privilaged" id="privilaged">
                                    <label class="mx-1" for="privilaged">Privilaged</label>
                                </div>

                                <div class="my-2">
                                    <input class="w-100" type="text" name="admin password" id="admin password" placeholder="Your password" required>
                                </div>

                                <div class="buttonStyles mx-auto">
                                    <button class="w-100 btn btn-warning m-2" type="submit">Edit account</button>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>

                <!-- Delete -->
                <div class="col-12 col-md-5 col-lg-3 mx-1 my-4 my-md-0">
                    <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
                        <h3 class="text-center text-danger">Delete account</h3>
                        <p class="text-danger">Warning - There is no undoing or confirmation</p>

                        <div>

                            <div>
                                {#if form?.deleted?.message}
                                <div class="col-12 col-md-6 mx-auto">
                                    <div class="text-center border border-danger border-3 mx-auto">
                                        <p class="m-2">{form?.deleted.message}</p>
                                    </div>
                                </div>
                                {/if}
                            </div>

                            <form action="?/deleteAccount" method="POST">
                            
                                <div class="my-3">
                                    <input class="w-100" type="text" name="email" id="email" placeholder="email">
                                </div>

                                <div class="my-3">
                                    <input class="w-100" type="text" name="admin password" id="admin password" placeholder="Your password">
                                </div>

                                <div class="buttonStyles mx-auto">
                                    <button class="w-100 btn btn-danger m-2" type="submit">Delete account</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        <div class="p-2 pt-4 my-4 border border-3 border-dark">
            <h2>Movies</h2>

            <!-- Movies CUD -->
            <div class="d-block d-md-flex flex-wrap gap-4 justify-content-between mx-3">

                <!-- Create Movie -->
                <div class="col-12 col-md-5 col-lg-3 mx-1 my-4 my-md-0">
                    <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
                        <h3 class="text-center">Create Movie</h3>
                        <div>
                            {#if form?.newMovie?.error}
                            <div class="col-12 col-md-6 mx-auto">
                                <div class="text-center border border-danger border-3 mx-auto">
                                    <p class="m-2">{form?.newMovie.message}</p>
                                </div>
                            </div>
                            {/if}
                        </div>
                        <form class="m-3" action="?/createMovie" method="post">
                            <div class="createUserForm mx-auto">
                                <input class="w-100" type="text" name="title" id="title" placeholder="Title" required="true">
                            </div>

                            <div class="createUserForm mx-auto">
                                <input class="w-100" type="text" name="rating" id="rating" placeholder="Age rating (G/PG/...)" required>
                            </div>

                            <div class="createUserForm mx-auto">
                                <input class="w-100" type="text" name="poster" id="poster" placeholder="Poster URL">
                            </div>

                            <div class="createUserForm mx-auto">
                                <input class="w-100" type="number" step="0.1" name="ratingScore" id="ratingScore" placeholder="Rating score (e.g. 8.4)">
                            </div>

                            <div class="createUserForm mx-auto">
                                <textarea class="w-100" name="description" id="description" placeholder="Description"></textarea>
                            </div>

                            <div class="createUserForm mx-auto">
                                <label for="genres_select">Genres (hold CTRL / CMD to select multiple)</label>
                                <select class="w-100" name="genres" id="genres_select" multiple size="4">
                                    {#each data.genres as g}
                                        <option value={g.id}>{g.name}</option>
                                    {/each}
                                </select>
                            </div>

                            <div class="buttonStyles mx-auto">
                                <button class="w-100 btn btn-success" type="submit">Create Movie</button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Edit Movie -->
                <div class="col-12 col-md-5 col-lg-4 mx-1 my-4 my-md-0">
                    <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
                        <h3 class="text-center">Edit Movie</h3>

                        <div>
                            {#if form?.edits?.error || form?.edits?.success}
                            <div class="col-12 col-md-6 mx-auto">
                                <div class="text-center border {form?.edits?.error ? "border-danger" : "border-warning"} border-3 mx-auto">
                                    <p class="m-2">{form?.edits.message}</p>
                                </div>
                            </div>
                            {/if}
                        </div>
                        <form action="?/editMovie" method="POST">
                            <div class="my-3">
	                            <label for="edit_movie_id">Movie</label>
	                            <select class="w-100" name="id" id="edit_movie_id" required>
	                                <option value="">Select movie</option>
	                                {#each movies as movie}
	                                    <option value={movie.id}>{movie.id} - {movie.title}</option>
	                                {/each}
	                            </select>
	                        </div>

                            <div class="my-3">
                                <div>
                                    <input class="mx-1" type="checkbox" name="edit_title" id="edit_title">
                                    <label class="mx-1" for="edit_title">Edit title</label>
                                </div>
                                <input class="w-100" type="text" name="title" id="title_edit" placeholder="Title">
                            </div>
                            <div class="my-3">
                                <div>
                                    <input class="mx-1" type="checkbox" name="edit_rating" id="edit_rating">
                                    <label class="mx-1" for="edit_rating">Edit rating</label>
                                </div>
                                <input class="w-100" type="text" name="rating" id="rating_edit" placeholder="Age rating">
                            </div>
                            <div class="my-3">
                                <div>
                                    <input class="mx-1" type="checkbox" name="edit_poster" id="edit_poster">
                                    <label class="mx-1" for="edit_poster">Edit poster</label>
                                </div>
                                <input class="w-100" type="text" name="poster" id="poster_edit" placeholder="Poster URL">
                            </div>
                            <div class="my-3">
                                <div>
                                    <input class="mx-1" type="checkbox" name="edit_ratingScore" id="edit_ratingScore">
                                    <label class="mx-1" for="edit_ratingScore">Edit rating score</label>
                                </div>
                                <input class="w-100" type="number" step="0.1" name="ratingScore" id="ratingScore_edit" placeholder="Rating score">
                            </div>
                            <div class="my-3">
                                <div>
                                    <input class="mx-1" type="checkbox" name="edit_description" id="edit_description">
                                    <label class="mx-1" for="edit_description">Edit description</label>
                                </div>
                                <textarea class="w-100" name="description" id="description_edit" placeholder="Description"></textarea>
                            </div>
                            <div class="my-3">
                                <div>
                                    <input class="mx-1" type="checkbox" name="edit_genres" id="edit_genres">
                                    <label class="mx-1" for="edit_genres">Edit genres</label>
                                </div>
                                <label for="genres_edit_select">Select genres (multiple)</label>
                                <select class="w-100" name="genres" id="genres_edit_select" multiple size="4">
                                    {#each data.genres as g}
                                        <option value={g.id}>{g.name}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="buttonStyles mx-auto">
                                <button class="w-100 btn btn-warning m-2" type="submit">Edit Movie</button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Delete Movie -->
                <div class="col-12 col-md-5 col-lg-3 mx-1 my-4 my-md-0">
                    <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
                        <h3 class="text-center text-danger">Delete Movie</h3>
                        <p class="text-danger">Warning - There is no undoing or confirmation</p>
                        <div>
                            {#if form?.deleted?.message}
                            <div class="col-12 col-md-6 mx-auto">
                                <div class="text-center border border-danger border-3 mx-auto">
                                    <p class="m-2">{form?.deleted.message}</p>
                                </div>
                            </div>
                            {/if}
                        </div>
                        <form action="?/deleteMovie" method="POST">
                            <div class="my-3">
                                <select class="w-100" name="id" id="delete_movie_id" required>
	                                <option value="">Select movie</option>
	                                {#each movies as movie}
		                                <option value={movie.id}>{movie.id} - {movie.title}</option>
	                                {/each}
                                </select>

                            </div>
                            <div class="buttonStyles mx-auto">
                                <button class="w-100 btn btn-danger m-2" type="submit">Delete Movie</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Compact Genres management -->
            <div class="my-3 p-2" style="box-shadow: 0 0 5px 1px black; border-radius:6px;">
                <div class="d-flex gap-2 align-items-center flex-wrap">
                    <!-- small add form -->
                    <form method="post" action="?/createGenre" class="d-flex gap-1 align-items-center" style="min-width:220px;">
                        <input class="form-control form-control-sm" name="name" placeholder="New genre" required />
                        <button class="btn btn-success btn-sm" type="submit">Add</button>
                    </form>

                    <!-- inline list (compact) -->
                    <div class="d-flex gap-2 flex-wrap" style="align-items:center;">
                        {#each genres as g}
                            <div class="d-flex gap-1 align-items-center" style="padding:2px;">
                                <form method="post" action="?/editGenre" class="d-flex gap-1 align-items-center">
                                    <input type="hidden" name="id" value={g.id} />
                                    <input name="name" value={g.name} class="form-control form-control-sm" style="width:140px;" />
                                    <button class="btn btn-outline-primary btn-sm" type="submit">Save</button>
                                </form>
                                <form method="post" action="?/deleteGenre" onsubmit={(e) => { e.preventDefault(); if (confirm('Delete genre?')) e.target.submit(); }}>
                                    <input type="hidden" name="id" value={g.id} />
                                    <button class="btn btn-danger btn-sm" type="submit">Del</button>
                                </form>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

        </div>
        <div class="p-2 pt-4 my-4 border border-3 border-dark">
	<h2>Screening Times</h2>
	<div class="d-block d-md-flex flex-wrap gap-4 justify-content-between mx-3">
		<div class="col-12 col-md-5 col-lg-3 mx-1 my-4 my-md-0">
			<div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
				<h3 class="text-center">Create Screening</h3>

				{#if form?.newScreening?.error}
					<div class="col-12 col-md-6 mx-auto">
						<div class="text-center border border-danger border-3 mx-auto">
							<p class="m-2">{form.newScreening.message}</p>
						</div>
					</div>
				{/if}
				<form class="m-3" action="?/createScreening" method="post">
					<div class="createUserForm mx-auto">
						<select class="w-100" name="movieId" required>
							<option value="">Select movie</option>
							{#each movies as movie}
								<option value={movie.id}>{movie.id} - {movie.title}</option>
							{/each}
						</select>
					</div>
					<div class="createUserForm mx-auto">
						<select class="w-100" name="screenId" required>
							<option value="">Select screen</option>
							{#each screens as screen}
								<option value={screen.id}>{screen.id} - {screen.name}</option>
							{/each}
						</select>
					</div>
					<div class="createUserForm mx-auto">
						<input class="w-100" type="date" name="date" required>
					</div>
					<div class="createUserForm mx-auto">
						<input class="w-100" type="time" name="time" required>
					</div>
					<div class="buttonStyles mx-auto">
						<button class="w-100 btn btn-success" type="submit">Create Screening</button>
					</div>
				</form>
			</div>
		</div>

		<div class="col-12 col-md-5 col-lg-4 mx-1 my-4 my-md-0">
			<div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
				<h3 class="text-center">Edit Screening</h3>

				{#if form?.screeningEdits?.error || form?.screeningEdits?.success}
					<div class="col-12 col-md-6 mx-auto">
						<div class="text-center border {form?.screeningEdits?.error ? 'border-danger' : 'border-warning'} border-3 mx-auto">
							<p class="m-2">{form.screeningEdits.message}</p>
						</div>
					</div>
				{/if}
				<form action="?/editScreening" method="POST">
					<input class="w-100 my-3" type="number" name="id" placeholder="Screening ID to edit" required>
					<div class="my-3">
						<label>Movie</label>
						<select class="w-100" name="movieId" required>
							<option value="">Select movie</option>
							{#each movies as movie}
								<option value={movie.id}>{movie.id} - {movie.title}</option>
							{/each}
						</select>
					</div>
					<div class="my-3">
						<label>Screen</label>
						<select class="w-100" name="screenId" required>
							<option value="">Select screen</option>
							{#each screens as screen}
								<option value={screen.id}>{screen.id} - {screen.name}</option>
							{/each}
						</select>
					</div>
					<div class="my-3">
						<label>Date</label>
						<input class="w-100" type="date" name="date" required>
					</div>

					<div class="my-3">
						<label>Time</label>
						<input class="w-100" type="time" name="time" required>
					</div>
					<div class="buttonStyles mx-auto">
						<button class="w-100 btn btn-warning m-2" type="submit">Edit Screening</button>
					</div>
				</form>
			</div>
		</div>

		<div class="col-12 col-md-5 col-lg-3 mx-1 my-4 my-md-0">
			<div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
				<h3 class="text-center text-danger">Delete Screening</h3>
				<p class="text-danger">Warning - There is no undoing or confirmation</p>
				{#if form?.screeningDeleted?.message}
					<div class="col-12 col-md-6 mx-auto">
						<div class="text-center border border-danger border-3 mx-auto">
							<p class="m-2">{form.screeningDeleted.message}</p>
						</div>
					</div>
				{/if}
				<form action="?/deleteScreening" method="POST">
					<div class="my-3">
						<input class="w-100" type="number" name="id" placeholder="Screening ID to delete" required>
					</div>
					<div class="buttonStyles mx-auto">
						<button class="w-100 btn btn-danger m-2" type="submit">Delete Screening</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


    </div>
{/if}


<style>

    .createUserForm {
        width: fit-content;
        margin-block: 8px;
    }

    .buttonStyles {
        width: 60%;
    }

    @media (max-width: 720px)
    {
        .buttonStyles {
            width: 70%;
        }
    }

</style>