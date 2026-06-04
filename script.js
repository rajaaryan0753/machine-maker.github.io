(function () {
    'use strict';

    /* ── Theme toggle ── */
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            const isDark = theme === 'dark';
            themeToggle.setAttribute(
                'aria-label',
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
            );
            themeToggle.title = isDark ? 'Light mode' : 'Dark mode';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(next);
        });
        applyTheme(root.getAttribute('data-theme') || 'dark');
    }

    /* ── Boot sequence ── */
    const bootLines = [
        { text: '$ ssh raj@portfolio.dev', cls: 'cmd-line' },
        { text: '› Establishing secure connection', cls: 'info-line' },
        { text: '✓ Authenticated as raj', cls: 'ok-line' },
        { text: '$ load-portfolio --mode=production', cls: 'cmd-line' },
        { text: '› Compiling 3+ years of backend engineering', cls: 'info-line' },
        { text: '✓ Ready. Welcome.', cls: 'ok-line' },
    ];

    const bootScreen = document.getElementById('boot-screen');
    const bootLog = document.getElementById('boot-log');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function runBoot() {
        if (prefersReduced || sessionStorage.getItem('boot-seen')) {
            bootScreen.remove();
            return;
        }

        document.body.classList.add('booting');
        let i = 0;

        function addLine() {
            if (i >= bootLines.length) {
                setTimeout(hideBoot, 600);
                return;
            }
            const line = bootLines[i];
            const p = document.createElement('p');
            p.className = line.cls;
            p.textContent = line.text;
            bootLog.appendChild(p);
            i++;
            setTimeout(addLine, i === 1 ? 400 : 280);
        }

        addLine();
    }

    function hideBoot() {
        bootScreen.classList.add('hidden');
        document.body.classList.remove('booting');
        sessionStorage.setItem('boot-seen', '1');
        setTimeout(() => bootScreen.remove(), 600);
    }

    runBoot();

    /* ── Mobile nav ── */
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ── Active nav link on scroll ── */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function onScroll() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(a => {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    const phrases = [
    'Software Engineer @ Jio Platforms',
    'Building Scalable Microservices',
    'Spring Boot • Kafka • Redis',
    'Distributed Systems Engineer',
    'Elasticsearch • AWS',
    'System Design Enthusiast'
];

const rotatingText = document.getElementById('rotating-text');

if (rotatingText) {

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            rotatingText.textContent =
                currentPhrase.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }

        } else {

            rotatingText.textContent =
                currentPhrase.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? 40 : 80);
    }

    typeEffect();
}
})();
