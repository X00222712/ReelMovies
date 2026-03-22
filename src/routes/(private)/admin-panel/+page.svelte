<script>

    const {data} = $props()

    const userInfo = data.users
    // If 1 in pageId then the page starts at 1
    let pageId = $state(1)
    // If 9 in nextId then the next arrow goes to pageId 9
    let nextId = $state(1)
    // If 1 in lastId then the prev arrow goes to pageId 1
    let lastId = $state(1)

    function updatePage(event) {
        
    }

</script>


<div class="m-3">

    <h1>Control panel</h1>

    <div>
    
        <div>
            {#each userInfo as user}

                {console.log(user)}

                <div class="my-3">
                <!-- Profile -->
                    <div class="d-flex gap-2">
                        <div class="mx-2 text-center" style="width: 50px;">
                            <i class="bi bi-person-circle"></i>
                            <p class="m-0">{user?.name}</p>
                        </div>

                        <div>
                            <p class="m-0">{user?.email}</p>
                            <p class="m-0">{user?.RMPoints}RM</p>
                        </div>
                    </div>

                    <div class="d-flex gap-2">
                        {#if user?.admin}
                            <p class=" m-0 text-center col-2 bg-info rounded-pill">Admin</p>
                            {#if user?.privilage}
                                <p class="m-0 text-center col-2 bg-info rounded-pill">Privilaged</p>
                            {/if}
                        {/if}
                    </div>
                </div>
                
            {/each}
        </div>
        
        <form class="mx-auto" style="width: fit-content;" action="?/getUserPage">
        <input type="hidden" value={pageId}>
        <button class="btn" type="button">
            <i class="bi bi-arrow-left">
                <span class="visually-hidden">prev</span>
            </i>
        </button>
        <button class="btn" type="button">
            <i class="bi bi-arrow-right">
                <span class="visually-hidden">next</span>
            </i>
        </button>
        </form>
    </div>

</div>