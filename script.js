(function () {
    'use strict';

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
            a.style.color = a.getAttribute('href') === '#' + current ? '#e2e8f0' : '';
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();
