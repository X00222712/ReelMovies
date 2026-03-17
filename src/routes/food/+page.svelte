
<script>
export let data;
let search = "";
let selectedCategory = "All";
const euro = new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency: 'EUR'
    });


    $: visibleItems = data.food_drink?.filter(item => {
        const term = search.toLowerCase(); 
        const matchesSearch = 
            item.name.toLowerCase().includes(term)
        
        const matchesCategory = 
            selectedCategory === "All"|| 
            item.id == selectedCategory.toLowerCase(); 
        
        return matchesSearch && matchesCategory; 
    }) || [];
    

</script>



<div class = "container">
    <input class = "form-control sm-2" type = "search" placeholder = "Search For Food and Drinks" bind:value={search}/>
</div>

<div class = "mb-3">

    <button class = "btn" on:click={() => selectedCategory = "food"}>  FOOD</button> 

    <button class = "btn" on:click= {() => selectedCategory = "drink"}> DRINKS </button>
    
    

</div>

            <table class="table table-bordered table-hover w-200">
                
                <tbody>
                  {#each visibleItems as item}
                        <tr>
                            <td>{item.name}</td>
                            
                            <td>{euro.format(item.price)}</td>
                            <td class="text-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    
                                    style="max-width: 120px;max-height: 120px;"
                                />
                            </td>
                        </tr>
                    {/each}
                </tbody>

            </table>

<style>
    
    .btn{
        background: #a755c2; 
        border-radius: 30px;
        text-align: center;
        color: white;
        margin-left: 300px;
        margin-right: 300px;
        padding-left: 35px;
        padding-right: 35px;
    }

    .table{
        border-radius: 30px;
        
    }
    .container{
        margin-top: 30px;
        padding-bottom: 30px;

    }
    
    
</style>