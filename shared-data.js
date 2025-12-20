// Shared data for gallery and playlist
// This file is used by both admin panel and collections page

// Default gallery data - shows realistic "not set up" state
const defaultGalleryData = [
    {
        id: 1,
        path: 'assets/gallery/bg-img2.jpg',
        status: 'sold',
        images: ['assets/gallery/bg-img2.jpg', 'assets/gallery/bg-img.jpg', 'assets/gallery/bg-img8.jpg']
    },
    {
        id: 2,
        path: 'assets/gallery/bg-img4.jpg',
        status: 'sold',
        images: ['assets/gallery/bg-img4.jpg']
    },
    {
        id: 3,
        path: 'assets/gallery/bg-img5.jpg',
        status: 'sold',
        images: ['assets/gallery/bg-img5.jpg']
    },
    {
        id: 4,
        path: 'assets/gallery/bg-img10.jpg',
        status: 'sold',
        images: ['assets/gallery/bg-img10.jpg', 'assets/gallery/bg-img9.jpg']
    },
    {
        id: 5,
        path: 'assets/gallery/bg-img11.jpg',
        status: 'sold',
        images: ['assets/gallery/bg-img11.jpg', 'assets/gallery/bg-img6.jpg']
    },
    {
        id: 6,
        path: 'assets/gallery/bg-img13.jpg',
        status: 'sold',
        images: ['assets/gallery/bg-img13.jpg', 'assets/gallery/bg-img12.jpg', 'assets/gallery/bg-img3.jpg', 'assets/gallery/bg-img1.jpg']
    },
    {
        id: 7,
        path: 'assets/gallery/uploaded-1758398665173.jpg',
        status: 'sold',
        images: ['assets/gallery/uploaded-1758398665173.jpg', 'assets/gallery/bg-img15.jpg']
    },
    {
        id: 8,
        path: 'assets/gallery/bg-img17.jpg',
        status: 'sold',
        images: ['assets/gallery/bg-img17.jpg', 'assets/gallery/bg-img16.jpg']
    },
    {
        id: 9,
        path: 'assets/gallery/bg-img20.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img20.jpeg']
    },
    {
        id: 10,
        path: 'assets/gallery/bg-img21.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img21.jpeg']
    },
    {
        id: 11,
        path: 'assets/gallery/bg-img22.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img22.jpeg']
    },
    {
        id: 12,
        path: 'assets/gallery/bg-img27.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img27.jpeg']
    },
    {
        id: 13,
        path: 'assets/gallery/bg-img28.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img28.jpeg']
    },
    {
        id: 14,
        path: 'assets/gallery/bg-img29.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img29.jpeg']
    },
    {
        id: 15,
        path: 'assets/gallery/bg-img30.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img30.jpeg']
    },
    {
        id: 16,
        path: 'assets/gallery/bg-img32.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img32.jpeg']
    },
    {
        id: 17,
        path: 'assets/gallery/bg-img33.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img33.jpeg']
    },
    {
        id: 18,
        path: 'assets/gallery/bg-img34.jpeg',
        status: 'sold',
        images: ['assets/gallery/bg-img34.jpeg']
    }
];

// Default playlist data
const defaultPlaylistData = [
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
    'assets/gallery/bg-img17.jpg',
    'assets/gallery/bg-img28.jpeg',
    'assets/gallery/bg-img29.jpeg',
    'assets/gallery/bg-img30.jpeg',
    'assets/gallery/bg-img32.jpeg'
];

