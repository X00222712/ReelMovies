<script>
	import { enhance } from '$app/forms';
    import { redirect } from "@sveltejs/kit";

    let { data, form } = $props();

</script>

<div>
    <form class="rounded-4 w-75 mx-auto my-5 text-center" method="post" action="?/signup" style="box-shadow: 0 0 25px;">
        <h2 class="py-3">Sign up for ReelMovies</h2>

        {#if form?.error && form != null}
                    <strong><p class="text-warning fs-5">{form?.status}</p></strong>
        {/if}
        <div class="form-group d-flex flex-column mx-3 align-items-center">
            <input
                class="form-control my-3"
                type="text" 
                placeholder="Username"
                name="username" 
                id="username"
                autocomplete="off"
                required
                style="box-shadow: 0 0 5px;"
            />
            <input
                class="form-control my-3"
                type="email" 
                placeholder="Email"
                name="email" 
                id="email"
                autocomplete="off"
                required
                style="box-shadow: 0 0 5px;"
            />
            <input
                class="form-control my-3"
                type="text"
                placeholder="Password"
                name="password"
                id="password"
                autocomplete="off"
                required
                style="box-shadow: 0 0 5px;"
            />
            <input
                class="form-control my-3"
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
                autocomplete="off"
                required
                style="box-shadow: 0 0 5px;"
            />

            <div class="d-flex flex-column align-items-center w-100" style="max-width: 250px;">
                <button class="btn btn-success w-75 my-3" type="submit">Create account</button>
                
                <a style="color: aliceblue; text-decoration: none;" href="/account/signin" class="w-100">
                    <button class="btn btn-secondary my-3">
                        Sign In
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

