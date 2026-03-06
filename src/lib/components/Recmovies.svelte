<script>
    // Maybe make logic to personalise movies
    // TODO
        // Make a recommended DB for easy modifycation
        // Make it a recommended element not a recommended movie element.
    let { recMovies } = $props();

    const poster = import.meta.glob(['$lib/assets/movie_poster/**.jpeg', '$lib/assets/movie_poster/**.webp'], {eager : true, query: "?url", import: "default"});
    const noPoster = "no_poster_found.webp";

</script>

<!-- Made with the help of documentation -->
<!-- https://getbootstrap.com/docs/5.0/components/carousel/ -->

<div id="movieCarousel" class="carousel slide RM-BKB" data-bs-ride="carousel">
    <div class="carousel-indicators">
        {#each recMovies as movie}
            {#if true === movie.active}
                <button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="{movie.ID}" class="active" aria-label="Movie slider {movie.name}"></button>
            {:else}
                <button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="{movie.ID}" aria-label="Movie slider {movie.name}"></button>
            {/if}
        {/each}
    </div>

    <div class="carousel-inner">
        <div class="mt-5" style="height: 40rem; margin-inline: 10%;">
            {#each recMovies as movie, i}
                {#if poster['/src/lib/assets/movie_poster/' + movie.poster] === undefined}

                    <div class="carousel-item {movie.active ? 'active' : ''}">
                        <div class="d-flex flex-md-row flex-column w-100">
                            <img class="d-block my-auto py-4 mx-auto mx-md-5" style="max-height: 25rem; margin-left: 10%" src={poster['/src/lib/assets/movie_poster/' + noPoster]} alt='promotional poster {movie.name}'>
                            <div class="px-5 my-md-5">
                                <h2>{movie.name}</h2>
                                <p>{movie.description}</p>
                            </div>
                        </div>
                    </div>

                {:else}

                    <div class="carousel-item {movie.active ? 'active' : ''}">
                        <div class="d-flex flex-md-row flex-column w-100">
                            <img class="d-block my-auto py-4 mx-auto mx-md-5" style="max-height: 25rem;" src={poster['/src/lib/assets/movie_poster/' + movie.poster]} alt='promotional poster {movie.name}'>
                            <div class="p-3 px-5">
                                <h2>{movie.name}</h2>
                                <p>{movie.description}</p>
                            </div>
                        </div>
                    </div>

                {/if}
            {/each}
        </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon " aria-hidden="true" alt="Previous"></span>
<!-- prevents werning about no content -->
        <span class="visually-hidden">Previous</span>
    </button>
    
    <button class="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon text-danger" aria-hidden="true"></span>
<!-- prevents werning about no content -->
        <span class="visually-hidden">Next</span>
    </button>
</div>