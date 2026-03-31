<script>
    import Recmovies from "$lib/components/Recmovies.svelte";
    import Toprewards from "$lib/components/Toprewards.svelte";

    let { data } = $props();
    // Data
    let userData = data.userData;
    let logged = userData.logged;
    let RMPoints = userData.RMPoints;

    let rewardItems = data.rewards;
</script>

<div class="p-2">

    <!-- Greetings -->
    <div class="d-flex justify-content-between">
        <h2 class="m-3">Welcome {userData.username}</h2>
        
        {#if !logged}
            <div class="me-2 my-auto">
                <a href="/account/signup"><button type="button" class="btn btn-dark me-3 my-auto">Sign up</button></a>
                <a href="/account/signin"><button type="button" class="btn" style="background-color: #70d6ff;">Sign In</button></a>
            </div>
        {/if}
    </div>

    {#if !logged}
        <!-- Rewards advertising -->
        <div class="mx-5 my-3 p-2 rounded" style="box-shadow: 0 0 15px;">
            <h3>Don't have an account?</h3>
            <p class="ms-2 m-0"><a href="/account/signup" alt="Signup" style="text-decoration: none;">Sign up</a> now to get exclusive deals, Reel Movie reward points and easier booking management!</p>
            <p class="ms-2">Discover our movies and menu with <strong>reel</strong> good deals today.</p>
        </div>
    {:else}
        <!-- Reward points -->
        <div class="ms-4 mb-5">
            <div class="d-flex justify-content-between flex-column flex-md-row">
                <p class="fs-5 ms-3">Have you considered using your reward points?</p>
                <h3 class="me-5">You have <strong>{userData.RMPoints}RM</strong> points</h3>
            </div>
            <Toprewards { rewardItems }/>
        </div>
        <!-- Deals by manager -->
    {/if}
</div>

<Recmovies/>
