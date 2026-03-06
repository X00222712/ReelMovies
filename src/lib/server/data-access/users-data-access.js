const users = [
    {
        id : 1,
        username : "Glen",
        password : "Hashed",
        RMPoints : 4000
    }
];

let userCookies =  {
    "123" : 0
};

export const usersDataAccess = {
    async getUserDetails(userCookie)
    { 
        if (userCookie in userCookies)
        {
            const userId = userCookies[userCookie];
            return users[userId];
        }
        return undefined;
    },

    async getUserIdFromName(username) {},
    async getUserPasswordFromId(userId) {},
};