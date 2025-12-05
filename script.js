// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    
    // Close mobile menu if it's open
    if (document.querySelector('nav').classList.contains('active')) {
      document.querySelector('.hamburger').classList.remove('active');
      document.querySelector('nav').classList.remove('active');
      document.body.style.overflow = '';
    }
    
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll to top when logo is clicked
document.getElementById("logo").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Make sure logo link also scrolls to top
document.querySelector("#logo a").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    if (nav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  
  if (nav.classList.contains('active') && 
      !nav.contains(e.target) && 
      !hamburger.contains(e.target)) {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Scroll animations and UI enhancements
document.addEventListener("DOMContentLoaded", function () {
  // Scroll progress indicator
  const scrollProgress = document.querySelector(".scroll-progress");
  const floatingButton = document.querySelector(".floating-button");

  window.addEventListener("scroll", () => {
    // Update scroll progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + "%";
    }

    // Show/hide floating button
    if (scrollTop > 300) {
      floatingButton.classList.add("visible");
    } else {
      floatingButton.classList.remove("visible");
    }

    // Add scrolled class to header for compact mode
    const header = document.querySelector("header");
    if (scrollTop > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
  // Handle resize events for responsive behavior
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // If mobile menu is open and screen is resized to desktop size
      if (window.innerWidth > 768 && document.querySelector('nav').classList.contains('active')) {
        document.querySelector('nav').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
        document.body.style.overflow = '';
      }
    }, 250);
  });

  // Scroll to top when floating button is clicked
  floatingButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Intersection Observer options
  const observerOptions = {
    root: null, // use the viewport as the root
    rootMargin: "0px",
    threshold: 0.15, // trigger when at least 15% of the element is visible
  };

  // Create an observer for fade-in animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        // Unobserve after animation is triggered to improve performance
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document
    .querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .zoom-in, .portfolio-item, .service-card, .footer-section"
    )
    .forEach((element) => {
      fadeObserver.observe(element);
    });

  // Parallax effect for hero section (desktop only)
  const parallaxElements = document.querySelectorAll(".parallax");
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (!isMobile && parallaxElements.length) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrollTop * speed}px)`;
      });
    });
  }


  // Staggered animations for service cards and portfolio items
  const animateWithDelay = (selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${index * 0.1}s`;
    });
  };

  animateWithDelay(".service-card");
  animateWithDelay(".portfolio-item");

  // Enhanced staggered effect for service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Add a subtle rotation on hover for more dynamic feel
      const randomRotation = (Math.random() * 2 - 1) * 0.5; // Random value between -0.5 and 0.5 degrees
      card.style.transform = `translateY(-10px) rotate(${randomRotation}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      // Reset to original staggered position
      if (card.classList.contains("card-1")) {
        card.style.transform = "translateY(0px)";
      } else if (card.classList.contains("card-2")) {
        card.style.transform = "translateY(20px)";
      } else if (card.classList.contains("card-3")) {
        card.style.transform = "translateY(-15px)";
      } else if (card.classList.contains("card-4")) {
        card.style.transform = "translateY(10px)";
      } else {
        card.style.transform = "translateY(0)";
      }
    });
  });

  // Add hover effects to the "over mij" cards
  const overMijCards = document.querySelectorAll(".card");
  overMijCards.forEach((card, index) => {
    // Set animation delay based on index for staggered appearance
    card.style.setProperty("--i", index + 1);

    // Add 3D tilt effect on mouse move
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element

      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      // Apply the transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    // Reset transform on mouse leave
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Add shimmer effect to footer divider
  const footerDivider = document.querySelector(".footer-divider");
  if (footerDivider) {
    setInterval(() => {
      footerDivider.classList.add("shimmer");
      setTimeout(() => {
        footerDivider.classList.remove("shimmer");
      }, 2000);
    }, 5000);
  }

  // Trigger animations for elements already in viewport on page load
  setTimeout(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    document
      .querySelectorAll(
        ".fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .zoom-in, .portfolio-item, .service-card, .footer-section"
      )
      .forEach((element) => {
        const elementTop = element.getBoundingClientRect().top + scrollTop;
        if (elementTop < scrollTop + windowHeight * 0.85) {
          element.classList.add("animate");
        }
      });
  }, 100);
});
