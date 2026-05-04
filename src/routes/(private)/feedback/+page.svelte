<!-- Author: Alex D -->
<script>

    let { data } = $props()
    let feedback = $state(data.feedback)

</script>

<div class="container py-5">

    <h2 class="mb-4 fw-bold">Customer Feedback</h2>

    <div class="card p-4 mb-5 review-form">
    <div class="mb-3">

</div>


<form action="?/submitFeedback" method="post">
    <label for="rating" class="form-label">Rating</label>
        <select id="rating" name="rating" class="form-select" >
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
        </select>

        <label for="review" class="form-label">Your Review</label>
        <textarea
            name="review"
            id="review"
            class="form-control text-white"
            rows="3"
            placeholder="Share your experience..."
        ></textarea>

    <div class="d-flex justify-content-center mt-4">
        <button class="btn btn-ticket mt-2 text-white border" style="box-shadow: 0 0 5px 2px white;" type="submit">
            Submit Review
        </button>
    </div>

</form>

</div>

    <h4 class="mb-3">Reviews</h4>

    {#if feedback.length === 0}
        <p class="text-muted">No reviews yet.</p>
    {/if}

    <div class="row g-4">
        {#each feedback as review}
            <div class="col-md-6">
                <div class="card p-3 review-card h-100">
                    <h6 class="fw-semibold mb-1">{review.username}</h6>
                    <p class="mb-2 text-warning">
                        {"⭐".repeat(review.rating)}
                    </p>
                    <p class="mb-0">{review.review}</p>
                </div>
            </div>
        {/each}
    </div>

</div>

<style>

.container {
  max-width: 1100px;
}

h2 {
  font-size: 2rem;
  
  letter-spacing: 0.5px;
}

.review-form,
.review-card {
  background: rgba(28, 37, 65, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  transition: all 0.35s ease;

  color: antiquewhite;
}

.review-form {
  padding: 2rem;
}


.form-control,
.form-select,
textarea {
  background: rgba(11, 19, 43, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: #ffffff;
  padding: 12px 14px;
  transition: all 0.25s ease;
}

.form-control::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-control:focus,
.form-select:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.15);
  background: rgba(11, 19, 43, 0.9);
}

.btn-ticket {
  border-radius: 30px;
  font-weight: 600;
  padding: 10px 22px;
  transition: all 0.3s ease;
}

.btn-ticket:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(108, 99, 255, 0.35);
}

.review-card {
  padding: 1.5rem;
  height: 100%;
}

.review-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
}


.review-card h6 {
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.3px;
}

.text-warning {
  font-size: 0.9rem;
  opacity: 0.9;
}

.review-card {
  animation: fadeUp 0.4s ease forwards;
}

</style>