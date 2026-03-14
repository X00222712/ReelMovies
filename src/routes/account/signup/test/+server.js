import { runTest, TestCase } from "$lib/server/utils/tests";
import { json } from "@sveltejs/kit";
import test from "node:test";

export async function GET() {
    // Load test data
    let testData = [
        new TestCase({ name : "Glen", email : "a@a.ie", password : "Hashed" }, ""),
        new TestCase({ name : "Glen", email : "a@a.ie", password : "Hashed" }, ""),
        new TestCase({ name : "Glen", email : "a", password : "Hashed" }, "[body.email] Invalid email address"),
        new TestCase({ name : "Glen", email : "a@a", password : "Hashed" }, "[body.email] Invalid email address"),
        new TestCase({ name : "", email : "a@a", password : "Hashed" }, "[body.email] Invalid email address"),
        new TestCase({ name : "", email : "", password : "Hashed" }, "[body.email] Invalid email address; [body.password] Too small: expected string to have >=1 characters"),
        new TestCase({ name : "", email : "", password : "" }, "[body.name] Invalid input: expected string, received null; [body.email] Invalid input: expected string, received null; [body.password] Invalid input: expected string, received null"),
        new TestCase({ name : null, email : null, password : null }, "Password too short")
    ]
    let testResult = await runTest(testData);
    return json({ name : "accountSignup", data : testResult }, {status : 200});

}