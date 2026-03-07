const users = [
    {
        id : 1,
        username : "Glen",
        password : "Hashed",
        RMPoints : 4000
    },
    {
        id: 4,
        username : "Alex",
        password : "SuperCool",
        RMPoints : 40
    },
    {
        id: 0,
        username : "Admin",
        password : "password123",
        RMPoints : 1_000_000
    }
];


// Must remove when the DB is added
let userCookies =  {};

function selectIDFromUsername(username)
{
    let id = -1;
    users.forEach(val => {
        if (val.username === username)
            { id = val.id; }
    });
    return id;
}

function selectPasswordFromID(id)
{
    let found = -1;
    users.forEach(val => {
        if (val.id === id)
            { found = val.password; }
    });

    return found;
}

function getUserIndexFromID(id)
{
    let found = -1;

    users.forEach((val, index) => {
        if (val.id === id)
            { found = index; }
    });

    return found;
}

function getUserIdFromCookie(hash)
{
    let ID = -1;
    users.forEach(val => {
        if (val.id in userCookies)
        {
            if (userCookies[val.id] === hash)
                { ID = val.id }
        }
    });
    return ID;
}

export const usersDataAccess = {
    async getUserDetails(cookie)
    {
        let id = getUserIdFromCookie(cookie);

        // User did not match cookie
        if (-1 === id)
        { return undefined; }

        let userIndex = getUserIndexFromID(id);
        // User does not exist
        if (-1 !== userIndex)
            { return users[userIndex]; }

        return undefined;
    },

    async getUserIdFromName(username)
        { return selectIDFromUsername(username); },

    async getUserPasswordFromId(userId)
        { return selectPasswordFromID(userId); },

    async startNewUserSession(userId, shaHash) {
        if (userId in userCookies)
            { return 0; }
        userCookies[userId] = shaHash
        return 1
    },

    async endUserSessionIds(ID)
        { delete userCookies[ID]; },

    async endUserSession(userCookie)
    {
        let userId = getUserIdFromCookie(userCookie)
        delete userCookies[userId];
    }
};