<script>
	import { onMount } from "svelte";

    // Maybe make logic to personalise movies
    // TODO
        // Make a recommended DB for easy modifycation
        // Make it a recommended element not a recommended movie element.
    let movies = $state();

    onMount(async () =>
    {
        let response = await fetch(
            "/movies/",
            {
                method : "POST",
                body : JSON.stringify({ info: "recommened movies" }),
                headers:
                {
                    "Content-Type": "application/json",
                },
            }
        )
        const data = await response.json()
        console.log(data)
        movies = data.movies
    })

</script>

<!-- Made with the help of documentation -->
<!-- https://getbootstrap.com/docs/5.0/components/carousel/ -->

<div id="movieCarousel" class="carousel carousel-dark slide my-5" data-bs-ride="carousel" style="box-shadow: 0 0px 25px;">
    <div class="carousel-indicators">
        {#each movies as movie}
            {#if true === movie.active}
                <button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="{movie.index}" class="active" aria-label="Movie slider {movie.title}"></button>
            {:else}
                <button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="{movie.index}" aria-label="Movie slider {movie.title}"></button>
            {/if}
        {/each}
    </div>

    <div class="carousel-inner">
        <div class="mt-5" style="height: 40rem; margin-inline: 15%;">

            {#each movies as movie, i}

                <div class="carousel-item {movie.active ? 'active' : ''}" style="transition: 1.2s ease;">
                    <div class="d-flex flex-md-row flex-column w-100">
                        <div class="ms-3 mb-2 d-flex flex-column align-items-center">
                            <img
                                src="{movie.poster}"
                                alt="{movie.title} poster"
                                class="rounded col-3 align-self-center align-self-md-left mb-md-0 ms-md-3"
                                style="width: 200px; height: 320px; object-fit: cover; box-shadow: 0 0 15px black;"
                            />

                            <h2 class="m-0 px-3 mt-4" style="width: fit-content;">⭐ {movie.rating} / 10</h2>

                        </div>
                            <!-- class="d-block my-auto py-4 mx-auto mx-md-5" -->
                            <!-- style="max-height: 25rem; margin-left: 10%" -->

                        <div class="px-4">
                            <div>
                                <h2>{movie.title}</h2>
                                <div class="d-flex gap-4 mt-2">
                                    <p
                                        class="rounded-pill px-2 py-1 fw-bolder text-white"
                                        style="background: var(--accent); font-size: 0.75rem; width:fit-content; height:fit-content"
                                    >
                                        {movie.ageRating}
                                    </p>
                                    <p class="fs-5">
                                        {movie.runtime}
                                    </p>
                                </div>
                            </div>
                            <p>{movie.description}</p>
                        </div>
                    </div>
                </div>
                
            {/each}

        </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev" style="box-shadow: 5px 0 15px -5px;">
        <span class="carousel-control-prev-icon" aria-hidden="true" alt="Previous"></span>
<!-- prevents werning about no content -->
        <span class="visually-hidden">Previous</span>
    </button>
    
    <button class="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next" style="box-shadow: -5px 0 15px -5px;">
        <span class="carousel-control-next-icon text-danger" aria-hidden="true"></span>
<!-- prevents werning about no content -->
        <span class="visually-hidden">Next</span>
    </button>
</div>

<style>
    .carousel-control-prev {
        opacity: 100%;
        transition: 0.6s ease;
        background-color: #444;
        filter: none;
    }
    .carousel-control-next {
        opacity: 100%;
        transition: 0.6s ease;
        background-color: #444;
        filter: none;
    }


    .carousel-control-prev:hover {
        transition: 0.6s ease;
        background-color: #242424;
        filter: none;
    }
    .carousel-control-next:hover {
        transition: 0.6s ease;
        background-color: #242424;
        filter: none;
    }

</style>