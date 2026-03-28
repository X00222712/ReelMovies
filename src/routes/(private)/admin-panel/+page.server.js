/*

Author : Glen Johnston
Create : 23 / Mar / 2026

Description

Admin panel functions and data

*/


import { usersService } from "$lib/server/services/users-service"

export async function load() {
    const users = await usersService.getUsersPageByID(1, 5)
    return { users }
}

export const actions = {
    getUserPage : async ({ request }) => {

        const data = await request.formData();
        const lastId = Number(data.get("lastID")) ?? 1
        const pageSize = 5

        const users = await usersService.getUsersPageByID(lastId, pageSize)
        return { users }
    }
}