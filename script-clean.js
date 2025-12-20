//JavaScript file for the slideshow dynamic functionality
// IIFE (Immediately Invoked Function Expression) - wraps all code to avoid global scope pollution
(function () {
  // Enables strict mode for better error catching and performance
  'use strict';
  
  
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
    'assets/gallery/bg-img2.jpg',     // Vertical image 1
    'assets/gallery/bg-img4.jpg',     // Vertical image 2
    'assets/gallery/bg-img5.jpg',     // Vertical image 3
    'assets/gallery/bg-img12.jpg',    // Vertical image 4
    'assets/gallery/bg-img14.jpg',    // Vertical image 5
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

// Function to load playlist from shared data (real-time updates!)
function loadPlaylist() {
  
  // Check if SharedData is available
  if (typeof window.SharedData !== 'undefined') {
    // Get data from shared data source
    playlist = window.SharedData.getPlaylistData();
  } else {
    // Fallback to static data if SharedData not available
    playlist = [
      'assets/gallery/bg-img.jpg',
      'assets/gallery/bg-img1.jpg',
      'assets/gallery/bg-img2.jpg',
      'assets/gallery/bg-img3.jpg',
      'assets/gallery/bg-img4.jpg',
      'assets/gallery/bg-img5.jpg',
      'assets/gallery/bg-img6.jpg',
      'assets/gallery/bg-img7.jpg',
      'assets/gallery/bg-img8.jpg',
      'assets/gallery/bg-img9.jpg',
      'assets/gallery/bg-img10.jpg',
      'assets/gallery/bg-img11.jpg',
      'assets/gallery/bg-img12.jpg',
      'assets/gallery/bg-img13.jpg',
      'assets/gallery/bg-img14.jpg',
      'assets/gallery/bg-img15.jpg',
      'assets/gallery/bg-img16.jpg',
      'assets/gallery/bg-img17.jpg'
    ];
  }
  
  // Initialize slideshow if not already done
  if (!isInitialized) {
    initializeSlideshow();
  }
}

  // Function to load default playlist as fallback
  function loadDefaultPlaylist() {
    playlist = [
      'assets/gallery/bg-img.jpg',
      'assets/gallery/bg-img1.jpg',
      'assets/gallery/bg-img2.jpg',
      'assets/gallery/bg-img3.jpg',
      'assets/gallery/bg-img4.jpg',
      'assets/gallery/bg-img5.jpg',
      'assets/gallery/bg-img6.jpg',
      'assets/gallery/bg-img7.jpg',
      'assets/gallery/bg-img8.jpg',
      'assets/gallery/bg-img9.jpg',
      'assets/gallery/bg-img10.jpg',
      'assets/gallery/bg-img11.jpg',
      'assets/gallery/bg-img12.jpg',
      'assets/gallery/bg-img13.jpg',
      'assets/gallery/bg-img14.jpg'
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
    }, 300);
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
  });

  // Event listener for image loading errors
  image.addEventListener('error', (e) => {
    console.error('Image failed to load:', image.src, e);
  });

  // Initialize the slideshow when the script loads
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
