<script>
	import { enhance } from '$app/forms';
    let { data, form } = $props();
    let signedIn = $state(false);

</script>

<div>
    <form class="rounded-4 w-75 mx-auto my-5 text-center" method="post" action="?/signin" style="box-shadow: 0 0 25px;">
        <h2 class="py-3">Sign into ReelMovies</h2>

        {console.log("FORM DATA", form)}
        {#if form?.error}
            <strong><p class="text-danger fs-5">{form.message}</p></strong>
        {/if}
        <div class="form-group d-flex flex-column align-items-center">
            <input
                class="form-control my-2"
                type="email" 
                placeholder="Email"
                name="email" 
                id="username"
                autocomplete="on"
                required
                style="box-shadow: 0 0 5px;"
            />
            <input
                class="form-control my-5"
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                autocomplete="off"
                required
                style="box-shadow: 0 0 5px;"
            />

            <div class="d-flex flex-column w-100 align-items-center">
                <button class="btn btn-success my-3 w-75" type="submit">Sign in</button>
                <a style="color: aliceblue; text-decoration: none;" href="/account/signup" class="w-100">
                    <button class="btn btn-secondary my-3">
                        Create new account
                    </button>
                </a>
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

