<script>
	import { json } from "zod";



    let testResults = {}

    async function runTest( element )
    {
        try {
            if (!element.target.value.endsWith("/test")) { throw Error("Not a test page") }
            let results = await fetch(element.target.value, { method : "GET"});
            let data = await results.json()
            testResults[data.name] = data.data
            console.log(results);
        }
        catch (error) 
        { alert(error.message + "\nSomething went wrong when running the test for\n" + element.target.value) }
        console.log("RESULTS", testResults)
    }

</script>

<h1 class="text-center pt-4">Tests</h1>

<!-- Tests -->
<!-- Signup -->
<div class="px-4 pb-5 w-100 p-2">
    
    <h2>Accounts</h2>
    <div class="d-flex justify-content-around">
        <!-- Signup test -->
        <div class="col-5 col-md-4 col-lg-3 text-center border border-dark p-2 rounded-3">
            <h3>Signup</h3>
            <p class="mx-auto">Tests : {testResults.accountSignup?.testCount ?? 'N/A'}</p>
        
            <div  class="d-flex justify-content-around">
                <p class="fw-bold text-success">Passed : {testResults.accountSignup?.passed ?? 0}</p>
                <p class="fw-bold text-danger">failed : {testResults.accountSignup?.failed ?? 0}</p>
            </div>
            <button value="/account/signup/test" class="btn btn-success p-1" type="button" onclick={runTest}>Run tests</button>
        </div>

        <!-- Signin test -->
        <div class="col-5 col-md-4 col-lg-3 text-center border border-dark p-2 rounded-3">
            <h3>Signin</h3>
            <p class="mx-auto">Tests : {testResults.accountSignin?.testCount ?? 'N/A'}</p>
        
            <div  class="d-flex justify-content-around">
                <p class="fw-bold text-success">Passed : {testResults.accountSignin?.passed ?? 0}</p>
                <p class="fw-bold text-danger">failed : {testResults.accountSignin?.failed ?? 0}</p>
            </div>
            <button value="/account/signin/test" class="btn btn-success p-1" type="button" onclick={runTest}>Run tests</button>
        </div>
    </div>


</div>

