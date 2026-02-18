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