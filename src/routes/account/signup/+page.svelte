<script>
	import { enhance } from '$app/forms';

    let { data, form } = $props();
    let signedIn = $state(false);
</script>

<div>
    <form class="rounded-4 w-75 mx-auto my-5 text-center" method="post" action="?/signup" style="box-shadow: 0 0 25px;">
        <h2 class="py-3">Sign up for ReelMovies</h2>

        {#if "TAKEN" === form?.status && form != null}
                    <strong><p class="text-warning fs-5">Username is already taken</p></strong>
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
                style="box-shadow: 0 0 5px;"
            />
            <input
                class="form-control my-5"
                type="text"
                placeholder="Password"
                name="password"
                id="password"
                autocomplete="off"
                required
                style="box-shadow: 0 0 5px;"
            />

            <div class="d-flex flex-column w-100 align-items-center">
                <button class="btn btn-success w-75 my-3" type="submit">Create account</button>
                    <button class="btn btn-secondary my-3">
                        <a style="color: aliceblue; text-decoration: none;" href="/account/signin" class="w-100 my-3">Sign In</a>
                    </button>
            </div>
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
        width: 50%;
    }

    @media (max-width: 576px) {
        input {
            border: 0px;
            border-bottom: 3px solid #0000AA;
            width: 100%;
        }
    }
</style>