// Data management functions
const SharedData = {
    // Get gallery data (from localStorage or default)
    getGalleryData() {
        try {
            const stored = localStorage.getItem('galleryData');
            if (stored) {
                const parsed = JSON.parse(stored);
                return parsed;
            } else {
                // Return embedded data - no localStorage dependency!
                return this.getEmbeddedGalleryData();
            }
        } catch (error) {
            console.error('Error loading gallery data:', error);
            return this.getEmbeddedGalleryData();
        }
    },

    // Get embedded gallery data (domain-independent)
    getEmbeddedGalleryData() {
        return [
            {
                id: 1,
                path: 'assets/gallery/bg-img2.jpg',
                status: 'sold',
                images: ['assets/gallery/bg-img2.jpg', 'assets/gallery/bg-img.jpg', 'assets/gallery/bg-img8.jpg']
            },
            {
                id: 2,
                path: 'assets/gallery/bg-img4.jpg',
                status: 'sold',
                images: ['assets/gallery/bg-img4.jpg']
            },
            {
                id: 3,
                path: 'assets/gallery/bg-img5.jpg',
                status: 'sold',
                images: ['assets/gallery/bg-img5.jpg']
            },
            {
                id: 4,
                path: 'assets/gallery/bg-img10.jpg',
                status: 'sold',
                images: ['assets/gallery/bg-img10.jpg', 'assets/gallery/bg-img9.jpg']
            },
            {
                id: 5,
                path: 'assets/gallery/bg-img11.jpg',
                status: 'sold',
                images: ['assets/gallery/bg-img11.jpg', 'assets/gallery/bg-img6.jpg']
            },
            {
                id: 6,
                path: 'assets/gallery/bg-img13.jpg',
                status: 'sold',
                images: ['assets/gallery/bg-img13.jpg', 'assets/gallery/bg-img12.jpg', 'assets/gallery/bg-img3.jpg', 'assets/gallery/bg-img1.jpg']
            },
            {
                id: 7,
                path: 'assets/gallery/uploaded-1758398665173.jpg',
                status: 'sold',
                images: ['assets/gallery/uploaded-1758398665173.jpg', 'assets/gallery/bg-img15.jpg']
            },
            {
                id: 8,
                path: 'assets/gallery/bg-img17.jpg',
                status: 'sold',
                images: ['assets/gallery/bg-img17.jpg', 'assets/gallery/bg-img16.jpg']
            },
            {
                id: 9,
                path: 'assets/gallery/bg-img20.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img20.jpeg']
            },
            {
                id: 10,
                path: 'assets/gallery/bg-img21.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img21.jpeg']
            },
            {
                id: 11,
                path: 'assets/gallery/bg-img22.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img22.jpeg']
            },
            {
                id: 12,
                path: 'assets/gallery/bg-img27.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img27.jpeg']
            },
            {
                id: 13,
                path: 'assets/gallery/bg-img28.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img28.jpeg']
            },
            {
                id: 14,
                path: 'assets/gallery/bg-img29.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img29.jpeg']
            },
            {
                id: 15,
                path: 'assets/gallery/bg-img30.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img30.jpeg']
            },
            {
                id: 16,
                path: 'assets/gallery/bg-img32.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img32.jpeg']
            },
            {
                id: 17,
                path: 'assets/gallery/bg-img33.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img33.jpeg']
            },
            {
                id: 18,
                path: 'assets/gallery/bg-img34.jpeg',
                status: 'sold',
                images: ['assets/gallery/bg-img34.jpeg']
            }
        ];
    },

    // Save gallery data to localStorage
    saveGalleryData(data) {
        try {
            localStorage.setItem('galleryData', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving gallery data:', error);
            return false;
        }
    },

    // Get playlist data (from localStorage or default)
    getPlaylistData() {
        try {
            const stored = localStorage.getItem('playlistData');
            if (stored) {
                const parsed = JSON.parse(stored);
                return parsed;
            } else {
                // Return embedded data - no localStorage dependency!
                return this.getEmbeddedPlaylistData();
            }
        } catch (error) {
            console.error('Error loading playlist data:', error);
            return this.getEmbeddedPlaylistData();
        }
    },

    // Get embedded playlist data (domain-independent)
    getEmbeddedPlaylistData() {
        return [
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
            'assets/gallery/bg-img17.jpg',
            'assets/gallery/bg-img28.jpeg',
            'assets/gallery/bg-img29.jpeg',
            'assets/gallery/bg-img30.jpeg',
            'assets/gallery/bg-img32.jpeg'
        ];
    },

    // Save playlist data to localStorage
    savePlaylistData(data) {
        try {
            localStorage.setItem('playlistData', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving playlist data:', error);
            return false;
        }
    },

    // Reset to default data
    resetToDefault() {
        localStorage.removeItem('galleryData');
        localStorage.removeItem('playlistData');
    },

    // Check if data exists and is valid
    hasValidData() {
        try {
            const galleryData = localStorage.getItem('galleryData');
            const playlistData = localStorage.getItem('playlistData');
            return !!(galleryData && playlistData);
        } catch (error) {
            console.error('Error checking data validity:', error);
            return false;
        }
    },

    // Force save current data (for recovery)
    forceSaveDefaults() {
        this.saveGalleryData(this.getEmbeddedGalleryData());
        this.savePlaylistData(this.getEmbeddedPlaylistData());
    }
};

// Make it available globally
window.SharedData = SharedData;
