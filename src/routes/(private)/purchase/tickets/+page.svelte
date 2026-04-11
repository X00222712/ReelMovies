<script>
	import { page } from "$app/state";

    const { data } = $props();
    const movies = data.movies;
    const movieTimes = data.movieTimes
    let screens = data.screens;


    let selectedMovieName = $state(page.url.searchParams.get("movie")?? false);
    let selectedMovieTimes = $derived(movieTimes[selectedMovieName]);
    let selectedMovieTime = $state(page.url.searchParams.get("time"));

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

    let getScreen = (title, time) => {
        let screen = false;
        movieTimes[title].forEach(screening => {
            if (screening.time === time)
                { screen = screens[screening.screen] }
        });
        return screen;
    }
    let screen = $derived(getScreen(selectedMovieName, selectedMovieTime));
    let selectedSeats = $state(["1,3"]);

    function seatSelected(row, col) { return selectedSeats.includes(`${row},${col}`) }
    function seatTaken(row, col) {return screen.taken.includes(`${row},${col}`)}

    function selectSeat(event)
    {
        let seatNum = event.target.value.split(",");
        if (seatTaken(seatNum[0], seatNum[1])) return;
        if (seatSelected(seatNum[0], seatNum[1])) delete selectedSeats[selectedSeats.indexOf(`${seatNum[0]},${seatNum[1]}`)];
        else selectedSeats.push(`${seatNum[0]},${seatNum[1]}`);
        return;
    }

</script>

<div class="my-5">
    <h2 class="text-center">Book Ticket</h2>
    
    <div class="mx-5 d-flex justify-content-center py-3">
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
        <div class="px-md-5 mx-md-5 my-5 d-flex flex-column flex-md-row">
            <img
                src="{movie.poster}"
                alt="{selectedMovieName} poster"
                class="rounded col-3 align-self-center align-self-md-left mb-5 mb-md-0"
                style="width: 200px; height: 320px; object-fit: cover; box-shadow: 0 0 15px black;"
            />
            <div class="ms-md-5 bg-secondary rounded p-3" style="box-shadow: 0 0 15px;">
                <div class="d-flex flex-column flex-md-row align-items-md-center">
                    <h2 class="m-0">{selectedMovieName}</h2>
                    <p class="m-0 px-1 px-md-3" style="width: fit-content;">⭐ {movie.rating} / 10</p>
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
                <p class="ms-4 mt-4">{movie.description}</p>
            </div>
        </div>

        <!-- Screen information -->
        <div>

            {#if screen}
                <h2 class="border border-3 border-dark text-center w-50 mx-auto" style="margin-top: 5rem;">SCREEN</h2>

                <div class="py-5">
                    <div class="screen-seats mx-auto p-4 py-5 rounded-4" style="box-shadow: 0 0 30px; width:fit-content">
                        <div>
                            {#each screen.seats as row, i}
                                <div class="d-flex flex-row justify-content-center">
                                    {#each row as seat, j}
                                        <!-- background-color: #cf0023
                                        background-color: #31e7ff
                                        background-color: #dda200
                                        background-color: #1403FF -->
                                            {#if "S" === seat}
                                                <button type="button" value="{i},{j}" class="mx-md-2 my-md-2 m-1 seat {seatTaken(i, j) ? "seat-taken" : "seat-saver"}" style="{seatSelected(i, j) ? "background-color: #cf0023" : ""}" onclick={selectSeat} aria-label="row {i+1} column {j+1}"></button>
                                            {:else if "R" == seat}
                                                <button type="button" value="{i},{j}" class="mx-md-2 my-md-2 m-1 seat {seatTaken(i, j) ? "seat-taken" : "seat-regular"}" style="{seatSelected(i, j) ? "background-color: #31e7ff" : ""}" onclick={selectSeat} aria-label="row {i+1} column {j+1}"></button>
                                            {:else if "V" === seat}
                                                <button type="button" value="{i},{j}" class="mx-md-2 my-md-2 m-1 seat {seatTaken(i, j) ? "seat-taken" : "seat-vip"}" style="{seatSelected(i, j) ? "background-color: #dda200" : ""}" onclick={selectSeat} aria-label="row {i+1} column {j+1}"></button>
                                            {:else if "D" === seat}
                                                <button type="button" value="{i},{j}" class="mx-md-2 my-md-2 m-1 seat {seatTaken(i, j) ? "seat-taken" : "seat-disability"} bi bi-person-wheelchair" style="{seatSelected(i, j) ? "background-color: #1403FF" : ""}" onclick={selectSeat} aria-label="row {i+1} column {j+1}"></button>
                                            {/if}
                                    {/each}
                                    </div>
                            {/each}
                        </div>
                    </div>
                </div>

                <h3 class="mx-5 fw-bolder fs-1">SEAT INFO</h3>

                <div class="bg-secondary py-3 px-5 my-5" style="box-shadow: 0 0 30px;">
                    <div class="my-3 p-2 d-flex gap-4 align-items-center rounded" style="border: 2px solid #cf0023; border-left: 8px solid #cf0023;">
                        <div class="rounded-4 rounded-top-0 ms-3" style="width: 1.5rem; height: 1.8rem; border: 2px solid #cf0023;"></div>
                        <div class="mt-2">
                            <h3>SAVER SEATS</h3>
                            <p>€5.99</p>
                        </div>
                    </div>
                    <div class="my-3 p-2 d-flex gap-4 align-items-center rounded" style="border: 2px solid #31e7ff; border-left: 8px solid #31e7ff;">
                        <div class="rounded-4 rounded-top-0 ms-3" style="width: 1.5rem; height: 1.8rem; border: 2px solid #31e7ff;"></div>
                        <div class="mt-2">
                            <h3>REGULAR SEATS</h3>
                            <p>€7.99</p>
                        </div>
                    </div>
                    <div class="my-3 p-2 d-flex gap-4 align-items-center rounded" style="border: 2px solid #dda200; border-left: 8px solid #dda200;">
                        <div class="rounded-4 rounded-top-0 ms-3" style="width: 1.5rem; height: 1.8rem; border: 2px solid #dda200;"></div>
                        <div class="mt-2">
                            <h3>VIP SEATS</h3>
                            <p>€9.99</p>
                        </div>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Purchase overview -->
        <div></div>

    {/if}

</div>



<style>
    .seat {
        width: 1.5rem;
        height: 2rem;
        border-radius: 0 0 4rem 4rem;
    }

    .seat-saver { border: 2px solid #cf0023; }
    .seat-regular { border: 2px solid #31e7ff; }
    .seat-vip { border: 2px solid #dda200; }
    .seat-disability { border: 2px solid #1403FF; }
    .seat-taken {
        background-color:  #646464;
        border: 2px solid #000000;
    }

    @media (min-width: 785px)
    {
        .seat {
            scale : 120%;
        }
        
    }

</style>