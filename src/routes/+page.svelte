<script>
    import Recmovies from "$lib/compents/Recmovies.svelte";
    import Toprewards from "$lib/compents/Toprewards.svelte";

    let { data } = $props();
    let userData = data.userData;
    let userToken = userData.signinToken;
    let recMovies = data.recMovies;
    let rewardItems = data.rewards;

</script>

<div class="p-2 RM-BKG">

    <!-- Greetings -->
    <div class="d-flex justify-content-between pb-5">
        <h2 class="m-3">Welcome {userData.username}</h2>
        
        {#if null === userToken}
            <div class="me-2 my-auto">
                <button type="button" class="btn btn-dark me-3 my-auto">Sign up</button>
                <button type="button" class="btn" style="background-color: #70d6ff;">Sign In</button>
            </div>
        {/if}
    </div>

    {#if null === userToken}
        <!-- Rewards advertising -->
        <div class="ms-4">
            <h3>Don't have an account?</h3>
            <p class="ms-3">Don't worry ... Some filler content</p>
        </div>
    {:else}
        <!-- Reward points -->
        <div class="ms-4">
            <h3>Rewards</h3>
            <p>Have you considered using your reward points?</p>
            <p>You have {userData.RMP}RM points</p>
            <Toprewards { rewardItems } { userToken }/>
        </div>
        <!-- Deals by manager -->
    {/if}
</div>

<Recmovies { recMovies }/>
