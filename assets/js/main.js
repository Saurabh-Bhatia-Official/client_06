/**
 * FAMDALLY LIMITED - AGRICULTURAL TRADING
 * Interactive Landing Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect (if header exists)
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    // Close menu on click of link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }

  // 3. ScrollSpy for Active Navigation Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });




  // 5. Copy to Clipboard Functionality
  window.copyText = (text, elementId) => {
    navigator.clipboard.writeText(text).then(() => {
      const el = document.getElementById(elementId);
      if (el) {
        const originalText = el.innerText;
        el.innerText = 'Copied!';
        el.style.color = '#F5874E';
        setTimeout(() => {
          el.innerText = originalText;
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // 8. Official Profile Modal (View & Print)
  const profileModal = document.getElementById('profile-modal');
  const openModalBtns = document.querySelectorAll('.open-profile-modal');
  const closeModalBtns = document.querySelectorAll('.close-profile-modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (profileModal) {
        profileModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (profileModal) {
        profileModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal when clicking outside modal body
  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) {
        profileModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 9. Trigger browser print from modal
  window.printCompanyProfile = () => {
    window.print();
  };

  // 10. Enquiry Form Handler
  const enquiryForm = document.getElementById('enquiry-form');
  const enquiryAlert = document.getElementById('enquiry-alert');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('enq-name');
      const email = document.getElementById('enq-email');
      const product = document.getElementById('enq-product');
      const message = document.getElementById('enq-message');

      // Remove previous error states
      enquiryForm.querySelectorAll('.form-control').forEach(el => {
        el.style.borderColor = '';
      });

      let hasError = false;
      [name, email, product, message].forEach(field => {
        if (!field.value || field.value.trim() === '') {
          field.style.borderColor = '#e74c3c';
          hasError = true;
        }
      });

      // Email format check
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#e74c3c';
        hasError = true;
      }

      if (hasError) return;

      // Simulate submission (loading state)
      const submitBtn = document.getElementById('enq-submit-btn');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        // Show success alert
        if (enquiryAlert) {
          enquiryAlert.classList.add('show');
        }

        // Reset form
        enquiryForm.reset();

        // Restore button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.style.opacity = '';

        // Hide alert after 8 seconds
        setTimeout(() => {
          if (enquiryAlert) {
            enquiryAlert.classList.remove('show');
          }
        }, 8000);
      }, 1500);
    });
  }
});
