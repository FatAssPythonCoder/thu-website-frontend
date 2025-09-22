//JavaScript file for the slideshow dynamic functionality
// IIFE (Immediately Invoked Function Expression) - wraps all code to avoid global scope pollution
(function () {
  // Enables strict mode for better error catching and performance
  'use strict';
  
  // Log startup message to console for debugging
  console.log('Starting image slideshow...');
  
  // Get the container element where images will be displayed
  const imageContainer = document.querySelector('.bg-image-container');
  // Safety check: if container doesn't exist, log error and exit function
  if (!imageContainer) {
    console.error('Image container not found!');
    return; // Exit early if container is missing
  }

  // Main image playlist - will be loaded from backend API
  let playlist = [];

  // Array of vertical images that need special CSS treatment
  // These images are portrait orientation and need different display properties
  const verticalImages = [
    'assets/gallery/bg-img2.JPG',     // Vertical image 1
    'assets/gallery/bg-img4.JPG',     // Vertical image 2
    'assets/gallery/bg-img5.JPG',     // Vertical image 3
    'assets/gallery/bg-img12.JPG',    // Vertical image 4
    'assets/gallery/bg-img14.JPG',    // Vertical image 5
  ];

  // State variables for slideshow control
  let currentIndex = 0;        // Tracks which image is currently displayed (0-based index)
  let isPlaying = true;        // Boolean flag for play/pause state
  let cycleInterval;           // Stores the interval ID for automatic image cycling
  let isInitialized = false;   // Flag to track if slideshow is initialized

  // Create the main image element that will display the slideshow images
  const image = document.createElement('img');
  // Set CSS class for styling - this class is defined in styles.css
  image.className = 'bg-image';
  // Note: CSS will handle the positioning and styling of this element

  // Add the image element to the container so it appears on the page
  imageContainer.appendChild(image);

// Function to load playlist from backend API
async function loadPlaylist() {
  try {
    console.log('Loading playlist from backend API...');
    const response = await fetch('https://thu-website-backend-ught.vercel.app/api/playlist');
    const data = await response.json();
      
      if (data.playlist && Array.isArray(data.playlist)) {
        playlist = data.playlist;
        console.log('Playlist loaded successfully:', playlist.length, 'images');
        
        // Initialize slideshow if not already done
        if (!isInitialized) {
          initializeSlideshow();
        }
      } else {
        console.error('Invalid playlist data received:', data);
        // Fallback to default playlist
        loadDefaultPlaylist();
      }
    } catch (error) {
      console.error('Error loading playlist from API:', error);
      // Fallback to default playlist
      loadDefaultPlaylist();
    }
  }

  // Function to load default playlist as fallback
  function loadDefaultPlaylist() {
    console.log('Loading default playlist as fallback...');
    playlist = [
      'assets/gallery/bg-img.JPG',
      'assets/gallery/bg-img1.JPG',
      'assets/gallery/bg-img2.JPG',
      'assets/gallery/bg-img3.JPG',
      'assets/gallery/bg-img4.JPG',
      'assets/gallery/bg-img5.JPG',
      'assets/gallery/bg-img6.JPG',
      'assets/gallery/bg-img7.JPG',
      'assets/gallery/bg-img8.JPG',
      'assets/gallery/bg-img9.JPG',
      'assets/gallery/bg-img10.JPG',
      'assets/gallery/bg-img11.JPG',
      'assets/gallery/bg-img12.JPG',
      'assets/gallery/bg-img13.jpg',
      'assets/gallery/bg-img14.JPG'
    ];
    
    if (!isInitialized) {
      initializeSlideshow();
    }
  }

  // Function to initialize the slideshow
  function initializeSlideshow() {
    if (playlist.length === 0) {
      console.error('No images in playlist!');
      return;
    }
    
    console.log('Initializing slideshow with', playlist.length, 'images');
    isInitialized = true;
    
    // Load the first image (index 0)
    loadImage(0);
    // Start automatic cycling
    startCycle();
  }

  // Function to load and display a specific image by index
  function loadImage(index) {
    // Get the image source path from the playlist array
    const src = playlist[index];
    // Check if this image is in the vertical images array
    const isVertical = verticalImages.includes(src);
    
    // Log image loading details for debugging
    console.log('Loading image:', src, 'Index:', index, 'Vertical:', isVertical);
    
    // Apply appropriate CSS class based on image orientation
    if (isVertical) {
      // Add 'vertical' class for portrait images (uses object-fit: contain)
      image.classList.add('vertical');
    } else {
      // Remove 'vertical' class for landscape images (uses object-fit: cover)
      image.classList.remove('vertical');
    }
    
    // Set the image source to trigger loading
    image.src = src;
  }

  // Function to advance to the next image in the playlist
  function nextImage() {
    // Increment index and wrap around to 0 when reaching the end
    currentIndex = (currentIndex + 1) % playlist.length;
    // Log the image switch for debugging
    console.log('Switching to image index:', currentIndex);
    // Load the new image
    loadImage(currentIndex);
  }

  // Function to start automatic image cycling
  function startCycle() {
    // Clear any existing interval to prevent multiple intervals running
    if (cycleInterval) clearInterval(cycleInterval);
    // Set up new interval to call nextImage every seconds
    cycleInterval = setInterval(() => {
      // Only advance if slideshow is playing (not paused)
      if (isPlaying) {
        nextImage();
      }
    }, 500);
  }

  // Function to stop automatic image cycling
  function stopCycle() {
    // Check if there's an active interval
    if (cycleInterval) {
      // Clear the interval to stop automatic cycling
      clearInterval(cycleInterval);
      // Reset the interval variable to null
      cycleInterval = null;
    }
  }

  // Event listener for successful image loading
  image.addEventListener('load', () => {
    // Log successful image load for debugging
    console.log('Image loaded successfully:', image.src);
  });

  // Event listener for image loading errors
  image.addEventListener('error', (e) => {
    // Log image loading errors for debugging
    console.error('Image failed to load:', image.src, e);
  });

  // Initialize the slideshow when the script loads
  console.log('Loading slideshow playlist...');
  // Load playlist from backend API
  loadPlaylist();

  // Get control button elements from the HTML
  const btnMotion = document.getElementById('toggleMotion');  // Play/pause button
  const btnNext = document.getElementById('nextClip');        // Next image button

  // Set up play/pause button functionality
  if (btnMotion) {
    // Add click event listener to the motion button
    btnMotion.addEventListener('click', () => {
      // Toggle the playing state
      isPlaying = !isPlaying;
      if (isPlaying) {
        // If now playing, update button text and start cycling
        btnMotion.textContent = 'Pause slideshow';
        btnMotion.setAttribute('aria-pressed', 'false');  // Accessibility attribute
        startCycle();
      } else {
        // If now paused, update button text and stop cycling
        btnMotion.textContent = 'Play slideshow';
        btnMotion.setAttribute('aria-pressed', 'true');   // Accessibility attribute
        stopCycle();
      }
    });
  }

  // Set up next image button functionality
  if (btnNext) {
    // Add click event listener to the next button
    btnNext.addEventListener('click', () => {
      // Manually advance to next image
      nextImage();
    });
  }

  // Navigation functionality - handles the top navigation bar buttons
  const collectionsBtn = document.getElementById('collectionsBtn');  // Collections button
  const supportBtn = document.getElementById('supportBtn');          // Support button

  // Set up collections button functionality
  if (collectionsBtn) {
    // Add click event listener to the collections button
    collectionsBtn.addEventListener('click', () => {
      // Log button click for debugging
      console.log('Collections clicked');
      // Navigate to collections page
      window.location.href = 'collections.html';
    });
  }

  // Set up support button functionality
  if (supportBtn) {
    // Add click event listener to the support button
    supportBtn.addEventListener('click', () => {
      // Show support modal
      showSupportModal();
    });
  }

  // Log final initialization message with total image count
  // Note: This will be logged when playlist is loaded from API

  // Initialize currency converter
  initializeCurrencyConverter();
})(); // End of IIFE - immediately invoke the function

