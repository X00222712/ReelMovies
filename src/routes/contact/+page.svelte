<script>
  let name = "";
  let email = "";
  let message = "";

  async function submitForm() {
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    if (data.success) {
      alert("Message sent!");
      name = email = message = "";
    } else {
      alert(data.error);
    }
  }
</script>

<div class="contact-wrapper container py-5">
  <h2 class="text-center mb-5">Get in Touch</h2>
  <div class="row g-4 align-items-stretch">
    <div class="col-lg-7">
      <form class="contact-form h-100" on:submit|preventDefault={submitForm}>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            id="name"
            type="text"
            class="form-control"
            placeholder="Your Name"
            bind:value={name}
          />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            type="email"
            class="form-control"
            placeholder="Your Email"
            bind:value={email}
          />
        </div>

        <div class="mb-4">
          <label for="message" class="form-label">Message</label>
          <textarea
            id="message"
            class="form-control"
            rows="5"
            placeholder="Write your message..."
            bind:value={message}
          ></textarea>
        </div>

        <button type="submit" class="btn btn-ticket w-100">
          Send Message
        </button>

      </form>
    </div>

    <div class="col-lg-5">
      <div class="contact-info h-100">
        <h4 class="mb-4">Contact Info</h4>
        <div class="info-item">
          <i class="bi bi-geo-alt"></i>
          <div>
            <span>Address</span>
            <p>12 Abbey Street, Dublin</p>
          </div>
        </div>

        <div class="info-item">
          <i class="bi bi-telephone"></i>
          <div>
            <span>Phone</span>
            <p>087 123 4567</p>
          </div>
        </div>

        <div class="info-item">
          <i class="bi bi-envelope"></i>
          <div>
            <span>Email</span>
            <p>contact@reelmovies.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>

.contact-wrapper h2 {
  color: #ffffff;
  font-weight: 600;
}

.contact-form {
  background: rgba(28, 37, 65, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 2rem;
  transition: 0.3s ease;
}

.contact-form:hover {
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.form-label {
  color: #ffffff;
  font-weight: 500;
}

.form-control {
  background: rgba(11, 19, 43, 0.75);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  color: #ffffff;
  padding: 12px 14px;
  transition: all 0.25s ease;
}

.form-control::placeholder {
  color: rgba(255,255,255,0.5);
}

.form-control:focus {
  background: rgba(11,19,43,0.9);
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(108,99,255,0.2);
}

textarea {
  resize: none;
}

.contact-info {
  background: rgba(28, 37, 65, 0.6);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 18px;
  padding: 2rem;
  height: 100%;
}

.contact-info h4 {
  color: #ffffff;
  font-weight: 600;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.info-item i {
  font-size: 1.4rem;
  color: var(--accent);
}

.info-item span {
  display: block;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
}

.info-item p {
  margin: 0;
  color: #ffffff;
  font-weight: 500;
}

.btn-ticket {
  border-radius: 30px;
  font-weight: 600;
  padding: 10px;
  transition: 0.3s ease;
  background-color: #6C63FF;
  color: white;
}

.btn-ticket:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(108,99,255,0.35);
}

</style>