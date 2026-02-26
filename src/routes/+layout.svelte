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

<div class="p-3 d-flex justify-content-between">
	<h1>REEL MOVIES</h1>
	<nav class="navbar navbar-expand navbar-light bg-light justify-content-end">
		<ul class="navbar-nav">
			<a class="nav-link nav-item me-5" href="#"><li>Home</li></a>
			<a class="nav-link nav-item me-5" href="#"><li>Movies</li></a>
			<a class="nav-link nav-item me-5" href="#"><li>Menu</li></a>
			<a class="nav-link nav-item me-5" href="#"><li>Account</li></a>
		</ul>
	</nav>
</div>

{@render children()}

<footer class="RM-BKP d-flex justify-content-around">

	<div class="my-auto ms-5 py-4">
	<h2>REEL MOVIES</h2>
	</div>

	<div class="my-auto ms-5 py-4">
		<nav class="navbar">
			<ul class="navbar-nav">
				<a class="nav-link" href="#"><li>About Reel Movies</li></a>
				<a class="nav-link" href="#"><li>About Us</li></a>
			</ul>
		</nav>
	</div>

	<div class="my-auto me-5 py-4">
		<nav class="navbar">
			<ul class="navbar-nav">
				<a class="nav-link" href="#"><li>Account</li></a>
				<a class="nav-link" href="#"><li>Feedback</li></a>
				<a class="nav-link" href="#"><li>Contact us</li></a>
			</ul>
		</nav>
	</div>

</footer>


<link rel="stylesheet" href="/src/styles/style.css">
