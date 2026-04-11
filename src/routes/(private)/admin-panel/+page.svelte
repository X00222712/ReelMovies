<!--
Author : Glen Johnston
Create : 23 / Mar / 2026

Description

Admin panel front end for CRUD of different features
-->

<script>
	import { getEnvVar } from 'better-auth';
	import { json } from 'zod';


    const {data, form} = $props()

    let userInfo = $state(data.users)
    const failed = data?.failed

    // If 9 in nextId then the next arrow goes to pageId 9
    let nextId = $state(3)
    // If 1 in lastId then the prev arrow goes to pageId 1
    let lastId = $state(-1)

    async function updatePage(event) {
        console.log(event.target.value ?? 1)
        const response = await fetch(`/admin-panel?type=users&values=${event.target.value ?? 1}`, {
            method : "GET",
        })

        const data = await response.json()
        userInfo = data.users
        lastId = data.lastpage
        nextId = data.nextpage

    }

</script>

{#if failed.status}

<!-- Show an error for more information -->
    <div class="w-75 mx-auto my-5">

        <h1 class="text-danger">FAILED</h1>
        <p class="px-2">{failed}</p>

    </div>

{:else}

    <div class="m-3">
        <div class="p-2 my-4 border border-3 border-dark">
            <h2>Users</h2>

            <!-- User read -->
            {#each userInfo as user}

                <div class="my-3 p-1 py-3" style="box-shadow: 0 0 5px 2px black;">
                <!-- Profile -->
                    <div class="d-flex gap-2 m-2">
                        <div class="col-2 col-md-1 mx-2 text-center">
                            <i class="bi bi-person-circle"></i>
                            <p>{user?.name}</p>
                        </div>

                        <div class="col-10 col-md-11">
                            <p class="m-0">{user?.email}</p>
                            <p class="m-0">{user?.RMPoints ?? 0}RM</p>
                        </div>
                    </div>

                    <div class="d-flex gap-2 mx-3">
                        <p class="px-2 text-center bg-danger rounded-pill">ID : {user?.id}</p>
                        {#if user?.admin}
                            <p class=" px-2 text-center bg-info rounded-pill">Admin</p>
                            {#if user?.privilage}
                                <p class="px-2 text-center bg-info rounded-pill">Privilaged</p>
                            {/if}
                        {/if}
                    </div>
                </div>
                
            {/each}

            <!-- Scroll users -->
            <div class="mx-auto d-flex" style="width: fit-content;">
            <!-- Previous -->
                <div class="text-center">
                    <button class="btn bi bi-arrow-left" type="submit" value={lastId} onclick={updatePage}>
                            <span class="visually-hidden">prev</span>
                    </button>
                    <p>{lastId > 0 ? lastId : "End"}</p>
                </div>

            <!-- Next -->
                <div class="text-center">
                    <button class="btn bi bi-arrow-right" type="submit" value={nextId} onclick={updatePage}>
                            <span class="visually-hidden">next</span>
                    </button>
                    <p>Next</p>
                </div>
            </div>

            <!-- CUD -->
            <div class="d-block d-md-flex flex-wrap gap-4 justify-content-between mx-3">
                <!-- Create -->
                <div class="col-12 col-md-5 col-lg-3 mx-1 my-4 my-md-0">
                    <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">

                        <h3 class="text-center">Create account</h3>
                        <div class="d-flex flex-column justify-content-center">


                            <div>
                                {#if form?.newUser?.error}
                                <div class="col-12 col-md-6 mx-auto">
                                    <div class="text-center border border-danger border-3 mx-auto">
                                        <p class="m-2">{form?.newUser.message}</p>
                                    </div>
                                </div>
                                {/if}
                            </div>

                            <form class="m-3" action="?/createUser" method="post">
                                <div class="createUserForm mx-auto">
                                    <input class="w-100" type="text" name="email" id="email" placeholder="Email address" required="true">
                                </div>

                                <div class="createUserForm mx-auto">
                                    <input class="w-100" type="password" name="password" id="password" placeholder="Password" required="true">
                                </div>

                                <div class="createUserForm mx-auto">
                                    <input class="w-100" type="text" name="username" id="username" placeholder="username" required="true">
                                </div>

                                <div class="createUserForm mx-auto">
                                    <input class="w-100" type="text" name="RM points" id="RM points" placeholder="IT Reel Points" required="true">
                                </div>

                                <div class="createUserForm mx-auto d-flex flex-column flex-sm-row gap-4">
                                    <div>
                                        <input type="checkbox" name="admin" id="admin" >
                                        <label for="admin">Admin</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="privilaged" id="privilaged">
                                        <label for="admin">privilaged</label>
                                    </div>
                                </div>

                                <div class="buttonStyles mx-auto">
                                    <button class="w-100 btn btn-success" type="submit">Create User</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

                <!-- Edit -->
                <div class="col-12 col-md-5 col-lg-4 mx-1 my-4 my-md-0">
                    <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
                        
                        <h3 class="text-center">Edit account</h3>

                        <div>
                    <!-- Error message -->
                            <div>
                                {#if form?.edits?.error || form?.edits?.success}
                                <div class="col-12 col-md-6 mx-auto">
                                    <div class="text-center border {form?.edits?.error ? "border-danger" : "border-warning"} border-3 mx-auto">
                                        <p class="m-2">{form?.edits.message}</p>
                                    </div>
                                </div>
                                {/if}
                            </div>

                            <form action="?/editAccounut" method="POST">
                                <input class="w-100 my-3" type="text" name="email" id="email" placeholder="email address" required>

                                <div class="my-3">
                                    <div>
                                        <input class="mx-1" type="checkbox" name="edit RM" id="edit RM">
                                        <label class="mx-1" for="edit RM">Reel points</label>
                                    </div>
                                    <input class="w-100" type="number" name="RM points" id="RM points" placeholder="Amount">
                                </div>

                                <div>
                                    <div>
                                        <input class="mx-1" type="checkbox" name="edit admin" id="edit admin">
                                        <label class="mx-1" for="edit admin">Edit admins</label>
                                    </div>
                                    <input class="mx-1" type="checkbox" name="admin" id="admin">
                                    <label class="mx-1" for="admin">Admin</label>

                                    <input class="mx-1" type="checkbox" name="privilaged" id="privilaged">
                                    <label class="mx-1" for="privilaged">Privilaged</label>
                                </div>

                                <div class="my-2">
                                    <input class="w-100" type="text" name="admin password" id="admin password" placeholder="Your password" required>
                                </div>

                                <div class="buttonStyles mx-auto">
                                    <button class="w-100 btn btn-warning m-2" type="submit">Edit account</button>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>

                <!-- Delete -->
                <div class="col-12 col-md-5 col-lg-3 mx-1 my-4 my-md-0">
                    <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
                        <h3 class="text-center text-danger">Delete account</h3>
                        <p class="text-danger">Warning - There is no undoing or confirmation</p>

                        <div>

                            <div>
                                {#if form?.deleted?.message}
                                <div class="col-12 col-md-6 mx-auto">
                                    <div class="text-center border border-danger border-3 mx-auto">
                                        <p class="m-2">{form?.deleted.message}</p>
                                    </div>
                                </div>
                                {/if}
                            </div>

                            <form action="?/deleteAccount" method="POST">
                            
                                <div class="my-3">
                                    <input class="w-100" type="text" name="email" id="email" placeholder="email">
                                </div>

                                <div class="my-3">
                                    <input class="w-100" type="text" name="admin password" id="admin password" placeholder="Your password">
                                </div>

                                <div class="buttonStyles mx-auto">
                                    <button class="w-100 btn btn-danger m-2" type="submit">Delete account</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
{/if}


<style>

    .createUserForm {
        width: fit-content;
        margin-block: 8px;
    }

    .buttonStyles {
        width: 60%;
    }

    @media (max-width: 720px)
    {
        .buttonStyles {
            width: 70%;
        }
    }

</style>