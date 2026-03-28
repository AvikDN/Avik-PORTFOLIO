/* ==========================================
   SMART LIGHTBOX (IMAGES & VIDEOS)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video'); // The new video player
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && galleryItems.length > 0) {
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const caption = item.querySelector('.overlay-info').innerText;
                lightboxCaption.innerText = caption;
                
                // 1. CHECK IF IT IS A VIDEO OR IMAGE
                const videoUrl = item.getAttribute('data-video');
                
                if (videoUrl) {
                    // It's a video! Hide image, show video player, load URL, and auto-play
                    lightboxImg.style.display = 'none';
                    lightboxVideo.style.display = 'block';
                    lightboxVideo.src = videoUrl;
                    lightboxVideo.play(); 
                } else {
                    // It's an image! Hide video player, show image
                    lightboxVideo.style.display = 'none';
                    lightboxImg.style.display = 'block';
                    const img = item.querySelector('img');
                    lightboxImg.src = img.src;
                }
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        // Helper function to close and stop video
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            // 🟢 CRITICAL: Pauses the video when you close the window!
            lightboxVideo.pause(); 
            lightboxVideo.src = ""; // Clears the video so it doesn't play in the background
        };

        // Close on 'X' click
        closeBtn.addEventListener('click', closeLightbox);

        // Close if clicking the black background
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== lightboxVideo) {
                closeLightbox();
            }
        });
    }
});