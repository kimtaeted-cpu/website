document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Reservation Timer (10 Minutes) ---
    startTimer(10 * 60, document.querySelector('#timer'));

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        let interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (display) {
                display.textContent = minutes + ":" + seconds;
            }

            if (--timer < 0) {
                timer = duration; // Loop for demo
            }
        }, 1000);
    }

    // --- 2. Dynamic Stock Logic (Smart Scarcity) ---
    // Settings
    let currentStock = 12; // Start believable
    const minStock = 3;    // Floor (never hit 0)
    const stockDisplay = document.querySelector('.highlight-red'); // The "5 items" text
    const progressBar = document.querySelector('.progress-bar');
    const maxStockReference = 15; // To calculate bar width %

    if (stockDisplay && progressBar) {
        // Initialize
        updateStockVisuals(currentStock);

        // Randomly decrease
        const stockInterval = setInterval(() => {
            // Stop if we hit floor
            if (currentStock <= minStock) {
                clearInterval(stockInterval);
                return;
            }

            // 50% chance to drop on each tick (to make it feel organic, not robotic)
            if (Math.random() > 0.5) {
                currentStock--;
                updateStockVisuals(currentStock);
            }

        }, 4000); // Check every 4 seconds
    }

    function updateStockVisuals(count) {
        // Update Text
        stockDisplay.textContent = count + " items";

        // Update Bar Width
        const percentage = (count / maxStockReference) * 100;
        progressBar.style.width = percentage + "%";

        // Optional: Flash color if critical
        if (count <= 5) {
            stockDisplay.style.color = "#ef4444"; // Darker red
        }
    }

    // --- 3. Package Selection Logic ---
    window.selectPackage = function (packageId) {
        // Data
        const packages = {
            1: { count: 1, name: "KimTae M8 AI Translator", price: 48.27, save: 72.41 },
            2: { count: 2, name: "2.0x KimTae M8 (Pair)", price: 84.48, save: 156.88 },
            3: { count: 3, name: "3.0x KimTae M8 (Family Pack)", price: 108.61, save: 253.43 },
            4: { count: 4, name: "4.0x KimTae M8 (Enterprise)", price: 120.68, save: 362.04 }
        };

        const choice = packages[packageId];
        if (!choice) return;

        // Visual Selection
        document.querySelectorAll('.package-option').forEach(el => {
            el.classList.remove('selected');
            el.querySelector('.radio-circle').classList.remove('checked');
        });

        // Select clicked (relying on nth-type or ID would be safer but order matches)
        const selectedEl = document.querySelectorAll('.package-option')[packageId - 1];
        if (selectedEl) {
            selectedEl.classList.add('selected');
            selectedEl.querySelector('.radio-circle').classList.add('checked');
        }

        // Update Summary
        // 1. Product Name & Qty
        const qs = (s) => document.querySelector(s);

        qs('.prod-details h3').textContent = choice.name;
        qs('.qty-badge').textContent = choice.count;

        // 2. Price Breakdown
        // Subtotal (fake logic: price + discount)
        const subtotal = (choice.price + choice.save).toFixed(2);
        qs('.price-breakdown .row:nth-child(1) span:last-child').textContent = "$" + subtotal;

        // Discount
        qs('.price-breakdown .row:nth-child(2) span:last-child').textContent = "-$" + choice.save.toFixed(2);

        // Total
        qs('.total-price').innerHTML = `<span class="currency">USD</span> $${choice.price.toFixed(2)}`;

        // Product Price Top Right
        qs('.prod-price').textContent = "$" + choice.price.toFixed(2);
    };
});
