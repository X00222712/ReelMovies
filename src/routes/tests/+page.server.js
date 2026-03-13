import { validateInsertUser } from "$lib/server/db/validation";


export async function load() {
    let testItems = [
        {name : "Glen", email: "glen@abc.ie" ,password : "Hello"},
        {name : "Glen", email: "glen@abc.ie" ,password : "password"},
        {name : "Glen", email: "glen@abc.ie" ,password : "123"},
        {name : "Glen", email: "glen@abc.ie" ,password : ""},
        {name : "Glen", email: "glen@abc.ie" ,password : " "},
        {name : "Glen", email: "glen@abc.ie" ,password : 12},
        {name : "Glen", email: "glen@abc.ie" ,password : undefined},
        {name : "Glen", email: "glen@abc.ie" ,password : null},
        {name : "Glen", email: "glen@abc.ie" ,password : String.undefined},
        {name : "Glen", email: "glen@abc.ie" ,password : "password'; SELECT * FROM account WHERE '1' = '1"},
    ]
    testItems.forEach(element => {
        try {
            console.log("SUCCESS", element, validateInsertUser.parse(element));
        } catch (error) {
            console.log(error.message, "Could not validate");
        }
    });
}