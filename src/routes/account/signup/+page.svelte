<script>
	import { enhance } from '$app/forms';

    let { data, form } = $props();
    let signedIn = $state(false);
</script>

<div>
    <form class="mx-5 my-5 text-center" method="post" action="?/signup">
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

            <div class="d-flex w-100 flex-column align-items-center">
                <button class="btn btn-primary w-50 my-3" type="submit">Create account</button>
                <a href="/account/signin" class="w-50 mt-3"><button class="btn btn-primary">Sign In</button></a>
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

