<script>
    let { data, form } = $props();
    const user = data.user
    const signedIn = data.signedIn;
    console.log(user)
</script>

<div>
    {#if signedIn}

        <div class="mx-2 d-flex justify-content-between align-items-center">
            <h2 class="m-3">Welcome <strong><i>{user.name}</i></strong></h2>
            <form  method="post" action="/account/signout">
                <button class="btn btn-danger m-2" type="submit" id>sign out</button>
            </form>
        </div>

        <div class="m-5">
            <h3><strong>User details</strong></h3>
            <p class="ms-3">
                <strong>Usename</strong> : {user.name}
            </p>
            <p class="ms-3">
                <strong>Email</strong> : {user.email}
            </p>
        </div>


        <div class="w-100 mx-auto d-block d-md-flex justify-content-center row">

            <form class="col-12 col-md-4 col-lg-3 form-style" method="post" action="?/changePW" style="box-shadow: 0 0 25px;">

                {#if "pw" === form?.for}
                    <p class="fw-bold fs-5 text-danger text-center">{form.message}</p>
                {/if}

                <label class="fs-4 fw-bold" for="password">change password</label>
                <input class="rounded-3 px-2 w-75 mx-auto" type="password" name="password" id="password" placeholder="current password"/>
                <input class="rounded-3 px-2 w-75 mx-auto" type="password" name="newPassword" id="newPassword" placeholder="New Password"/>
                <input class="rounded-3 px-2 w-75 mx-auto" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"/>

                <button class="btn btn-success m-2" type="submit" id="change password" style="width: fit-content;">change password</button>
            </form>


            <form class="col-12 col-md-4 col-lg-3 form-style" method="post" action="?/changeUN" style="box-shadow: 0 0 25px;">
                {#if "un" === form?.for}
                    <p class="fw-bold fs-5 text-danger text-center">{form.message}</p>
                {/if}
                <label class="fs-4 fw-bold" for="newUsername">change username</label>
                <input class="rounded-3 px-2 w-75 mx-auto" name="newUsername" id="newUsername" placeholder="New Username"/>
                <button class="btn btn-success m-2" type="submit" style="width: fit-content;">change username</button>
            </form>


            <form class="col-12 col-md-4 col-lg-3 form-style" method="post" action="?/changeEmail" style="box-shadow: 0 0 25px;">
                {#if "em" === form?.for}
                    <p class="fw-bold fs-5 text-danger text-center">{form.message}</p>
                {/if}
                <label class="fs-4 fw-bold" for="newEmail">change Email</label>
                <input class="rounded-3 px-2 w-75 mx-auto" name="newEmail" id="newEmail" placeholder="New Email"/>
                <input class="rounded-3 px-2 w-75 mx-auto" type="password" name="password" id="password" placeholder="Current Password"/>
                <button class="btn btn-success m-2" type="submit" style="width: fit-content;">change username</button>
            </form>


            <form class="col-12 col-md-4 col-lg-3 form-style" method="post" action="?/deleteUser" style="box-shadow: 0 0 25px;">
                {#if "de" === form?.for}
                    <p class="fw-bold fs-5 text-danger text-center">{form.message}</p>
                {/if}
                <label class="fs-4 fw-bold" for="deleteUser">Delete account</label>
                <input class="rounded-3 px-2 w-75 mx-auto" type="password" name="password" id="password" placeholder="Current Password"/>
                <button class="btn btn-danger m-2" type="submit" id="deleteUser" style="width: fit-content;">Delete account</button>
            </form>
        </div>

        <a href="/tests">
            <h1>Tests</h1>
        </a>

    {:else}

        <div class="p-4 d-flex d-flex justify-content-between">
            <a href="/"><h2>You are signed out, go home?</h2></a>
            <div class="me-2 my-auto">
                <a href="/account/signup"><button type="button" class="btn btn-dark me-3 my-auto">Sign up</button></a>
                <a href="/account/signin"><button type="button" class="btn" style="background-color: #70d6ff;">Sign In</button></a>
            </div>
        </div>


    {/if}
</div>

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