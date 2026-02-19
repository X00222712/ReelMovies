<script>
    // Maybe make logic to personalise movies
    // TODO
        // Make a recommended DB for easy modifycation
    let movies = [
        {ID : 0, poster : "SpiderMan.jpeg", name : "Spider Man", description : "Peter parker gets biten by a spider and becomes spider man, a hero"},
        {ID : 1, poster : ".", name : ".", description : "..."},
        {ID : 2, poster : ".", name : ".", description : "..."},
        {ID : 3, poster : ".", name : ".", description : "..."}
    ]
    const poster = import.meta.glob(['$lib/assets/movie_poster/**.jpeg', '$lib/assets/movie_poster/**.webp'], {eager : true, query: "?url", import: "default"});
    const noPoster = "no_poster_found.webp";

</script>

<div style="height: 5em;">
    <!-- Outer container to scroll through all movies -->
    <div class="row d-flex flex-row">
        {#each movies as movie}
            <div class="card bg-dark text-white p-3 col-sm-12 col-md-6 col-lg-4" style="border : 2px solid cyan; border-radius: 1rem;">
                <div class="d-flex justify-content-center my-2">
                    {#if poster['/src/lib/assets/movie_poster/' + movie.poster] != null}
                        <a href="/movie/{movie.name}"><img class="mx-4" style="max-height: 25rem;" src={poster['/src/lib/assets/movie_poster/' + movie.poster]} alt="{movie.name} promotional poster"></a>
                    {:else}
                        <a href="/movie/{movie.name}"><img class="mx-4" style="max-height: 25rem;" src={poster['/src/lib/assets/movie_poster/' + noPoster]} alt="No poster found"></a>
                    {/if}
                </div>
                <div class="mx-2">
                    <h1>{movie.name}</h1>
                    <p>{movie.description}</p>
                </div>
            </div>
    {/each}

    </div>

</div>