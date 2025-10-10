// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const loadingFill = document.querySelector('.loading-fill');
const loadingPercentage = document.querySelector('.loading-percentage');
const loadingStatus = document.querySelector('.loading-status');
const audioToggle = document.getElementById('audioToggle');
const bgm = document.getElementById('bgm');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Loading Screen Animation
let loadingProgress = 0;
const loadingSteps = [
    { progress: 20, status: 'システム初期化中...' },
    { progress: 40, status: 'ニューラルネットワーク構築中...' },
    { progress: 60, status: 'ホログラム投影準備中...' },
    { progress: 80, status: 'デジタル空間生成中...' },
    { progress: 100, status: '起動完了' }
];

let currentStep = 0;

function updateLoading() {
    if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        const targetProgress = step.progress;
        
        const progressInterval = setInterval(() => {
            loadingProgress += 2;
            loadingFill.style.width = `${loadingProgress}%`;
            loadingPercentage.textContent = `${loadingProgress}%`;
            
            if (loadingProgress >= targetProgress) {
                clearInterval(progressInterval);
                loadingStatus.textContent = step.status;
                currentStep++;
                
                if (currentStep < loadingSteps.length) {
                    setTimeout(updateLoading, 800);
                } else {
                    setTimeout(hideLoadingScreen, 1000);
                }
            }
        }, 50);
    }
}

function hideLoadingScreen() {
    loadingScreen.classList.add('loading-hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        initializeAnimations();
        setupAudio();
    }, 1000);
}

// Matrix Rain Effect
function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    const characters = '01アイウエオカキクセロXERO';
    
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.color = '#8b5cf6';
        drop.style.fontSize = '14px';
        drop.style.opacity = '0.7';
        drop.style.animation = `matrixDrop ${Math.random() * 3 + 2}s linear infinite`;
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.textContent = characters[Math.floor(Math.random() * characters.length)];
        matrixContainer.appendChild(drop);
    }
    
    // Add matrix drop animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixDrop {
            0% { top: -100px; opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { top: 100vh; opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Typing Animation
const typingText = document.querySelector('.typing-text');
const greetings = [
    'こんにちは。私の名前は',
    'Hello. My name is',
    'Hi there. I\'m',
    'Welcome. I am'
];

let greetingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeGreeting() {
    if (!typingText) return;
    
    if (isWaiting) {
        isWaiting = false;
        setTimeout(typeGreeting, 500);
        return;
    }
    
    const currentGreeting = greetings[greetingIndex];
    
    // requestAnimationFrameでDOM操作を最適化
    requestAnimationFrame(() => {
        if (isDeleting) {
            const newText = currentGreeting.substring(0, charIndex - 1);
            typingText.textContent = newText;
            charIndex--;
        } else {
            const newText = currentGreeting.substring(0, charIndex + 1);
            typingText.textContent = newText;
            charIndex++;
        }
    });
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentGreeting.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        greetingIndex = (greetingIndex + 1) % greetings.length;
        isWaiting = true;
        typeSpeed = 300;
    }
    
    setTimeout(typeGreeting, typeSpeed);
}

// Navigation Scroll Spy
function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation Event Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        scrollToSection(sectionId);
    });
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Skills Radar Chart
function createSkillsRadar() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    const skills = [
        { name: 'Python', value: 0.9 },
        { name: 'JavaScript', value: 0.85 },
        { name: 'HTML/CSS', value: 0.95 },
        { name: 'PC組み立て', value: 0.95 },
        { name: 'プログラミング', value: 0.9 },
        { name: 'デバッグ', value: 0.88 }
    ];
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;
    
    function drawRadarChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid circles
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Draw grid lines
        const angleStep = (2 * Math.PI) / skills.length;
        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw skill labels
            const labelX = centerX + Math.cos(angle) * (radius + 30);
            const labelY = centerY + Math.sin(angle) * (radius + 30);
            
            ctx.fillStyle = '#8b5cf6';
            ctx.font = '12px Orbitron';
            ctx.textAlign = 'center';
            ctx.fillText(skills[i].name, labelX, labelY);
        }
        
        // Draw skill values
        ctx.beginPath();
        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = skills[i].value;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw points
        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = skills[i].value;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#d946ef';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    drawRadarChart();
}

// Skills Animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Parallax Scrolling
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.neural-network, .digital-particles');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Cursor Effect
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

