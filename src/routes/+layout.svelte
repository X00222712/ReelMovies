<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from "svelte";

	let scrolled = false;

	onMount(() => {
		const handleScroll = () => {
		scrolled = window.scrollY > 20;
		};

		window.addEventListener("scroll", handleScroll);
	});
		let { children } = $props();

	// Browser test to see if client or server side
	import { browser } from '$app/environment';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';

	onMount( async () => {
		if (browser) {
			await import('bootstrap');
		}
	})

</script>
<nav class="navbar navbar-expand-lg sticky-top cinema-nav {scrolled ? 'nav-scrolled' : ''}">
  <div class="container">

    <!-- Logo -->
    <a class="navbar-brand fw-bold text-white" href="#">
      ReelMovies
    </a>

    <!-- Toggle Button -->
    <button
      class="navbar-toggler text-white border-0"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
    >
      ☰
    </button>

    <!-- Nav Links -->
    <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
      <ul class="navbar-nav gap-lg-4 text-center">

        <li class="nav-item">
          <a class="nav-link" href="#">Home</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Movies</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Food</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Loyalty Program</a>
        </li>

		<li class="nav-item">
          <a class="nav-link" href="#">Account</a>
        </li>

        <li class="nav-item">
          <a class="nav-link btn-ticket ms-lg-3 px-3" href="#">
            Book Tickets
          </a>
        </li>

      </ul>
    </div>

  </div>
</nav>

<style>
  .cinema-nav {
    background: #003459;
    backdrop-filter: blur(12px);
    padding: 18px 0;
    transition: all 0.4s ease;
  }

  .nav-scrolled {
    background: #003459;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.6);
    padding: 12px 0;
  }

  .nav-link {
    color: #ccc !important;
    font-weight: 500;
    position: relative;
    transition: 0.3s ease;
  }

  .nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 4px;
    width: 0%;
    height: 2px;
    background: #a755c2;
    transition: 0.3s ease;
  }

  .nav-link:hover {
    color: #fff !important;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .btn-ticket {
    background: #a755c2;
    border-radius: 30px;
    color: white !important;
    transition: 0.3s ease;
  }

  .btn-ticket:hover {
    background: #a755c2;
    box-shadow: 0 0 20px #a755c2;
  }

  .navbar-toggler {
    font-size: 24px;
  }
</style>
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