// Support Modal Functions
function showSupportModal() {
  const modal = document.getElementById('supportModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
}

function closeSupportModal() {
  const modal = document.getElementById('supportModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}

// Currency Converter Functionality
function initializeCurrencyConverter() {
  const currencySelect = document.getElementById('currencySelect');
  
  if (!currencySelect) {
    console.log('Currency selector not found on this page');
    return;
  }

  // Load saved currency preference
  const savedCurrency = localStorage.getItem('selectedCurrency') || 'USD';
  currencySelect.value = savedCurrency;

  // Currency change event listener
  currencySelect.addEventListener('change', async (e) => {
    const selectedCurrency = e.target.value;
    
    // Save preference
    localStorage.setItem('selectedCurrency', selectedCurrency);
    
    // Update all prices on the page
    await updatePricesOnPage(selectedCurrency);
  });

  // Initial price update
  updatePricesOnPage(savedCurrency);
}

async function updatePricesOnPage(targetCurrency) {
  try {
    console.log('Updating prices to currency:', targetCurrency);
    
    // Find all price elements
    const priceElements = document.querySelectorAll('[data-price]');
    
    console.log('Found price elements:', priceElements.length);
    
    if (priceElements.length === 0) {
      console.log('No price elements found on this page');
      return;
    }

    for (const element of priceElements) {
      const originalPrice = element.dataset.price;
      const originalCurrency = element.dataset.currency || 'USD';
      
      console.log('Processing price:', originalPrice, originalCurrency, '->', targetCurrency);
      
      if (originalCurrency === targetCurrency) {
        // Same currency, no conversion needed
        const formattedPrice = formatCurrency(parseFloat(originalPrice), targetCurrency);
        element.textContent = formattedPrice;
        continue;
      }

      try {
        // Convert currency
        const response = await fetch(`https://thu-website-backend-ught.vercel.app/api/currency/convert?amount=${originalPrice}&from=${originalCurrency}&to=${targetCurrency}`);
        const data = await response.json();
        
        console.log('Conversion response:', data);
        
        if (data.success) {
          const convertedPrice = formatCurrency(data.converted.amount, targetCurrency);
          element.textContent = convertedPrice;
          console.log('Converted price:', convertedPrice);
        } else {
          console.error('Currency conversion failed:', data.error);
          // Fallback to original price
          const formattedPrice = formatCurrency(parseFloat(originalPrice), originalCurrency);
          element.textContent = formattedPrice;
        }
      } catch (error) {
        console.error('Error converting currency:', error);
        // Fallback to original price
        const formattedPrice = formatCurrency(parseFloat(originalPrice), originalCurrency);
        element.textContent = formattedPrice;
      }
    }
  } catch (error) {
    console.error('Error updating prices:', error);
  }
}

function formatCurrency(amount, currency) {
  const symbols = {
    'USD': '$',
    'GBP': '£',
    'VND': '₫'
  };
  
  const symbol = symbols[currency] || currency;
  
  if (currency === 'VND') {
    // Vietnamese Dong - round to 4 significant figures
    const rounded = parseFloat(amount.toPrecision(4));
    return `${symbol}${Math.round(rounded).toLocaleString('vi-VN')}`;
  } else {
    // USD and GBP - 2 decimal places
    return `${symbol}${amount.toFixed(2)}`;
  }
}
