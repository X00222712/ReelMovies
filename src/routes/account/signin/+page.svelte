<script>
	import { enhance } from '$app/forms';


    let { data, form } = $props();
    let signedIn = $state(false);

    async function signin() {
        const username = "Glen"
        const password = "Hashed"
        const data = await fetch("/account/signin",
            {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type" : "application/json"
        }});
        if (200 === data.status)
        { signedIn = true }
    }
</script>

<div>
    <form class="mx-5 my-5" method="post" action="?/signin">
        <h2 class="py-3 text-center">Sign in</h2>

        {#if 200 != form?.status && form != null}
                    <strong><p class="text-danger fs-5">Username or password incorrect</p></strong>
        {/if}
        <div class="form-group d-flex flex-column mx-3 align-items-center">
            <input
                class="form-control my-2"
                type="text" 
                placeholder="Username"
                name="username" 
                id="username"
                autocomplete="off"
                required
            />
            <input
                class="form-control my-5"
                type="text"
                placeholder="Password"
                name="password"
                id="password"
                autocomplete="off"
                required
            />

            <button class="btn btn-primary my-3" type="submit">Login</button>
        </div>
    </form>
</div>

<style>
    input {
        border: 0px;
        border-bottom: 3px solid #0000AA;
        width: 50%;
    }
    button {
        margin-inline: 10%;
        width: 30%;
    }

    @media (max-width: 576px) {
        input {
            border: 0px;
            border-bottom: 3px solid #0000AA;
            width: 100%;
        }
    }
</style>

