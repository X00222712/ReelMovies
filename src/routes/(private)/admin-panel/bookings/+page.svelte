<!-- Author : Glen J -->

<script>
    import { onMount } from "svelte";
    import ShowBookings from "$lib/components/ShowBookings.svelte";

    let {data, form} = $props()
    let bookings = $state([])

    let searchedEmail = $state(form?.email ?? "")

    async function getBooking( form ) {
        const email = form.target[0].value

        let result = await fetch(
            `?email=${email}`,
            { method: "GET" }
        ).then(
            async response => {
                let res = await response.json()
                bookings = res.bookings ?? []
            }
        )
        searchedEmail = email
    }

    onMount( async () => {
        if (searchedEmail)
            { getBooking({target : [{value : searchedEmail}]}) }
    })

</script>

<div style="height: fit-content;">
    <h2 class="mt-4 mx-5">Search for user bookings</h2>
    <form class="mb-5 mt-3 py-3 d-flex flex-column col-8 mx-auto rounded" style="box-shadow: 0 0 15px 1px white;" onsubmit={getBooking}>
        <div class="text-center m-3">
            <input class="rounded p-1 px-3 w-75" type="email" name="email" id="email" placeholder="User Email">
        </div>
        <button class="mx-auto w-25 btn btn-success text-break" style="height: fit-content;" type="submit">Search</button>
    </form>
</div>

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

                    <!-- Biling -->
                    <div class="mt-5 pt-5">
                        <i><h2 class="fw-bold">Billing information</h2></i>

                        <p class="m-0 ms-2 fs-5">Purchase method <strong class="text-decoration-underline">{booking.booking.paymentMethod}</strong></p>
                        <p class="m-0 ms-2 fs-5">Booking is <strong class="text-decoration-underline"> {booking.booking.paid ? "" : "not"} paid for </strong></p>

                        <p class="m-0 ms-2 fs-5">Price     : &euro;{booking.booking.price}</p>
                        <p class="m-0 ms-2 fs-5">discounts : &euro;{booking.booking.discount}</p>

                        <p class="m-0 ms-2 fs-5">Total     : &euro;{booking.booking.totalPrice}</p>
                    </div>

                </div>
            </div>

            <div class="d-flex flex-column justify-content-center text-center">

                <!-- Edit -->
                <div>

                    <form action="?/editBooking" method="POST" class="mt-4">
                        <!-- Mark as paid (card) -->
                        <div class="d-flex flex-column flex-md-row gap-3">
                            <input class="visually-hidden" type="email" name="email" id="email" defaultValue={searchedEmail}>
                            <input class="visually-hidden" type="number" name="bookingId" id="bookingId" defaultValue="{booking.booking.id}">

                            <div class="mx-auto p-3 rounded" style="width:fit-content; box-shadow: 0 0 15px 2px white;">
                                <div>
                                    <label class="mx-3" for="edit has paid">Edit if paid</label>
                                    <input type="checkbox" name="edit has paid" id="edit has paid">
                                </div>

                                <div>
                                    <label class="mx-3" for="has paid">Has paid</label>
                                    <input type="checkbox" name="has paid" id="has paid">
                                </div>
                            </div>
                            <!-- Set price -->
                            <div class="mx-auto p-3 rounded" style="width:fit-content; box-shadow: 0 0 15px 2px white;">
                                <div>
                                    <label class="mx-3" for="edit price">Edit price</label>
                                    <input type="checkbox" name="edit price" id="edit price">
                                </div>

                                <div>
                                    <input class="px-2 rounded" type="text" name="price" id="price" defaultValue={booking.booking.price}>
                                </div>

                            </div>
                            <!-- Set discount -->
                            <div class="mx-auto p-3 rounded" style="width:fit-content; box-shadow: 0 0 15px 2px white;">
                                <div>
                                    <label class="mx-3" for="edit discount">Edit discount</label>
                                    <input type="checkbox" name="edit discount" id="edit discount">
                                </div>

                                <div>
                                    <input class="px-2 rounded" type="text" name="discount" id="discount" defaultValue={booking.booking.discount}>
                                </div>

                            </div>
                        </div>

                        <button class="btn btn-warning my-5 w-50 mx-auto" style="box-shadow: 0 0 5px 2px gold;" type="submit">Confim edits</button>
                    </form>

                </div>

                <!-- Delete -->
                <form action="?/delete" method="POST" class="mb-5">
                    <div class="mx-auto" style="width: fit-content;">
                        <input class="visually-hidden" type="email" name="email" id="email" defaultValue={searchedEmail}>
                        <input class="visually-hidden" type="number" name="bookingId" id="bookingId" defaultValue="{booking.booking.id}">
                        <p class="fs-4 fw-bold text-danger">There is no unding</p>
                        <button class="btn btn-danger" type="submit">Delete booking</button>
                    </div>
                </form>

            </div>

        {/each}

    {:else}
        <h2>You have no bookings</h2>
    {/if}

</div>