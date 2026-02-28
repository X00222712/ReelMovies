<script>
    // Maybe make logic to personalise movies
    // TODO
        // Make a recommended DB for easy modifycation
        // Make it a recommended element not a recommended movie element.
    let rec_movies = [
        {ID : 0, active : true, poster : "SpiderMan.jpeg", name : "Spider Man", description : "Peter parker gets biten by a spider and becomes spider man, a hero"},
        {ID : 1, active : false, poster : "Lorax", name : "The lorax", description : "The lorax is a movie about saving the enviorment. A young boy wonders from the city to an old run down house where he hears stories about how trees were everywhere, the mysterious man has more then just stories for the boy..."},
        {ID : 2, active : false, poster : "NONE", name : "NONE", description : "NONE"},
        {ID : 3, active : false, poster : "SpiderMan.jpeg", name : "Some filler information", description : "Need to make a proper DB or data."}
    ]
    const poster = import.meta.glob(['$lib/assets/movie_poster/**.jpeg', '$lib/assets/movie_poster/**.webp'], {eager : true, query: "?url", import: "default"});
    const noPoster = "no_poster_found.webp";

</script>

<!-- Made with the help of documentation -->
<!-- https://getbootstrap.com/docs/5.0/components/carousel/ -->

<div id="movieCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        {#each rec_movies as movie}
            {#if true === movie.active}
                <button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="{movie.ID}" class="active" aria-label="Movie slider {movie.name}"></button>
            {:else}
                <button type="button" data-bs-target="#movieCarousel" data-bs-slide-to="{movie.ID}" aria-label="Movie slider {movie.name}"></button>
            {/if}
        {/each}
    </div>

    <div class="carousel-inner">
        {#each rec_movies as movie, i}
            {#if poster['/src/lib/assets/movie_poster/' + movie.poster] === undefined}

                <div class="carousel-item {movie.active ? 'active' : ''}">
                    <div class="d-flex bg-primary w-100" style="height: 32rem;">
                        <img class="d-block my-auto" style="max-height: 25rem; margin-left: 10%" src={poster['/src/lib/assets/movie_poster/' + noPoster]} alt='promotional poster {movie.name}'>
                        <div class="m-5">
                            <h2>{movie.name}</h2>
                            <p>{movie.description}</p>
                        </div>
                    </div>
                </div>

            {:else}

                <div class="carousel-item {movie.active ? 'active' : ''}">
                    <div class="d-flex bg-primary w-100" style="height : 32rem">
                        <img class="d-block my-auto" style="max-height: 25rem; margin-left: 10%" src={poster['/src/lib/assets/movie_poster/' + movie.poster]} alt='promotional poster {movie.name}'>
                        <div class="m-5">
                            <h2>{movie.name}</h2>
                            <p>{movie.description}</p>
                        </div>
                    </div>
                </div>

            {/if}
        {/each}
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