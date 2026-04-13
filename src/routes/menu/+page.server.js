// Author : Luaren

import { db } from "$lib/server/db";

export async function load() {
    const foods = await db.query.food.findMany();
    console.log('foods', foods);

    return{
        food_drink: foods
    };
}