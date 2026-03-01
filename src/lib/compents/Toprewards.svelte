<script>
    let { rewardItems, userToken } = $props();
    const menu = import.meta.glob(['$lib/assets/menu/**.jpeg', '$lib/assets/menu/**.webp', '$lib/assets/menu/*/*.png'], {eager : true, query: "?url", import: "default"});

    async function reedemPoint(id) {
        console.log(userToken)
        const rsp = await fetch("/", {
            method: 'POST',
            body: JSON.stringify({userToken}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(rsp);
    }

</script>

<div class="d-flex flex-wrap">
    {#each rewardItems as item}

        <div class="d-flex justify-content-between border border-2 border-dark p-2 m-1" style="min-width: 30%; max-width: 48%; max-height: 15rem;">
            <img class="w-50" src={menu['/src/lib/assets/menu/' + item.image]} alt="image of {item.name}">
            <div>
                <h3 class="m-0">{item.name}</h3>
                <p class="pe-3">{item.price}RM points</p>
                <input id="clickme" type="button" value="Reedem" class="btn btn-warning btn-reedem" onclick={reedemPoint}/>
            </div>
        </div>
        
    {/each}

</div>

<style>
    .btn-reedem {
        transition: 0.2s ease-out;
    }

    .btn-reedem:hover {
        transition: 0.6s ease-in;
        box-shadow: 0 0 25px #fffdff;
        /* ffc107 */
        background-color: #ffda07;
    }
</style>