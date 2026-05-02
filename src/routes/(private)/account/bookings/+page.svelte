<script>

    let { data } = $props();

    const bookings = data.bookings

</script>


<div class="my-5 mx-4">

    <h1>Your Bookings</h1>

    <div>

        <!--  -->
        {#each bookings as booking}
            <div>
                ...
            </div>
        {/each}

    </div>

</div>