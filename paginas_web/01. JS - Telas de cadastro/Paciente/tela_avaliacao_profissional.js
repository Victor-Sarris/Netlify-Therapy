document.addEventListener('DOMContentLoaded', function() {
    const starsInput = document.querySelectorAll('.stars-input i');
    let selectedRating = 0;

    function updateStars(rating) {
        starsInput.forEach(star => {
            const starRating = star.getAttribute('data-rating');
            if (starRating <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    starsInput.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.getAttribute('data-rating');
            updateStars(rating);
        });

        star.addEventListener('mouseout', function() {
            updateStars(selectedRating);
        });

        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-rating');
            updateStars(selectedRating);
        });
    });
});
