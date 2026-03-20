<script>
    let { testResults } = $props()

    let showLogs = $state(true)

    let showPassedIndexData = $state(-1)
    let showPassedIndexResults = $state(-1)

    let showFailedIndexData = $state(-1)
    let showFailedIndexResults = $state(-1)

    function getObject(ObjectToParse)
    {
        let entriesUseable = []
        for (const [key, value] of Object.entries(ObjectToParse))
        { entriesUseable.push(` ${key} : ${value}`) }
        return entriesUseable
    }

    function showPassedData( event )
    {
        let index = event.target.value
        if (showPassedIndexData === index) { showPassedIndexData = -1 }
        else { showPassedIndexData = event.target.value }
    }
    function showPassedResults( event )
    {
        let index = event.target.value
        if (showPassedIndexResults === index) { showPassedIndexResults = -1 }
        else { showPassedIndexResults = event.target.value }
    }

    function showFailedData( event )
    {
        let index = event.target.value
        if (showFailedIndexData === index) { showFailedIndexData = -1 }
        else { showFailedIndexData = event.target.value }
    }
    function showFailedResults( event )
    {
        let index = event.target.value
        if (showFailedIndexResults === index) { showFailedIndexResults = -1 }
        else { showFailedIndexResults = event.target.value }
    }

    function displayLogs( event )
        { showLogs = showLogs === false }
</script>

<div>
    <button class="p-0 me-4 d-flex gap-3 btn"  style="justify-self: end; border: 0px black;" onclick={displayLogs}>
        <p class="m-0">{showLogs ? "Hide" : "Show"} logs</p>
        <i class="bi bi-caret-{showLogs ? "up" : "down"}-fill"></i>
    </button>
    {#if showLogs}
        <!-- Failed -->
        <div class="text-start">
            {#each testResults.testsFailed as failedTest, index}
                <div class="border border-3 border-dark rounded p-2 my-2">
                    <div class="d-flex gap-3 align-items-center">
                        <p class="m-0">Test :</p>
                        <p class="m-0 px-1">{failedTest.testNumber}</p>
                    </div>
                    <div class="my-2">
                        <button class="d-block btn btn-success px-3" style="width: fit-content;" aria-expanded="false" value={index} onclick={showFailedData}>Data</button>
                        {#if showFailedIndexData == index}
                            {#each getObject(failedTest.data) as item}
                                <div>[{item} ]</div>
                            {/each}
                        {/if}
                    </div>
                    <div class="my-2">
                        <button class="d-block btn btn-info px-3" style="width: fit-content;" aria-expanded="false" value={index} onclick={showFailedResults}>Result</button>
                        {#if showFailedIndexResults == index}
                            <div class="p-3 py-2">
                                <p class="m-0">Expected :</p>
                                <p class="m-0">{failedTest.expected}</p>
                                <p class="m-0">Recieved :</p>
                                <p class="m-0">{failedTest.message}</p>
                            </div>
                        {/if}
                        <p>Test <strong class="text-decoration-unscore {failedTest.result ? "text-success" : "text-danger"}">{failedTest.result ? "Passed" : "Failed"}</strong></p>
                    </div>
                    <!-- {console.log(failedTest)} -->
                </div>
            {/each}
        </div>

    <!-- Passed -->
        <div class="text-start">
            {#each testResults.testsPassed as passedTest, index}
                <div class="border border-3 border-dark rounded p-2 my-2">
                    <div class="d-flex gap-3 align-items-center">
                        <p class="m-0">Test :</p>
                        <p class="m-0 px-1">{passedTest.testNumber}</p>
                    </div>
                    <p>Test <strong class="text-decoration-underline {passedTest.result ? "text-success" : "text-danger"}">{passedTest.result ? "Passed" : "Failed"}</strong></p>
                    <!-- Data -->
                    <div class="my-2">
                        <button class="d-block btn btn-success px-3" style="width: fit-content;" aria-expanded="false" value={index} onclick={showPassedData}>Data</button>
                        {#if showPassedIndexData == index}
                            {#each getObject(passedTest.data) as item}
                                <div>[{item} ]</div>
                            {/each}
                        {/if}
                    </div>
                    <!-- Expected -->
                    <div class="my-2">
                        <button class="d-block btn btn-info px-3" style="width: fit-content;" aria-expanded="false" value={index} onclick={showPassedResults}>Result</button>
                        {#if showPassedIndexResults == index}
                            <div class="p-3 py-2">
                                <p class="m-0">Expected :</p>
                                <p class="m-0">{passedTest.expected}</p>
                                <p class="m-0">Recieved :</p>
                                <p class="m-0">{passedTest.message}</p>
                            </div>
                        {/if}
                    </div>
                    <!-- {console.log(passedTest)} -->
                </div>
            {/each}
        </div>
    {/if}
</div>
