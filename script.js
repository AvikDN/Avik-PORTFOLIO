
// --- MENU SLIDE LOGIC ---
const menuTrigger = document.getElementById('menuTrigger');
const closeBtn = document.getElementById('closeBtn');
const sideMenu = document.getElementById('sideMenu');

// Open menu
menuTrigger.addEventListener('click', () => {
    sideMenu.classList.add('open');
});

// Close menu
closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});

// --- TEXT SCRAMBLE LOGIC ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const scrambleElements = document.querySelectorAll(".scramble-link, .text-label");

scrambleElements.forEach(element => {
    // If it's a side-menu item, trigger on the whole anchor tag. Otherwise, trigger on the text itself.
    const triggerArea = element.classList.contains('text-label') ? element.parentElement : element;

    triggerArea.addEventListener("mouseenter", event => {
        let iterations = 0;
        
        // Clear existing interval to prevent overlapping animations
        if(element.interval) clearInterval(element.interval);

        element.interval = setInterval(() => {
            element.innerText = element.dataset.value
                .split("")
                .map((letter, index) => {
                    // Preserve spaces
                    if (element.dataset.value[index] === " ") return " ";
                    
                    if (index < iterations) {
                        return element.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iterations >= element.dataset.value.length) {
                clearInterval(element.interval);
            }
            
            iterations += 1 / 3; 
        }, 30);
    });
});
const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;

window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  parallax_el.forEach((el) => {
    const speedx = el.dataset.speedx || 0;
    const speedy = el.dataset.speedy || 0;

    el.style.transform = `
      translate(-50%, -50%)
      translateX(${ -xValue * speedx }px)
      translateY(${  yValue * speedy }px)
    `;
  });
});
/* ==========================================
   SIDE MENU LOGIC (OPEN, CLOSE, SCROLL)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.getElementById('menuTrigger');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeBtn');
    const menuLinks = document.querySelectorAll('.menu-link');

    // 1. Open the menu when the targeting reticle is clicked
    if (menuTrigger && sideMenu) {
        menuTrigger.addEventListener('click', () => {
            sideMenu.classList.add('open');
        });
    }

    // 2. Close the menu when the 'X' is clicked
    if (closeBtn && sideMenu) {
        closeBtn.addEventListener('click', () => {
            sideMenu.classList.remove('open');
        });
    }

    // 3. Close the menu automatically when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Closes the menu
            sideMenu.classList.remove('open');
        });
    });
});
// --- SCROLL REVEAL BARS (toggle on scroll up/down) ---
const revealBars = document.getElementById('revealBars');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      revealBars.classList.add('revealed');    // scroll down → bars slide away
    } else {
      revealBars.classList.remove('revealed'); // scroll up → bars come back
    }
  });
}, {
  threshold: 0.25
});

revealObserver.observe(revealBars.parentElement);

// --- PROJECT SHOWCASE INTERACTIVITY ---
const showcaseCards = document.querySelectorAll('.showcase-card');
const showcaseBg = document.getElementById('showcase-bg');
const projectTitle = document.getElementById('project-title');
const projectDesc = document.getElementById('project-desc');
const projectCategory = document.getElementById('project-category');

showcaseCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove active class from all, add to clicked
        showcaseCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Quick fade out
        showcaseBg.style.opacity = 0;
        projectTitle.style.opacity = 0;
        projectDesc.style.opacity = 0;

        // Update content and fade back in
        setTimeout(() => {
            showcaseBg.src = card.getAttribute('data-bg');
            projectTitle.innerText = card.getAttribute('data-title');
            projectDesc.innerText = card.getAttribute('data-desc');
            projectCategory.innerText = card.getAttribute('data-category');
            
            showcaseBg.style.opacity = 1;
            projectTitle.style.opacity = 1;
            projectDesc.style.opacity = 1;
        }, 300); 
    });
});
/* ==========================================
       6. AVIK NAME FLY-IN TRIGGER
       ========================================== */
    const avikName = document.getElementById('avik-name');
    
    if (avikName) {
        const nameObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // When you scroll to the name, add the class to fire the CSS animations!
                avikName.classList.add('animate');
                
                // Stop watching so it stays assembled
                nameObserver.disconnect();
            }
        }, { threshold: 0.3 }); // Triggers when 30% of the name area is visible

        nameObserver.observe(avikName);
    }
