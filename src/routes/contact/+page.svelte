<script>
</script>

<div class="contact-container">
  <h2 class="text-center mb-4">Contact Us</h2>
  <form class="contact-form">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        placeholder="Your Name"
      />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="Your Email"
      />
    </div>
    <div class="mb-4">
      <label for="message" class="form-label">Message</label>
      <textarea
        class="form-control"
        id="message"
        rows="4"
        placeholder="Your Message"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-ticket w-100">
      Send Message
    </button>
  </form>
</div>
<div class="contact-info">
  <div class="text-center mb-4">
    <h4 class="mb-3">Our Contact Information</h4>
    <p><strong>Address:</strong> 12 Abbey Street, Dublin, Ireland</p>
    <p><strong>Phone:</strong> 0871234567</p>
    <p><strong>Email:</strong> contact@reelmovies.com</p>
  </div>
</div>

<style>

.contact-container {
  max-width: 600px;
  margin: auto;
  padding: 3rem 1rem;
}

h2 {
  color: #ffffff;
  font-weight: 600;
}

.contact-form {
  background: rgba(28, 37, 65, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 2rem;
}

.form-label {
  color: #ffffff;
  font-weight: 500;
}

.form-control {
  background: rgba(11, 19, 43, 0.75) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  border-radius: 12px !important;
  color: #ffffff !important;
  padding: 10px 14px;
  transition: all 0.25s ease;
}

.form-control::placeholder {
  color: rgba(255,255,255,0.6);
}

.form-control:focus {
  background: rgba(11,19,43,0.9) !important;
  border-color: var(--accent) !important;
  box-shadow: 0 0 0 3px rgba(108,99,255,0.2) !important;
}

textarea {
  resize: none;
}

</style>
