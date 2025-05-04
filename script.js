document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Form submission
    const orderForm = document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would use Formspree or another service
            // This is just a simulation for the demo
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your order! We will contact you shortly to confirm the details.');
            this.reset();
        });
    }

    // Set creator link (replace # with your actual link)
    const creatorLink = document.getElementById('creator-link');
    creatorLink.href = '#'; // Add your link here

    // Price calculation functionality
    const modelSelect = document.getElementById('model');
    const quantityInput = document.getElementById('quantity');
    const totalCostField = document.getElementById('total-cost');

    // Price mapping for each model
    const modelPrices = {
        'NexaSound Pro': 299,
        'NexaSound Air': 199,
        'NexaSound Lite': 149,
        'NexaSound Max': 249
    };

    // Function to calculate and update total
    function updateTotal() {
        const selectedModel = modelSelect.value;
        let quantity = parseInt(quantityInput.value) || 0;
        
        // Enforce quantity limit
        if (quantity > 50) {
            quantity = 50;
            quantityInput.value = 50;
        }
        if (quantity < 1) {
            quantity = 1;
            quantityInput.value = 1;
        }
        
        if (selectedModel && modelPrices[selectedModel]) {
            const total = modelPrices[selectedModel] * quantity;
            totalCostField.value = `$${total.toFixed(2)}`;
        } else {
            totalCostField.value = '$0.00';
        }
    }

    // Event listeners for model and quantity changes
    modelSelect.addEventListener('change', updateTotal);
    quantityInput.addEventListener('input', updateTotal);

    // Quantity validation on form submit
    const orderForm = document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            const quantity = parseInt(quantityInput.value);
            
            if (quantity > 50) {
                e.preventDefault();
                alert('Maximum quantity per order is 50. Please adjust your quantity.');
                quantityInput.focus();
                return;
            }
            
            if (quantity < 1) {
                e.preventDefault();
                alert('Please enter a valid quantity (1-50).');
                quantityInput.focus();
                return;
            }
            
            if (!modelSelect.value) {
                e.preventDefault();
                alert('Please select a headphone model.');
                modelSelect.focus();
                return;
            }

            // Existing form submission code...
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your order! We will contact you shortly to confirm the details.');
            this.reset();
            updateTotal(); // Reset total display
        });
    }

    // Initialize total on page load
    updateTotal();
});