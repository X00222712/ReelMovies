<script>
    import Recmovies from "$lib/components/Recmovies.svelte";
    import Toprewards from "$lib/components/Toprewards.svelte";

    let { data } = $props();
    // Cookie
    let userToken = $state(data.userToken);
    // Data
    let userData = data.userData;
    let recMovies = data.recMovies;
    let rewardItems = data.rewards;
</script>

<div class="p-2 RM-BKG">

    <!-- Greetings -->
    <div class="d-flex justify-content-between">
        <h2 class="m-3">Welcome {userData.username}</h2>
        
        {#if null === userToken || "null" == userToken}
            <div class="me-2 my-auto">
                <a href="/account/signup"><button type="button" class="btn btn-dark me-3 my-auto">Sign up</button></a>
                <a href="/account/signin"><button type="button" class="btn" style="background-color: #70d6ff;">Sign In</button></a>
            </div>
        {/if}
    </div>

    {#if null === userToken || "null" == userToken}
        <!-- Rewards advertising -->
        <div class="ms-4">
            <h3>Don't have an account?</h3>
            <p class="ms-3">Don't worry ... Some filler content</p>
        </div>
    {:else}
        <!-- Reward points -->
        <div class="ms-4 mb-5">
            <div class="d-flex justify-content-between flex-column flex-md-row">
                <p class="fs-5 ms-3">Have you considered using your reward points?</p>
                <h3 class="me-5">You have <strong>{userData.RMPoints}RM</strong> points</h3>
            </div>
            <Toprewards { rewardItems } { userToken }/>
        </div>
        <!-- Deals by manager -->
    {/if}
</div>

<Recmovies { recMovies }/>
