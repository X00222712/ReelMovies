<!-- Author: Alex D -->
<script>
    import favicon from '$lib/assets/favicon.svg';
    import { onMount } from "svelte";

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


    let scrolled = $state(false);


    const handleScroll = () => {
        scrolled = window.scrollY > 20;
    };

    onMount(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-wrapper">

  <!-- NAVBAR -->
  <nav class="navbar navbar-expand-lg sticky-top cinema-nav {scrolled ? 'nav-scrolled' : ''}">
    <div class="container jusify-content-between px-0">

      <a class="navbar-brand fw-bold text-white ms-1" href="/">
        ReelMovies
      </a>

      <button
        class="navbar-toggler text-white border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        ☰
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
        <ul class="navbar-nav gap-lg-4 text-center">

          <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="/movies">Movies</a></li>
          <li class="nav-item"><a class="nav-link" href="/menu">Menu</a></li>
          <li class="nav-item"><a class="nav-link" href="/loyalty">Loyalty Program</a></li>
          <li class="nav-item d-lg-none"><a class="nav-link" href="/account">Account</a></li>
          <li class="nav-item"><a class="nav-link" href="/contact">Contact us</a></li>

          <li class="nav-item">
            <a class="nav-link btn-ticket ms-lg-3 px-3" href="/purchase/tickets">
              Book Tickets
            </a>
          </li>

        </ul>
      </div>

      <div class="ms-5 d-none d-lg-flex">
        <a href="/account/">
          <div
          class="bg-white"
          style="border-radius: 50%; scale: 180%; width:fit-content">
              <i class="bi bi-person-fill bg-white"></i>
              <span class="visually-hidden">Next</span>
          </div>
        </a>
      </div>

    </div>
  </nav>

  <!-- PAGE CONTENT -->
  <main>
  <!-- SLOT renders webpage -->
    <slot/>
  </main>

  <!-- FOOTER -->
  <footer class="footer bg-dark text-light pt-5 pb-4">
    <div class="container">
      <div class="row gy-4">

        <!-- Brand -->
        <div class="col-lg-4 col-md-6">
          <h5 class="fw-semibold">ReelMovies</h5>
          <p class="text-secondary small mt-3">
            This is a fictional movie booking web application created for our 2nd year project.
            All content is purely illustrative and does not represent real data or services.
          </p>
          <ul>
            <li><a href="/about" class="footer-link">About us</a></li>
            <li><a href="/#" class="footer-link">About ReelMovies</a></li>
          </ul>
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
            <li><a href="/contact" class="footer-link">Contact Us</a></li>
            <li><a href="/feedback" class="footer-link">Feedback</a></li>
            <li><a href="/setup" class="footer-link">Setup DB</a></li>
          </ul>
        </div>

        <!-- Opening Hours -->
        <div class="col-lg-3 col-md-6">
          <h6 class="fw-semibold mb-3">Opening Hours</h6>
          <p class="text-secondary small mb-1">Mon - Friday: 9 AM - 10 PM</p>
          <p class="text-secondary small mb-1">Saturday: 10 AM - 11 PM</p>
          <p class="text-secondary small mb-0">Sunday: 10 AM - 10 PM</p>
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

</div>

<style>

:root {
  --bg-main: #0B132B;
  --bg-secondary: #1C2541;
  --accent: #6C63FF;
  --accent-hover: #8E85FF;
  --text-main: #F5F5F5;
  --text-muted: #B0B3C0;
}
  .app-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

 .cinema-nav {
  background: var(--bg-secondary);
  padding: 18px 0;
  transition: all 0.3s ease;
}

.nav-scrolled {
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
  padding: 14px 0;
}

.navbar-brand {
  color: var(--text-main);
  font-size: 1.4rem;
  letter-spacing: 1px;
}

.nav-link {
  color: var(--text-muted);
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
  background: var(--accent);
  transition: 0.3s ease;
}

.nav-link:hover {
  color: var(--text-main);
}

.nav-link:hover::after {
  width: 100%;
}

.btn-ticket {
  background: var(--accent);
  border-radius: 30px;
  color: white;
  padding: 6px 18px;
  transition: 0.3s ease;
}

.btn-ticket:hover {
  background: var(--accent-hover);
  box-shadow: 0 0 20px rgba(108, 99, 255, 0.6);
}
</style>

