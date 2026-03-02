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
<nav class="navbar navbar-expand-lg fixed-top cinema-nav {scrolled ? 'nav-scrolled' : ''}">
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
          <a class="nav-link" href="/contact">Contact us</a>
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

{@render children()}


<footer class="footer bg-dark text-light pt-5 pb-4 mt-5">
  <div class="container">
    <div class="row gy-4">

      <!-- Brand -->
      <div class="col-lg-4 col-md-6">
        <h5 class="fw-semibold">ReelMovies</h5>
        <p class="text-secondary small mt-3">
          This is a fictional movie booking web application created for our 2nd year project. All content, including movie titles, showtimes, and offers, is purely illustrative and does not represent real data or services.
        </p>
      </div>

      <!-- Navigation -->
      <div class="col-lg-2 col-md-6">
        <h6 class="fw-semibold mb-3">Explore</h6>
        <ul class="list-unstyled">
          <li><a href="/" class="footer-link">Home</a></li>
          <li><a href="/movies" class="footer-link">Movies</a></li>
          <li><a href="/food" class="footer-link">Food</a></li>
          <li><a href="/loyalty" class="footer-link">Loyalty Program</a></li>
          <li><a href="/account" class="footer-link">Account</a></li>
          <li><a href="/tickets" class="footer-link">Book Tickets</a></li>
        </ul>
      </div>

      <!-- Support -->
      <div class="col-lg-3 col-md-6">
        <h6 class="fw-semibold mb-3">Support</h6>
        <ul class="list-unstyled">
          <li><a href="#" class="footer-link">Contact Us</a></li>
        </ul>
      </div>

       <div class="col-lg-3 col-md-6">
        <h6 class="fw-semibold mb-3">Opening hours</h6>
        <ul class="list-unstyled">
        <p class="text-secondary small mt-3">Mon - Friday: 9 AM - 10 PM</p>
        <p class="text-secondary small mt-3">Saturday: 10 AM - 11 PM</p>
        <p class="text-secondary small mt-3">Sunday: 10 AM - 10 PM</p>
        </ul>
      </div>

    </div>

    <hr class="border-secondary my-4" />

    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center small text-secondary">
      <span>© {new Date().getFullYear()} ReelMovies. All rights reserved.</span>
      <div class="mt-2 mt-md-0">
        <a href="#" class="footer-link me-3">Instagram</a>
        <a href="#" class="footer-link me-3">Twitter</a>
        <a href="#" class="footer-link">Facebook</a>
      </div>
    </div>
  </div>
</footer>
