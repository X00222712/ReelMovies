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
    assert('object' === typeof data)
// ----------------------------
// This is the test          //
// ----------------------------
    this.data = data         //
    this.expected = expected //
// ----------------------------
    this.testNumber = -1
    this.message = "No message added"
    this.result = false

    this.setTestNumber = (testNumber) => {
        assert('number' === typeof testNumber)
        this.testNumber = testNumber ?? -1
    }
    this.addMessage = (message) => { this.message = message }
    this.passedTest = () => { this.result = true }
}

export async function runTest(testData, testCallback, customSuccessCheck = null) {
    let shouldCustomSuccessCheck = customSuccessCheck !== null
    let testResult = new TestResults(testData.length)
    for(let index = 0; index < testData.length; index++) {
        let testCase = testData[index]
        testCase.setTestNumber(index+1)
        
        try {
            // Check if the test result is expected
            let result = await testCallback(testCase.data);

            // Uncomment to see the result of the callback
            // console.log("RESULT OF callback", result)
            // console.log("EXPECTED", testCase.expected)
            // console.log("Equal", result === testCase.expected)
            // console.log("Equal", result == testCase.expected)
            // console.log("EXPECTED :", typeof result)
            // console.log("EXPECTED :", typeof testCase.expected)
            if (shouldCustomSuccessCheck)
            {
                if (customSuccessCheck(testCase.expected, result))
                {
                    testCase.addMessage(result)
                    testCase.passedTest()
                    testResult.passedTest(testCase)
                }
                else
                {
                    testCase.addMessage(result)
                    testResult.failedTest(testCase)
                }
            }

            else if (('object' === typeof testCase.expected && testCase.expected.includes(result)) || ('string' === typeof testCase.expected && result === testCase.expected))
            {
                testCase.addMessage(result)
                testCase.passedTest()
                testResult.passedTest(testCase)
            }
            else
            {
                testCase.addMessage(result)
                testResult.failedTest(testCase)
            }

        } catch (error)
        {
            // console.log(('object' === typeof testCase.expected && testCase.expected.includes(error.message)) || ('string' === typeof testCase.expected && error.message === testCase.expected))
            // console.log(error, testCase.expected)   
            if (('object' === typeof testCase.expected && testCase.expected.includes(error.message)) || ('string' === typeof testCase.expected && error.message === testCase.expected))
            {
                testCase.addMessage(error.message)
                testCase.passedTest()
                testResult.passedTest(testCase)
            }
            else
            {
                testCase.addMessage(error.message)
                testResult.failedTest(testCase)
            }
            // Uncomment to see index and error messages
            console.log(typeof error.message, typeof testCase.expected)
            console.log(error.message == testCase.expected)
            console.log(index, `"${error.message}"`, " :: ", `"${testCase.expected}"`)
        }
    };
    return testResult;
}