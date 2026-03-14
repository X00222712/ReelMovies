import { auth } from "$lib/server/auth";
import { assert } from "node:console"

export function TestResults(amountOfTests)
{
    assert("number" === typeof amountOfTests);
    this.testCount = amountOfTests
    
    this.passed = 0
    this.failed = 0

    this.testsPassed = []
    this.testsFailed = []

    this.passedTest = test => {
        this.passed++
        this.testsPassed.push(test)
    }
    this.failedTest = test => {
        this.failed++
        this.testsFailed.push(test)
    }
}

export function TestCase(data, expected)
{
    assert('object' === typeof data);
// This is the test
    this.data = data;
    this.expected = expected

    this.testNumber = -1;
    this.message = "No message added";
    this.result = false;

    this.setTestNumber = (testNumber) => {
        assert('number' === typeof testNumber);
        this.testNumber = testNumber ?? -1;
    }
    this.addMessage = (message) => { this.message = message; }
    this.passedTest = () => { this.result = true; }
}

export async function runTest(testData) {
    let testResult = new TestResults(testData.length)
    for(let index = 0; index < testData.length; index++) {
        let testCase = testData[index]
        
        try {
            // Check if the test result is expected

            let name = testCase.data.name
            let email = testCase.data.email
            let password = testCase.data.password

            let result = await auth.api.signUpEmail({
                body : {
                    name,
                    email,
                    password
                }
            })
            console.log("RESULT OF API", result)
            testResult.passedTest(testCase)

        } catch (error)
        {
            // Test has failed
            if (testCase.expected === error.message)
                {
                    console.log("PASSED")
                    testResult.passedTest(testCase)
                }
            else {
                console.log("FAILED")
                testResult.failedTest(testCase)

                console.log(error.message)
                console.log(typeof error.message, typeof testCase.expected)
            }
        }
    };
    return testResult;
}