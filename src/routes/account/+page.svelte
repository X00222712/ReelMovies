<script>
    let { data } = $props();
    let signedIn = $state(data.signedIn);
</script>

{#if signedIn}

    <div class="d-flex justify-content-end">
        <form  method="post" action="?/signout">
            <button class="btn btn-secondary m-2" type="submit" id>sign out</button>
        </form>
    </div>


    <div class="d-block d-md-flex justify-content-between">

        <form class="form-style" method="post" action="?/changePW" style="box-shadow: 0 0 25px;">
            <label class="fs-4 fw-bold" for="password">change password</label>
            <input class="rounded-3 px-2 w-75 ms-4" name="password" id="password" placeholder="current password"/>
            <input class="rounded-3 px-2 w-75 ms-4" name="confirmPassword" id="confirmPassword" placeholder="confirm password"/>

            <button class="btn btn-success m-2" type="submit" id="change password" style="width: fit-content;">change password</button>
        </form>


        <form class="form-style" method="post" action="?/changeUN" style="box-shadow: 0 0 25px;">
            <label class="fs-4 fw-bold" for="change username">change username</label>
            <input class="rounded-3 px-2 w-75 ms-4" name="newUsername" id="newUsername" placeholder="New Username"/>
            <input class="rounded-3 px-2 w-75 ms-4" name="password" id="password" placeholder="Current Password"/>
            <button class="btn btn-success m-2" type="submit" id="change password" style="width: fit-content;">change username</button>
        </form>


        <form class="form-style" method="post" action="?/changeUN" style="box-shadow: 0 0 25px;">
            <label class="fs-4 fw-bold" for="change username">Delete account</label>
            <input class="rounded-3 px-2 w-75 ms-4" name="password" id="password" placeholder="Current Password"/>
            <button class="btn btn-danger m-2" type="submit" id="change password" style="width: fit-content;">Delete account</button>
        </form>
    </div>

{:else}


    <a href="/"><h2>You are signed out, go home?</h2></a>


{/if}

<style>

    .form-style {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;

        border-radius: 0.6rem;

        margin: 2rem;
        padding: 3rem;

        }

    @media (max-width: 768px)
    {
        .form-style {
            padding-inline: 0;
            margin: 3rem;
            margin-inline: 0;
            width: 100%;
        }
    }

</style>