<script>

    const { form } = $props()

</script>

<div class="m-4">
    <h1>Setup DB</h1>

    <div>
        {#if form?.failed === false || form?.failed === true}
            <p class="m-0 text-{form?.failed ? 'danger' : 'success'}"><strong>{form.message}</strong></p>
        {/if}
    </div>

    <form method="post">
        <label class="mx-3" for="password">Access password</label>
        <input class="" type="password" name="password" id="password">
    </form>

</div>