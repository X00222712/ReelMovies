<script>
	import { redirect } from "@sveltejs/kit";
    const menu = import.meta.glob(['$lib/assets/menu/*/*.png'], {eager : true, query: "?url", import: "default"})
    console.log(menu)

    let { rewardItems } = $props();
</script>

<div class="col-11 mx-auto d-flex flex-wrap justify-content-around my-3">
    {#each rewardItems as item}

        <div class="col-6 RM-reward-item d-flex flex-column flex-md-row justify-content-around border border-2 border-dark">
            <img class="mx-auto mx-md-4 p-2" src={menu[`/src/lib/assets${item.image}`]} alt="image of {item.name}">
            <div class="mt-5 pb-3 mx-auto text-center text-sm-start">
                <h3 class="m-0">{item.name}</h3>
                <p><strong>{item.pointsCost}RM</strong> points</p>
                <a href="/loyalty#{item.name}"><input id="redeem{item.name}" type="button" value="Redeem" class="btn btn-warning btn-reedem" aria-label="View {item.name}"></a>
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
        transition: 0.5s ease-in;
        /* ffc107 */
        color: azure;
        background-color: rgb(0, 67, 211);
        border-color: rgb(0, 181, 187);
    }
</style>