const toggleBtn = document.getElementById("toggleCustomTour")
const customSection = document.getElementById("customTourSection")

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        if (customSection.style.display === "none") {
            customSection.style.display = "block"
            toggleBtn.textContent = "Hide Custom Tour Request"
            toggleBtn.classList.add("active")
        } else {
            customSection.style.display = "none"
            toggleBtn.textContent = "Custom Tour Request"
            toggleBtn.classList.remove("active")
        }
    })
}

const budgetSlider = document.getElementById("budgetSlider")
const budgetValue = document.getElementById("budgetValue")

if (budgetSlider) {
    budgetSlider.addEventListener("input", function () {
        const value = Number.parseInt(this.value).toLocaleString("en-US")
        budgetValue.textContent = `$${value}`
    })
}