/* ==========================================
       5. GLITCH TYPEWRITER EFFECT (MYSHELF BIO)
       ========================================== */
    const bioText = document.getElementById('glitch-bio');

    if (bioText) {
        // 1. Save the original HTML (with the <b> and <br> tags)
        const originalHTML = bioText.innerHTML;
        
        // 2. Clear the paragraph and make it visible again
        bioText.innerHTML = '';
        bioText.style.opacity = '1'; 

        // 3. Smart Parser: Separate HTML tags from normal letters
        const parts = [];
        let inTag = false;
        let currentTag = '';

        for (let i = 0; i < originalHTML.length; i++) {
            if (originalHTML[i] === '<') {
                inTag = true;
                currentTag = '<';
            } else if (originalHTML[i] === '>') {
                inTag = false;
                currentTag += '>';
                parts.push(currentTag);
                currentTag = '';
            } else if (inTag) {
                currentTag += originalHTML[i];
            } else {
                parts.push(originalHTML[i]);
            }
        }

        const glitchChars = "!<>-_\\\\/[]{}—=+*^?#_";
        let currentIndex = 0;
        let printedHTML = '';

      // 4. The Glitch Engine (HYPER-SPEED VERSION)
        const typeNext = () => {
            if (currentIndex >= parts.length) {
                // Finished typing! Leave the cursor blinking.
                bioText.innerHTML = printedHTML + '<span class="typing-cursor"></span>';
                return;
            }

            const part = parts[currentIndex];

            if (part.startsWith('<')) {
                // It's an HTML tag. Drop it in instantly.
                printedHTML += part;
                currentIndex++;
                typeNext();
            } else {
                // It's a normal letter.
                let glitchCount = 0;
                
                // SPEED UP 1: Only glitch 1 time per letter (was 2 to 4)
                const maxGlitches = 1; 

                const glitchInterval = setInterval(() => {
                    if (glitchCount >= maxGlitches) {
                        clearInterval(glitchInterval);
                        printedHTML += part; // Lock in the correct letter
                        bioText.innerHTML = printedHTML + '<span class="typing-cursor"></span>';
                        currentIndex++;
                        
                        // SPEED UP 2: Wait only 5ms before the next letter (was 20ms)
                        setTimeout(typeNext, 5); 
                    } else {
                        // Flash a random matrix character
                        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        bioText.innerHTML = printedHTML + randomChar + '<span class="typing-cursor"></span>';
                        glitchCount++;
                    }
                // SPEED UP 3: Flash the glitch character for only 10ms (was 20ms)
                }, 0.5); 
            }
        };
      

        // 5. Scroll Trigger: Only start typing when you scroll to it
        const bioObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeNext();
                bioObserver.disconnect(); // Stop watching so it only types once
            }
        }, { threshold: 0.5 });

        bioObserver.observe(bioText);
    }

/* ==========================================
       4. APNG SCROLL TRIGGER (INFINITE RESTART)
       ========================================== */
    const statusApng = document.getElementById('status-apng');
    
    if (statusApng) {
        const apngObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                
                if (entry.isIntersecting) {
                    // 1. IT ENTERED THE SCREEN: 
                    // Grab the file path, add the cache buster, and play it!
                    const realSrc = statusApng.getAttribute('data-src');
                    const cacheBusterUrl = realSrc + '?t=' + new Date().getTime();
                    statusApng.setAttribute('src', cacheBusterUrl);
                    
                } else {
                    // 2. IT LEFT THE SCREEN: 
                    // Swap it back to the invisible pixel. 
                    // This "turns it off" so it's ready to restart next time!
                    statusApng.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
                }
                
                // NOTICE: We completely removed the "unobserve" command!
                // Now it will watch this badge forever.
            });
        }, { 
            threshold: 0.1 
        });

        apngObserver.observe(statusApng);
    }

