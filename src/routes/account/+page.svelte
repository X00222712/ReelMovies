<script>
    let { data } = $props();
    let signedIn = $state(data.signedIn);
</script>

{#if signedIn}
    <form  method="post" action="?/signout">
        <button type="submit">sign out</button>
    </form>
{:else}
    <a href="/"><h2>You are signed out, go home?</h2></a>
{/if}