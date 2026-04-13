/*

Author : Glen Johnston
Create : 23 / Mar / 2026

Description

This will get and manage the pages for the user end

Notes:
We could do a more complicated paging system but there is no need for it and no point of it
This isn't production code that users will see and is only intended for IT use,
Anyone using it should know how it works.

*/

import { json } from "@sveltejs/kit";
import { usersService } from '$lib/server/services/users-service';
import { idSchema } from '$lib/server/db/validation';
import { page } from "$app/state";

const PAGESIZE = 4

export async function GET({ url })
{
    let type = url.searchParams.get("type") ?? "none";

    let data = {}

    if ("users" == type)
    {
        let id = Number(url.searchParams.get("values") ?? 1);

        // Validate maybe in the future
        let users = [];

        // The user's at the end of the pages
        // The first user is user 1 or top
        if (-1 === id)
        {
            // If there are no more users, wrap back around
            // Wrap back to reality
            users = await usersService.getLastPage(PAGESIZE)
        }
        else
        {
            let ValidatedId = idSchema.parse({id}).id
            users = await usersService.getUsersPageByID(ValidatedId, PAGESIZE)
            // If there are no more users, wrap back around
            // Wrap back to reality
            if (users.length === 0) users = await usersService.getUsersPageByID(1, PAGESIZE);
        }

        // Handle pages here because I will go insane otherwise
        let lastpage = 1
        let nextpage = 1

        // If the last page is still not the last page to go back
        if (0 < users[0].id - PAGESIZE)
        {
            lastpage = users[0].id - PAGESIZE
            nextpage = users[0].id + PAGESIZE
        }
        else
            {
                // The current page is the second last page
                // This will just get ID 1, so could look weird
                if (-PAGESIZE+1 < users[0].id - PAGESIZE)
                { lastpage = 1 }
                // else it's the last page, grand
                else
                    {
                        lastpage = -1
                        nextpage = users[0].id + PAGESIZE
                    } 
            }
        data = { users, lastpage, nextpage }
    }


    return json(data, {status : 200})
}