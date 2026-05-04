<!-- Author : Glen J -->


<script>
    let { data } = $props();
    const bookings = data.bookings

</script>


<div class="my-5 mx-4">

    <h1>Your Bookings</h1>

    <div>
        {#if bookings.length}
            <!--  -->
            {#each bookings as booking}

                <div class="mt-5 d-md-flex gap-4">
                    <div class="pb-5 pb-md-0 col-md-5 text-center">
                        <h3>{booking.movie.title}</h3>
                        <img class="col-8" src={booking.movie.poster} alt="{booking.movie.title} movie poster"/>
                    </div>

                    <div class="mx-4 mx-md-0 col-md-5">
                        <i><p class="m-0 fw-bold text-decoration-underline">Screen {booking.screening.screenId}</p></i>
                        <p class="m-2 mb-4">
                            {booking.screening.data.replaceAll("-", "/",)}
                            
                            at <strong>{booking.screening.time}</strong>
                        </p>

                        <h2>Seating at</h2>
                        <div class="py-2 px-4 d-flex flex-wrap">
                            {#each JSON.parse(booking.booking.seats) as seat}
                                <a href="/movies/viewscreeening?screening={booking.screening.id}"><p class="mx-1 m-0 btn btn-dark"> {seat}</p></a>
                            {/each}
                        </div>

                        <div class="mt-5 pt-5">
                            <i><h2 class="fw-bold">Billing information</h2></i>

                            <p class="m-0 ms-2 fs-5">Purchase method <strong class="text-decoration-underline">{booking.booking.paymentMethod}</strong></p>
                            <p class="m-0 ms-2 fs-5">Total : &euro;{booking.booking.price}</p>
                        </div>

                    </div>
                </div>

            {/each}

        {:else}
            <h2>You have no bookings</h2>
        {/if}

    </div>

</div>