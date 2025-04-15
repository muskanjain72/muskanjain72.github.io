window.addEventListener("load", () => {
    const splash = document.getElementById("splash-screen");
    const main = document.getElementById("main_content");

    setTimeout(() => {
        splash.style.opacity = 0;
        splash.style.transition = "opacity 1s ease-in-out";
        setTimeout(() => {
            splash.style.display = "none";
            main.style.display = "block";
        }, 1000);
    }, 2000);
});

function logEvent(eventType, element) {
    const timestamp = new Date().toLocaleString();
    let type = "unknown";

    if (element.tagName === "IMG") {
        type = "🖼️ image";
    } else if (element.tagName === "A") {
        type = "🔗 hyperlink";
    } else if (["P", "SPAN", "H2"].includes(element.tagName)) {
        type = "📝 text";
    } else if (element.classList.contains("tag")) {
        type = "💡 skill-tag";
    } else if (element.classList.contains("cv-button")) {
        type = "📄 cv-button";
    }

    console.log(`[${timestamp}] • ${eventType.toUpperCase()} • ${type} ➜`, element);
}

// Track all clicks
document.addEventListener("click", (e) => {
    logEvent("click", e.target);
});

// Track views using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            logEvent("view", entry.target);
            observer.unobserve(entry.target); // log only once
        }
    });
}, { threshold: 0.3 });

// Observe sections and elements after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const elementsToWatch = document.querySelectorAll("section, img, .tag, .cv-button");
    elementsToWatch.forEach(el => observer.observe(el));
});

document.getElementById('analyzeButton').addEventListener('click', function () {
    const text = document.getElementById('textInput').value;

    // if (text.length < 500) { // Just a simple check
    //   alert('Please enter a longer text (at least 10000 words recommended)');
    //   return;
    // }

    // Calculate metrics
    const letters = text.match(/[a-zA-Z]/g)?.length || 0;
    const words = text.match(/\b\w+\b/g)?.length || 0;
    const spaces = text.match(/\s/g)?.length || 0;
    const newlines = text.match(/\n/g)?.length || 0;
    const specialSymbols = text.match(/[^\w\s]/g)?.length || 0;

    // Tokenize for pronouns
    const pronouns = ['i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself',
        'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
        'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves',
        'they', 'them', 'their', 'theirs', 'themselves'];

    // Tokenize for prepositions
    const prepositions = ['about', 'above', 'across', 'after', 'against', 'along', 'among',
        'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside',
        'between', 'beyond', 'by', 'down', 'during', 'except', 'for', 'from',
        'in', 'inside', 'into', 'like', 'near', 'of', 'off', 'on', 'onto',
        'out', 'outside', 'over', 'past', 'through', 'to', 'toward', 'under',
        'underneath', 'until', 'up', 'upon', 'with', 'within', 'without'];

    // Tokenize for indefinite articles
    const articles = ['a', 'an', 'the'];

    const words_array = text.toLowerCase().match(/\b\w+\b/g) || [];

    // Count occurrences
    const pronounCount = {};
    const prepositionCount = {};
    const articleCount = {};

    words_array.forEach(word => {
        if (pronouns.includes(word)) {
            pronounCount[word] = (pronounCount[word] || 0) + 1;
        }

        if (prepositions.includes(word)) {
            prepositionCount[word] = (prepositionCount[word] || 0) + 1;
        }

        if (articles.includes(word)) {
            articleCount[word] = (articleCount[word] || 0) + 1;
        }
    });

    // Display results
    let resultsHTML = `
        <h3>Text Analysis Results</h3>
        <div class="results-card">
          <h4>Basic Metrics</h4>
          <p>Letters: ${letters}</p>
          <p>Words: ${words}</p>
          <p>Spaces: ${spaces}</p>
          <p>Newlines: ${newlines}</p>
          <p>Special Symbols: ${specialSymbols}</p>
        </div>
        
        <div class="results-card">
          <h4>Pronouns</h4>
          ${formatCountResults(pronounCount)}
        </div>
        
        <div class="results-card">
          <h4>Prepositions</h4>
          ${formatCountResults(prepositionCount)}
        </div>
        
        <div class="results-card">
          <h4>Articles</h4>
          ${formatCountResults(articleCount)}
        </div>
      `;

    document.getElementById('analysisResults').innerHTML = resultsHTML;
});

function formatCountResults(countObj) {
    if (Object.keys(countObj).length === 0) return '<p>None found</p>';

    return Object.entries(countObj)
        .sort((a, b) => b[1] - a[1])
        .map(([word, count]) => `<p>${word}: ${count}</p>`)
        .join('');
}
// // Back to top button functionality
// window.addEventListener('scroll', function () {
//     const backToTopButton = document.getElementById('backToTop');
//     if (window.scrollY > 300) {
//         backToTopButton.style.display = 'block';
//     } else {
//         backToTopButton.style.display = 'none';
//     }
// });
// document.getElementById('backToTop').addEventListener('click', function () {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// });
// let currentTab = 'family';

// document.querySelectorAll('.tab-button').forEach(btn => {
//   btn.addEventListener('click', () => {
//     // Switch tab button styling
//     document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
//     btn.classList.add('active');

//     // Show related slides
//     const tab = btn.getAttribute('data-tab');
//     currentTab = tab;
//     document.querySelectorAll('.slide-group').forEach(group => {
//       group.classList.toggle('hidden', group.getAttribute('data-tab') !== tab);
//     });
//   });
// });

// // Optional: if you want sliding logic
// let slideIndex = 0;

// function nextSlide() {
//   const activeGroup = document.querySelector(`.slide-group[data-tab="${currentTab}"]`);
//   const photos = activeGroup.children;
//   if (photos.length > 1) {
//     activeGroup.appendChild(photos[0]);
//   }
// }

// function prevSlide() {
//   const activeGroup = document.querySelector(`.slide-group[data-tab="${currentTab}"]`);
//   const photos = activeGroup.children;
//   if (photos.length > 1) {
//     activeGroup.insertBefore(photos[photos.length - 1], photos[0]);
//   }
// }
