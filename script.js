// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createSparkles();
    setupCursorTrail();
    setupNavigation();
    loadLikes();
});

// Create sparkles animation
function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    const sparkleCount = 50;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

// Cursor trail effect
function setupCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Add sparkle on click
    document.addEventListener('click', (e) => {
        createClickSparkle(e.clientX, e.clientY);
    });
}

function createClickSparkle(x, y) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        sparkle.style.background = ['#ff69b4', '#00bfff', '#9370db', '#ffd700'][Math.floor(Math.random() * 4)];
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.boxShadow = '0 0 10px currentColor';
        
        const angle = (Math.PI * 2 * i) / 10;
        const distance = 50 + Math.random() * 50;
        const duration = 0.5 + Math.random() * 0.5;
        
        sparkle.style.transition = `all ${duration}s ease-out`;
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
            sparkle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => sparkle.remove(), duration * 1000);
    }
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            showSection(target);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Like functionality
let likes = JSON.parse(localStorage.getItem('blogLikes')) || {};

function likePost(postId) {
    if (!likes[postId]) {
        likes[postId] = 0;
    }
    likes[postId]++;
    localStorage.setItem('blogLikes', JSON.stringify(likes));
    
    const btn = event.target.closest('.like-btn');
    btn.classList.add('liked');
    updateLikeCount(postId);
    
    // Create floating heart
    createFloatingHeart(event.clientX, event.clientY);
    
    setTimeout(() => {
        btn.classList.remove('liked');
    }, 500);
}

function updateLikeCount(postId) {
    const likeCount = document.querySelector(`[data-post="${postId}"] .like-count`);
    if (likeCount) {
        likeCount.textContent = likes[postId] || 0;
    }
}

function loadLikes() {
    Object.keys(likes).forEach(postId => {
        updateLikeCount(postId);
    });
}

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '2em';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.transition = 'all 1s ease-out';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.transform = 'translateY(-100px) scale(1.5)';
        heart.style.opacity = '0';
    }, 10);
    
    setTimeout(() => heart.remove(), 1000);
}

// Comments functionality
let comments = JSON.parse(localStorage.getItem('blogComments')) || {};

function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    commentsSection.classList.toggle('active');
    
    if (commentsSection.classList.contains('active')) {
        if (!commentsSection.innerHTML.trim()) {
            renderComments(postId);
        }
    }
}

function renderComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    const postComments = comments[postId] || [];
    
    let html = '<div class="comment-form">';
    html += '<input type="text" class="comment-input" placeholder="Write a comment..." id="comment-input-' + postId + '">';
    html += '<button class="comment-submit" onclick="addComment(' + postId + ')">Post Comment ✨</button>';
    html += '</div>';
    
    if (postComments.length > 0) {
        html += '<div class="comments-list">';
        postComments.forEach(comment => {
            html += `
                <div class="comment">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-text">${comment.text}</div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    commentsSection.innerHTML = html;
}

function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    
    if (!text) {
        alert('Please write a comment! ✨');
        return;
    }
    
    if (!comments[postId]) {
        comments[postId] = [];
    }
    
    const authors = ['Alisaie', 'Alphinaud', 'Y\'shtola', 'Thancred', 'Urianger', 'G\'raha Tia', 'Estinien', 'Tataru'];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    
    comments[postId].push({
        author: randomAuthor,
        text: text,
        date: new Date().toLocaleDateString()
    });
    
    localStorage.setItem('blogComments', JSON.stringify(comments));
    renderComments(postId);
    input.value = '';
    
    // Add sparkle effect
    createClickSparkle(input.offsetLeft + input.offsetWidth / 2, input.offsetTop + input.offsetHeight / 2);
}

// Gallery modal
function openModal(item) {
    const modal = document.getElementById('modal');
    const modalBody = document.querySelector('.modal-body');
    const placeholder = item.querySelector('.gallery-placeholder').textContent;
    
    modalBody.innerHTML = `
        <h2 style="margin-bottom: 20px; color: #ffd700;">${placeholder}</h2>
        <p style="font-size: 1.1em; line-height: 1.8;">
            This is a placeholder for a screenshot! In a real blog, this would show an amazing picture from my adventures in Eorzea! ✨
        </p>
        <div style="margin-top: 30px; font-size: 3em;">📸✨</div>
    `;
    
    modal.classList.add('active');
    createClickSparkle(window.innerWidth / 2, window.innerHeight / 2);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add enter key support for comments
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('comment-input')) {
        const postId = e.target.id.split('-')[2];
        addComment(postId);
    }
});

// Add random sparkles on page
setInterval(() => {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    createClickSparkle(randomX, randomY);
}, 3000);

// Add hover effects to blog posts
document.querySelectorAll('.blog-post').forEach(post => {
    post.addEventListener('mouseenter', () => {
        post.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    post.addEventListener('mouseleave', () => {
        post.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to welcome message (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Create rainbow explosion
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createClickSparkle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 50);
    }
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '✨ EASTER EGG ACTIVATED! ✨';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '3em';
    message.style.fontWeight = '700';
    message.style.color = '#ffd700';
    message.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
    message.style.zIndex = '10000';
    message.style.pointerEvents = 'none';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transition = 'all 1s ease';
        message.style.opacity = '0';
        message.style.transform = 'translate(-50%, -50%) scale(2)';
        setTimeout(() => message.remove(), 1000);
    }, 2000);
}

