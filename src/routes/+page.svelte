<script>
    import Recmovies from "$lib/compents/Recmovies.svelte";

    // TODO
        // Make a DB so this is dynamic
    let user_content = {
        username : "Guest",
        signin_token : null
    }
</script>

<div class="p-2 RM-BKG">

    <!-- Greetings -->
    <div class="d-flex justify-content-between">
        <h2 class="m-0 p-3">Welcome {user_content.username}</h2>
        {#if null === user_content.signin_token}
            <div class="me-2 my-auto">
                <button type="button" class="btn btn-dark me-3 my-auto">Sign up</button>
                <button type="button" class="btn" style="background-color: #70d6ff;">Sign In</button>
            </div>
        {/if}
    </div>
</div>

<Recmovies/>

