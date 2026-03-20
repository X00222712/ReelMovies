<script>
	import TestResults from "$lib/components/TestResults.svelte";

    let {form} = $props()
    let testResults = $state({})

    async function runTest( element )
    {
        try {
            if (!element.target.value.endsWith("/test")) { throw Error("Not a test page") }
            let results = await fetch(element.target.value, { method : "GET"});
            let data = await results.json()
            testResults[data.name] = data.data
            // console.log(results);
        }
        catch (error) 
        { alert(error.message + "\nSomething went wrong when running the test for\n" + element.target.value) }
        console.log("RESULTS", testResults)
    }

</script>

<h1 class="text-center pt-4">Tests</h1>

<!-- DB is hard to setup, button that'll call an API to run all setup for testing-->
<div class="d-flex flex-column gap-1 m-3 ms-5 align-items-center" style="width: fit-content;">
    <p class="m-0">Only run if DB was removed/reset</p>
    
    <form method="post" action="?/makeDB" class="w-75">
        <button type="submit" class="btn btn-danger w-100">Setup DB</button>
    </form>
    
        <!-- <p><strong>{form?.message}</strong></p> -->
</div>

<!-- Tests -->
<!-- Signup -->
<div class="px-4 pb-5 w-100 p-2">
    
    <h2>Accounts</h2>
    <div class="d-block">
        <!-- Signup test -->
        <div class="col-12 my-3 text-center border border-dark p-2 rounded-3">
            <div class="d-flex justify-content-between mx-4 m-3">
                <h3 class="mx-2">SignUp</h3>
                <div>
                    <button value="/account/signup/test" class="btn btn-success" type="button" onclick={runTest}>Run tests</button>
                </div>
            </div>
        
            <div class="d-flex justify-content-around">
                <p>Tests : {testResults.accountSignup?.testCount ?? 'N/A'}</p>
                <p class="fw-bold text-success">Passed : {testResults.accountSignup?.passed ?? 0}</p>
                <p class="fw-bold text-danger">failed : {testResults.accountSignup?.failed ?? 0}</p>
            </div>
            <!-- Tests -->
            {#if (testResults.accountSignup?.testCount ?? 0) > 0}
                <TestResults testResults={testResults["accountSignup"]}/>
            {/if}
        </div>

        <!-- Signin test -->
        <div class="col-12 my-3 text-center border border-dark p-2 rounded-3">
            <div class="d-flex justify-content-between mx-4 m-3">
                <h3 class="mx-2">SignIn</h3>
                <div>
                    <button value="/account/signin/test" class="btn btn-success" type="button" onclick={runTest}>Run tests</button>
                </div>
            </div>
        
            <div class="d-flex justify-content-around">
                <p>Tests : {testResults.accountSignIn?.testCount ?? 'N/A'}</p>
                <p class="fw-bold text-success">Passed : {testResults.accountSignIn?.passed ?? 0}</p>
                <p class="fw-bold text-danger">failed : {testResults.accountSignIn?.failed ?? 0}</p>
            </div>
            <!-- Tests -->
            {#if (testResults.accountSignIn?.testCount ?? 0) > 0}
                <TestResults testResults={testResults["accountSignIn"]}/>
            {/if}
        </div>
    </div>


</div>

