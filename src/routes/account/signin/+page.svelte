<script>

    let signed_in = $state(false);

    async function signin() {
        const username = "Glen"
        const password = "hashed"
        const data = await fetch("/account/signin",
            {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type" : "application/json"
        }});
        if (200 === data.status)
        { signed_in = true }
    }
</script>

{#if signed_in}
<a href="/"><h2>You are signed in, go home?</h2></a>
{:else}
<button type="button" onclick={signin}>signin</button>
{/if}
