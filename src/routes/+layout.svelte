<script>
	import favicon from '$lib/assets/favicon.svg';

	import { onMount } from 'svelte';

	// Browser test to see if client or server side
	import { browser } from '$app/environment';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';

	onMount( async () => {
		if (browser) {
			await import('bootstrap');
		}
	})

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
