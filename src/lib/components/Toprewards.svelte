<script>
    let { rewardItems } = $props();
    const menu = import.meta.glob(['$lib/assets/menu/**.jpeg', '$lib/assets/menu/**.webp', '$lib/assets/menu/*/*.png'], {eager : true, query: "?url", import: "default"});

</script>

<div class="d-flex flex-wrap justify-content-around my-3">
    {#each rewardItems as item}

        <div class="col-6 RM-reward-item d-flex flex-column flex-md-row justify-content-around border border-2 border-dark p-2 m-1">
            <img class="mx-auto mx-md-4 p-2" src={menu['/src/lib/assets/menu/' + item.image]} alt="image of {item.name}">
            <div class="mt-5 pb-3 mx-auto text-center text-sm-start">
                <h3 class="m-0">{item.name}</h3>
                <p><strong>{item.price}RM</strong> points</p>
                <input id="clickme" type="button" value="Redeem" class="btn btn-warning btn-reedem" onclick={redeemPoint}/>
            </div>
        </div>
        
    {/each}

</div>

<style>
    .RM-reward-item {
        transition: 0.3s ease;
        box-shadow: 0 0 15px black;
        width: fit-content;
    }
    .RM-reward-item:hover {
        transform: translateY(-6px);
    }
    @media (max-width: 768px)
    {
        .RM-reward-item {
            width: 100%;
        }
    }

    .btn-reedem {
        transition: 0.7s ease-out;
    }

    .btn-reedem:hover {
        box-shadow: 0 0 25px #fffdff;
        transition: 0.2s ease-in;
        /* ffc107 */
        color: azure;
        background-color: rgb(0, 97, 187);
        border-color: rgb(0, 97, 187);
    }
</style>