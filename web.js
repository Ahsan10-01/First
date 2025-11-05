 new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 25,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets:true,
  },
 autoplay: {
      delay: 1500, // 1 second
      disableOnInteraction: false, // keep autoplay working even after clicks
    },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1
  },
   768: {
      slidesPerView: 2
  },
   1024: {
      slidesPerView: 3
  },
}
});
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Navigation functionality
    const navItems = document.querySelectorAll('.nav-container .heading');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.textContent.toLowerCase();
            scrollToSection(section);
        });
    });

    // 2. Recipe cards click functionality
    const recipeCards = document.querySelectorAll('.card-item .card-link');
    recipeCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const recipeName = this.querySelector('.card-title').textContent;
            openRecipeModal(recipeName);
        });
    });

    // 3. Get Started buttons
    const getStartedButtons = document.querySelectorAll('.btn-green, .get, .btn-submit');
    getStartedButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('btn-submit')) {
                handleFormSubmit();
            } else {
                scrollToSection('signup-form');
            }
        });
    });

    // 4. Sign Up button in header
    const signUpBtn = document.querySelector('.btn1');
    signUpBtn.addEventListener('click', function() {
        scrollToSection('signup-form');
    });

    // 5. API Demo buttons
    const demoButtons = document.querySelectorAll('.btn-grey');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const apiType = this.closest('.nutrition-box').querySelector('.nutrition-title').textContent;
            openAPIDemo(apiType);
        });
    });

    // 6. Learn more links
    const learnMoreLinks = document.querySelectorAll('.learn-more');
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.closest('.nutrition-box').querySelector('.nutrition-title').textContent;
            openServiceDetails(serviceName);
        });
    });

    // 7. Highlight box clicks
    const highlightBoxes = document.querySelectorAll('.highlight-box');
    highlightBoxes.forEach(box => {
        box.addEventListener('click', function() {
            openNutritionWizard();
        });
    });

    // 8. Footer navigation
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.toLowerCase();
            handleFooterNavigation(linkText);
        });
    });

    // 9. Form handling
    const signupForm = document.querySelector('.signup-form');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });

    // 10. Social media links
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent.trim();
            openSocialMedia(platform);
        });
    });

    // 11. Mobile menu toggle (if needed)
    const menuIcon = document.querySelector('.logo1');
    menuIcon.addEventListener('click', function() {
        toggleMobileMenu();
    });

    // 12. Stats counter animation
    animateCounters();

    // 13. Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Helper functions
    function scrollToSection(section) {
        const targetSection = document.querySelector(`.${section}`) || document.getElementById(section);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function openRecipeModal(recipeName) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'recipe-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${recipeName}</h2>
                <div class="recipe-details">
                    <h3>Ingredients:</h3>
                    <ul>
                        <li>2 lbs chicken</li>
                        <li>2 cups basmati rice</li>
                        <li>1 cup yogurt</li>
                        <li>Spices (garam masala, turmeric, etc.)</li>
                    </ul>
                    <h3>Instructions:</h3>
                    <ol>
                        <li>Marinate chicken in yogurt and spices for 2 hours</li>
                        <li>Parboil rice with whole spices</li>
                        <li>Layer chicken and rice in a heavy-bottomed pot</li>
                        <li>Cook on low heat for 30 minutes</li>
                    </ol>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    function openAPIDemo(apiType) {
        alert(`Opening ${apiType} API Demo...\nThis would typically open a sandbox or documentation page.`);
        
        // In a real app, you might:
        // window.open(`/api-demo/${apiType.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
    }

    function openServiceDetails(serviceName) {
        const serviceDetails = {
            'Nutrition Analysis': 'Get detailed nutritional breakdown of any recipe',
            'Food Database Lookup': 'Search our database of 900K+ food items',
            'Food Entity Extraction': 'Automatically identify food items in text',
            'Recipe Licensing': 'License our premium recipe content',
            'Recipe Search': 'Search millions of recipes by ingredients',
            'Recipe Content Management': 'Manage your recipe content efficiently',
            'Meal Recommendation Engine': 'AI-powered meal recommendations',
            'Personalized Meal Plans': 'Custom meal plans based on dietary needs',
            'Food Trends Analytics': 'Track food trends and insights'
        };
        
        alert(`${serviceName}\n\n${serviceDetails[serviceName] || 'Detailed information coming soon!'}`);
    }

    function openNutritionWizard() {
        const wizard = document.createElement('div');
        wizard.className = 'nutrition-wizard';
        wizard.innerHTML = `
            <div class="wizard-content">
                <h3>Nutrition Wizard</h3>
                <textarea placeholder="Paste your recipe here..."></textarea>
                <button onclick="analyzeRecipe()">Analyze Nutrition</button>
                <div class="nutrition-results"></div>
            </div>
        `;
        
        document.body.appendChild(wizard);
    }

    function handleFormSubmit() {
        const form = document.querySelector('.signup-form');
        const formData = new FormData(form);
        
        // Basic validation
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Account created successfully!');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2000);
    }

    function handleFooterNavigation(linkText) {
        const navigationMap = {
            'nutrition analysis api': 'nutrition-analysis',
            'food database api': 'food-database',
            'recipe search api': 'recipe-search',
            'nutrition wizard': 'nutrition-wizard',
            'recipe search': 'recipe-search',
            'food search': 'food-search',
            'facebook': 'https://facebook.com/zamans',
            'twitter': 'https://twitter.com/zamans',
            'linkedin': 'https://linkedin.com/company/zamans',
            'pinterest': 'https://pinterest.com/zamans'
        };
        
        const target = navigationMap[linkText.toLowerCase()];
        if (target) {
            if (target.startsWith('http')) {
                window.open(target, '_blank');
            } else {
                scrollToSection(target);
            }
        }
    }

    function openSocialMedia(platform) {
        const socialUrls = {
            'facebook': 'https://facebook.com/zamans',
            'twitter': 'https://twitter.com/zamans',
            'linkedin': 'https://linkedin.com/company/zamans',
            'pinterest': 'https://pinterest.com/zamans'
        };
        
        window.open(socialUrls[platform.toLowerCase()], '_blank');
    }

    function toggleMobileMenu() {
        // Simple mobile menu toggle
        const nav = document.querySelector('.nav-container');
        nav.classList.toggle('mobile-active');
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-box h2');
        counters.forEach(counter => {
            const target = parseFloat(counter.textContent.replace(/[^0-9.]/g, ''));
            const suffix = counter.textContent.replace(/[0-9.]/g, '');
            let current = 0;
            const increment = target / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        });
    }

    // Global function for nutrition wizard
    window.analyzeRecipe = function() {
        const textarea = document.querySelector('.nutrition-wizard textarea');
        const recipe = textarea.value;
        
        if (!recipe.trim()) {
            alert('Please enter a recipe!');
            return;
        }
        
        const results = document.querySelector('.nutrition-results');
        results.innerHTML = '<p>Analyzing...</p>';
        
        // Simulate API call
        setTimeout(() => {
            results.innerHTML = `
                <h4>Nutrition Facts (per serving)</h4>
                <p>Calories: 450</p>
                <p>Protein: 25g</p>
                <p>Carbs: 35g</p>
                <p>Fat: 20g</p>
                <p>Fiber: 5g</p>
            `;
        }, 1500);
    };
});

// Additional CSS for modal and interactive elements
const dynamicStyles = `
<style>
.recipe-modal, .nutrition-wizard {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.modal-content, .wizard-content {
    background: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    color: #444A5A;
}

.close-modal {
    float: right;
    font-size: 28px;
    cursor: pointer;
}

.nutrition-wizard textarea {
    width: 100%;
    height: 100px;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.nutrition-wizard button {
    background: #6acc00;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
}

.nutrition-results {
    margin-top: 20px;
    padding: 15px;
    background: #f5f5f5;
    border-radius: 5px;
}

.mobile-active {
    display: flex !important;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
    .nav-container {
        display: none;
    }
    
    .nav-container.mobile-active {
        display: flex;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);