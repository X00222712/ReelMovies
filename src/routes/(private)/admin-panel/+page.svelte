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

        <div class="mx-auto" style="width: fit-content;">
            <button class="btn bi bi-arrow-left" type="submit" value={lastId} onclick={updatePage}>
                    <span class="visually-hidden">prev</span>
            </button>
            <button class="btn bi bi-arrow-right" type="submit" value={nextId} onclick={updatePage}>
                    <span class="visually-hidden">next</span>
            </button>
        </div>

        <!-- CUD -->
        <div class="d-block d-md-flex flex-wrap gap-4 justify-content-between mx-3">
            <!-- Create -->
            <div class="col-12 col-md-5 col-lg-3 mx-1 my-4 my-md-0">
                <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">

                    <h3 class="text-center">Create account</h3>
                    <div class="d-flex flex-column justify-content-center">


                        <div>
                            {#if form?.newUser.error}
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

                            <div class="createUserForm mx-auto d-flex flex-row gap-4">
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

            <div class="col-12 col-md-5 col-lg-4 mx-1 my-4 my-md-0">
                <div class="w-100 p-4" style="box-shadow: 0 0 5px 2px black;">
                    
                    <h3 class="text-center">Edit account</h3>

                    <div>

                        <div>
                            {#if form?.edits.error}
                            <div class="col-12 col-md-6 mx-auto">
                                <div class="text-center border border-danger border-3 mx-auto">
                                    <p class="m-2">{form?.edits.message}</p>
                                </div>
                            </div>
                            {/if}
                        </div>

                        <form action="?/editAccounut">
                            <input type="text" placeholder="email address">

                            <div class="my-3">
                                <div>
                                    <input type="checkbox" name="" id="">
                                    <label for="">Change password</label>
                                </div>
                                <input type="number" placeholder="New password">
                            </div>

                            <div class="my-3">
                                <div>
                                    <input type="checkbox" name="" id="">
                                    <label for="">Reel points</label>
                                </div>
                                <input type="number" placeholder="Amount">
                            </div>

                            <button class="btn btn-warning m-2" type="submit">Edit account</button>

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
                            {#if form?.edits.error}
                            <div class="col-12 col-md-6 mx-auto">
                                <div class="text-center border border-danger border-3 mx-auto">
                                    <p class="m-2">{form?.edits.message}</p>
                                </div>
                            </div>
                            {/if}
                        </div>

                        <form action="?/deleteAccount">
                        
                            <div>
                                <input type="text" placeholder="email">
                            </div>

                            <button class="btn btn-danger m-2" type="submit">Delete accountn</button>

                        </form>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>


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