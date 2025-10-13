const toggleBtn = document.getElementById('toggleCustomTour');
const customSection = document.getElementById('customTourSection');

toggleBtn.addEventListener('click', function() {
    if (customSection.style.display === 'none') {
        customSection.style.display = 'block';
        toggleBtn.textContent = 'Hide Custom Tour Request';
        toggleBtn.classList.add('active');
    } else {
        customSection.style.display = 'none';
        toggleBtn.textContent = 'Custom Tour Request';
        toggleBtn.classList.remove('active');
    }
});

const budgetSlider = document.getElementById('budgetSlider');
const budgetValue = document.getElementById('budgetValue');

budgetSlider.addEventListener('input', function() {
    const value = parseInt(this.value).toLocaleString('en-US');
    budgetValue.textContent = `$${value}`;
});