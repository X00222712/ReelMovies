
<script>
	
let search = "";
let selectedCategory = "All";
const euro = new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency: 'EUR'
    });

let food = [
    {
    id: "1",
    name:"Small popcorn",
    price:3,
    img:"https://media.istockphoto.com/id/2068529080/photo/popcorn.jpg?s=612x612&w=0&k=20&c=dz3nR5q4WfMOqACBKNORXiX-_vM0Ukodbhx_MSev_30=",
    desc: "food"
    },
    {
    id: "2",
    name: "Medium popcorn",
    price: 5,
    img: "https://media.istockphoto.com/id/2068529080/photo/popcorn.jpg?s=612x612&w=0&k=20&c=dz3nR5q4WfMOqACBKNORXiX-_vM0Ukodbhx_MSev_30=",
    desc: "food"
    },
    {
    id: "3",
    name: "Large popcorn",
    price: 6,
    img:"https://media.istockphoto.com/id/2068529080/photo/popcorn.jpg?s=612x612&w=0&k=20&c=dz3nR5q4WfMOqACBKNORXiX-_vM0Ukodbhx_MSev_30=",
    desc: "food"
    },

    {
    id: "4",
    name: "Nachos",
    price: 5,
    img:"https://www.majologrupa.hr/wp-content/uploads/2024/11/nachos9.jpg",
    desc: "food"
    },

    {
    id: "5",
    name: "M&Ms",
    price: 3,
    img:"https://m.media-amazon.com/images/I/612k51PxPsL._AC_UF894,1000_QL80_.jpg",
    desc: "food"
    },


    {
    id: "6",
    name:"Coke",
    price:3,
    img: "https://www.asiamarket.ie/media/catalog/product/cache/1ae38c744b0a21fab02034b60751c21a/c/o/coca-cola_icon_500ml_pet_optimised_ean__54491472_54491472.png",
    desc: "drink"
    },
    {
    id: "7",
    name: "coke zero",
    price: 3,
    img:"https://digitalcontent.api.tesco.com/v2/media/ghs/8f30b6a9-347a-45e3-be70-44a1ea6cb2fd/f431f858-2e56-4a9a-8189-776501a76b05_1060421527.jpeg?h=960&w=960",
    desc: "drink"
    },
    {
    id: "8",
    name: "fanta",
    price: 3,
    img:"https://images.cdn.shop.supervalu.ie/detail/1018162012_1",
    desc: "drink"
    },

    {
    id: "9",
    name: "orange juice",
    price: 3,
    img:"https://www.happysliquor.com/cdn/shop/files/Tropicana-Pure-Premium-Some-Pulp-100-Orange-Juice-12-oz-Bottle_34f25fdc-2ec0-4bb8-b6f9-a83ab811a770.062cc036ec0cf3c91e6eb29b248923de_1080x.webp?v=1698793663",
    desc: "drink"
    },

    {
    id: "10",
    name: "7up",
    price: 3,
    img:"https://images.cdn.dunnesstoresgrocery.com/zoom/100297981_596.jpg",
    desc: "drink"
    },

    ];
    $: visableItems = food.filter(item => {
        const term = search.toLowerCase(); 
        const matchesSearch = 
            item.id.toString().includes(term) ||
            item.name.toLowerCase().includes(term)
        
        const matchesCategory = 
            selectedCategory === "All"|| item.desc == selectedCategory; 
        
        return matchesSearch && matchesCategory; 
    });
    

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
                  {#each visableItems as item}
                        <tr>
                            <td>{item.name}</td>
                            
                            <td>{euro.format(item.price)}</td>
                            <td class="text-center">
                                <img
                                    src={item.img}
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