function updateCursor(e) {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    cursorOutline.style.left = e.clientX + 'px';
    cursorOutline.style.top = e.clientY + 'px';
}

// Hover Effects
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .cyber-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = '#d946ef';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = '#8b5cf6';
        });
    });
}

// Audio Setup
function setupAudio() {
    // Try to autoplay (might be blocked by browser)
    bgm.volume = 0.3;
    
    // Audio visualizer animation
    function animateVisualizer() {
        if (!bgm.paused) {
            const bars = document.querySelectorAll('.visualizer-bar');
            bars.forEach(bar => {
                const height = Math.random() * 25 + 5;
                bar.style.height = height + 'px';
            });
        }
        requestAnimationFrame(animateVisualizer);
    }
    
    animateVisualizer();
    
    audioToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play().catch(e => console.log('Audio play failed:', e));
            audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            bgm.pause();
            audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Try to start audio automatically
    document.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play().catch(e => console.log('Audio autoplay failed:', e));
        }
    }, { once: true });
}

// 3D Tilt Effect
function add3DTilt() {
    const tiltElements = document.querySelectorAll('.project-card, .contact-card, .info-item, .hobby-item');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Scroll Triggered Animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

// Neural Network Animation
function createNeuralNetworkAnimation() {
    const neuralNetwork = document.querySelector('.neural-network');
    
    // Create animated nodes
    for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.style.position = 'absolute';
        node.style.width = '4px';
        node.style.height = '4px';
        node.style.background = '#8b5cf6';
        node.style.borderRadius = '50%';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.opacity = '0.6';
        node.style.animation = `neuralPulse ${Math.random() * 3 + 2}s ease-in-out infinite`;
        neuralNetwork.appendChild(node);
    }
    
    // Add neural pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes neuralPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.5); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization using requestAnimationFrame
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    handleParallax();
    handleScrollAnimations();
    updateActiveNavLink();
    ticking = false;
}

// Initialize all animations
function initializeAnimations() {
    // Start typing animation
    typeGreeting();
    
    // Create effects
    createMatrixRain();
    createNeuralNetworkAnimation();
    
    // Initialize components
    setTimeout(() => {
        animateCounters();
        createSkillsRadar();
        animateSkills();
        add3DTilt();
        addHoverEffects();
    }, 500);
    
    // AOS (Animate On Scroll) alternative
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
}

// Event Listeners
window.addEventListener('scroll', requestTick);
window.addEventListener('mousemove', updateCursor);
window.addEventListener('resize', () => {
    createSkillsRadar();
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile device detection and optimization
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Reduce animations on mobile for better performance
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                *, *::before, *::after {
                    animation-duration: 0.5s !important;
                    animation-delay: 0s !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Disable cursor effects on mobile
        const cursorEffect = document.querySelector('.cursor-effect');
        if (cursorEffect) {
            cursorEffect.style.display = 'none';
        }
    }
    
    if (isIOS) {
        document.body.classList.add('ios-device');
        
        // iOS specific optimizations
        document.addEventListener('touchstart', () => {}, { passive: true });
        
        // Prevent iOS zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Optimize for high DPI screens
    if (window.devicePixelRatio > 1) {
        document.body.classList.add('high-dpi');
    }
    
    // Optimize scroll performance on mobile
    if (isMobile) {
        let ticking = false;
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveNavLink();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }
    
    // Start loading animation
    updateLoading();
    
    // Preload audio
    bgm.load();
});

// Handle visibility change (for audio management)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        bgm.pause();
    } else if (audioToggle.innerHTML.includes('volume-up')) {
        bgm.play().catch(e => console.log('Audio resume failed:', e));
    }
});

// Error handling for audio
bgm.addEventListener('error', (e) => {
    console.log('Audio error:', e);
    audioToggle.innerHTML = '<i class="fas fa-volume-off"></i>';
    audioToggle.disabled = true;
});

// GPU Acceleration utilities
function enableGPUAcceleration() {
    const gpuElements = document.querySelectorAll('.hologram-frame, .avatar-sphere, .ring, .cyber-button, .project-card');
    
    gpuElements.forEach(element => {
        element.style.willChange = 'transform';
        element.style.transform = 'translateZ(0)';
    });
}

// Call GPU acceleration on load
window.addEventListener('load', () => {
    enableGPUAcceleration();
});