//-----ROBOT-----//
document.addEventListener("mousemove", (event) => {
  const lidLeft = document.getElementById("lid-left");
  const lidRight = document.getElementById("lid-right");
  const pupils = document.querySelectorAll(".pupil");

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // --- 1. EYEBROW (EYELID) LOGIC ---
  const dxCenter = mouseX - centerX;
  const dyCenter = mouseY - centerY;

  // Check if mouse is moving more Horizontally or Vertically
  if (Math.abs(dxCenter) > Math.abs(dyCenter)) {
    if (dxCenter < 0) {
      // Cursor is Left: Left UP, Right PARTIAL DOWN
      lidLeft.style.transform = "translateY(-100%)"; 
      lidRight.style.transform = "translateY(0%)";   
    } else {
      // Cursor is Right: Left PARTIAL DOWN, Right UP
      lidLeft.style.transform = "translateY(0%)";    
      lidRight.style.transform = "translateY(-100%)";
    }
  } else {
    if (dyCenter < 0) {
      // Cursor is Up: Both UP
      lidLeft.style.transform = "translateY(-100%)"; 
      lidRight.style.transform = "translateY(-100%)"; 
    } else {
      // Cursor is Down: Both PARTIAL DOWN
      lidLeft.style.transform = "translateY(0%)";    
      lidRight.style.transform = "translateY(0%)";
    }
  }

  // --- 2. PUPIL TRACKING LOGIC ---
  pupils.forEach(pupil => {
    const eye = pupil.parentElement;
    const rect = eye.getBoundingClientRect();
    
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
    const maxMove = (rect.width / 2) - (pupil.offsetWidth / 2) - 5; 
    
    // Calculate distance from eye, capped at maxMove
    let distance = Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 10;
    if (distance > maxMove) distance = maxMove;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
  });
});
// --- 3. CLICK EVENT LOGIC ---
const robotFace = document.querySelector(".robot-face");
const allTeeth = document.querySelectorAll(".tooth");

// When you press the mouse button down
robotFace.addEventListener("mousedown", () => {
  allTeeth.forEach(tooth => {
    tooth.classList.add("angry");
  });
});

// When you release the mouse button
robotFace.addEventListener("mouseup", () => {
  allTeeth.forEach(tooth => {
    tooth.classList.remove("angry");
  });
});

// Just in case you drag your mouse off the face while clicking
robotFace.addEventListener("mouseleave", () => {
  allTeeth.forEach(tooth => {
    tooth.classList.remove("angry");
  });
});
// ROBOT_______//



// Look for this line at the bottom of your JS and add the new class to the end!
// Add .uiux-bento-section to the end of the list!
const elementsToAnimate = document.querySelectorAll('.shape-container, .video-shape-wrapper, .showcase-section, .graphics-bento-section, .motion-bento-section, .uiux-bento-section');
// _SENDING MAILBOX_//
function sendmail(event) {
    // 1. This completely stops the page from reloading!
    event.preventDefault(); 

    // 2. Grabs the values using the new IDs we just added to your HTML
    const templateParams = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value,
    };

    // 3. Sends the data to EmailJS
    emailjs
        .send("service_5v5g7up", "template_w50ewcc", templateParams)
        .then(() => {
            alert("Email sent successfully!");
            document.getElementById("contact-form").reset(); // Clears the form!
        })
        .catch((error) => {
            alert("Failed to send email. Please try again.");
            console.log("EMAILJS ERROR:", error); 
        });
}