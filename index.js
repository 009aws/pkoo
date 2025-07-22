// FAQ Accordion Functionality

document.addEventListener('DOMContentLoaded', function () {
  try {
    // FAQ Accordion Setup
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
      console.log(`Found ${faqItems.length} FAQ items`);
      
      faqItems.forEach(item => {
        item.addEventListener('click', function () {
          // Close any open FAQ
          faqItems.forEach(i => {
            if (i !== item) {
              i.classList.remove('open');
            }
          });
          // Toggle current FAQ
          item.classList.toggle('open');
        });
      });
    }

    // Hero background image setup
    const hero = document.getElementById('hero-bg');
    if (hero) {
      // Use a single, special Dubai/UAE skyline image for the homepage hero
      hero.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')";
      console.log('Hero background image set successfully');
      
      const slogan = hero.querySelector('.hero-slogan');
      if (slogan) {
        slogan.textContent = 'Empowering Your Business, Visa, and Documentation Needs';
        slogan.style.color = '#fff';
        slogan.style.transition = 'color 0.5s';
        console.log('Hero slogan updated successfully');
      } else {
        console.warn('Hero slogan element not found');
      }
    } else {
      console.warn('Hero element not found on this page');
    }
    
  } catch (error) {
    console.error('Error in index.js:', error);
  }
});
