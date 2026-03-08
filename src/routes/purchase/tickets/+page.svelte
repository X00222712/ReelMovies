<script>
	import { page } from "$app/state";

    const { data } = $props();
    const movies = data.movies;
    const movieTimes = data.movieTimes

    let selectedMovieName = $state(page.url.searchParams.get("movie")?? false);
    let selectedMovieTimes = $derived(movieTimes[selectedMovieName])
    let selectedMovieTime = $state(false)

    // Work around for now
    let getMovie = (title) => {
        let rmovie = ""
        movies.forEach(movie => {
            if (title === movie.title)
                { rmovie = movie}
        });
        return rmovie;
    }
    let movie = $derived(getMovie(selectedMovieName)) 

</script>

<div class="m-5">
    <h2 class="text-center">Book Ticket</h2>
    
    <div class="d-flex justify-content-center py-3">
        <div class="col-4 mx-5">
            <select class="form-select" bind:value={selectedMovieName} style="box-shadow: 0 0 10px black;">
                <option value="{false}">Select movie</option>

                {#each movies as movie}
                    <option value="{movie.title}">{movie.title}</option>
                {/each}
            </select>
        </div>

        <div class="col-4 mx-5">
            <select class="form-select" name="" id="" bind:value={selectedMovieTime} style="box-shadow: 0 0 10px black;">
                <option value="{false}">Select time</option>
                {#each selectedMovieTimes as movieTimes}
                    <option value="{movieTimes.time}">{movieTimes.time}</option>
                {/each}
            </select>
        </div>

    </div>


    {#if selectedMovieName}
        <!-- Movie information -->
        <div class="ms-5 my-5 d-flex flex-column flex-md-row">
            <img
                src="{movie.poster}"
                alt="{selectedMovieName} poster"
                class="rounded col-3 align-self-center align-self-md-left mb-5 mb-md-0"
                style="width: 200px; height: 320px; object-fit: cover; box-shadow: 0 0 15px black;"
            />
            <div class="ms-md-5 bg-secondary rounded p-3">
                <div class="d-flex flex-column flex-md-row align-items-md-center">
                    <h2 class="m-0">{selectedMovieName}</h2>
                    <p class="m-0 px-3" style="width: fit-content;">⭐ {movie.rating} / 10</p>
                </div>
                <div class="d-flex gap-3 ms-md-4">
                    <p>{movie.runtime}</p>
                    <p
                        class="rounded-pill px-2 py-1 fw-bolder text-white"
                        style="background: var(--accent); font-size: 0.75rem;"
                    >
                        {movie.ageRating}
                    </p>
                </div>

                <div>
                    <p
                        class="rounded-pill px-3"
                        style="
                            background: rgba(255,255,255,0.15);
                            width:fit-content;
                            color: #eaeaea;
                            font-size: small;
                            font-weight: 900;
                        "
                    >
                        {movie.genre}
                    </p>
                </div>
                {console.log(movie)}
                <p class="ms-4 mt-4">{movie.description}</p>
            </div>
        </div>

        <!-- Screen information -->
        <div></div>
    {/if}

</div>