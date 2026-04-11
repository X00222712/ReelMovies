<script>
    let { data, form } = $props();
    const user = data.user
</script>


<div>
    <div class="mx-2 d-flex justify-content-between align-items-center">
        <h2 class="m-3">Welcome <strong><i>{user.name}</i></strong></h2>
        <form  method="post" action="/auth/signout">
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
    
    {#if user?.admin}
        <div class="row col-md d-flex flex-wrap justify-content-between gap-4 gap-md-0 mx-1 py-3">
            
            <a class="text-decoration-none text-black col-12 col-md-4 col-lg-3" href="/admin-panel">
                <div class="text-center admin-panel-item border border-dark border-2 rounded w-100 h-100">
                    <p class="m-0 fw-bold fs-3">Control Panel</p>
                </div>
            </a>

            <a class="text-decoration-none text-black col-12 col-md-4 col-lg-3" href="#">
                <div class="text-center admin-panel-item border border-dark border-2 rounded w-100 h-100">
                    <p class="m-0 fw-bold fs-3">N/A</p>
                </div>
            </a>


            <a class="text-decoration-none text-black col-12 col-md-4 col-lg-3" href="/tests">
                <div class="text-center admin-panel-item border border-dark border-2 rounded w-100 h-100">
                    <p class="m-0 fw-bold fs-3">Tests</p>
                </div>
            </a>
        </div>
    {/if}

    <div class="w-100 mx-auto d-block d-md-flex justify-content-center row">

        <form class="col-12 col-md-4 col-lg-3 form-style" method="post" action="?/changePW" style="box-shadow: 0 0 25px;">

            {#if "pw" === form?.for}
                <p class="fw-bold fs-5 text-center {form?.good ? 'text-success' : 'text-danger'}">{form.message}</p>
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

    .admin-panel-item {
        transition: 0.3s ease;
        box-shadow: 0 -5px 15px 5px #97c7ff
    }
    .admin-panel-item:hover {
        transform: translateY(-3px);
        scale: 101%;
        box-shadow: 0 5px 18px 7px #8198ff
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