/* ==========================================================================
   THEME MANAGER
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Retrieve saved theme or default to system preference
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return systemPrefersDark ? 'dark' : 'light';
};

// Apply theme to HTML
const setTheme = (theme) => {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

// Initialize theme
setTheme(getPreferredTheme());

// Event listener for theme toggle
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
const mobileNavClose = document.getElementById('mobile-nav-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

const openMobileMenu = () => {
  mobileNavOverlay.classList.add('active');
  mobileNavDrawer.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeMobileMenu = () => {
  mobileNavOverlay.classList.remove('active');
  mobileNavDrawer.classList.remove('active');
  document.body.style.overflow = '';
};

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', openMobileMenu);
  mobileNavClose.addEventListener('click', closeMobileMenu);
  mobileNavOverlay.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/* ==========================================================================
   INTERACTIVE GEOMETRIC CARD (HERO)
   ========================================================================== */
const heroCard = document.querySelector('.interactive-geometric-card');
const subNodes = document.querySelectorAll('.sub-node');

if (heroCard) {
  heroCard.addEventListener('mousemove', (e) => {
    const cardRect = heroCard.getBoundingClientRect();
    
    // Calculate cursor position relative to card center (-1 to 1 range)
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    const cursorX = e.clientX - cardRect.left - cardWidth / 2;
    const cursorY = e.clientY - cardRect.top - cardHeight / 2;
    
    const rotateX = (-cursorY / cardHeight) * 15; // Max 15 deg tilt
    const rotateY = (cursorX / cardWidth) * 15;
    
    // Apply 3D perspective transform
    heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    
    // Subtle node parallax offsets
    subNodes.forEach((node, index) => {
      const depth = (index + 1) * 3;
      const offsetX = (cursorX / cardWidth) * depth;
      const offsetY = (cursorY / cardHeight) * depth;
      node.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });

  heroCard.addEventListener('mouseleave', () => {
    // Smoothly reset tilt
    heroCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
    subNodes.forEach(node => {
      node.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ==========================================================================
   SECOPS TERMINAL SANDBOX
   ========================================================================== */
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');
const shortcutButtons = document.querySelectorAll('.shortcut-btn');

// Command database
const COMMANDS = {
  help: () => [
    'Available commands:',
    '  whois       - About Vidya Bodepudi & professional summary',
    '  pillars     - Read the four core dimensions of executive impact',
    '  speaking    - Recent presentations, studies, and publication logs',
    '  math        - Render structural applied convergence graph',
    '  goalie      - The correlation between goalie crease & cybersecurity',
    '  rpg         - Details on FAITH tabletop campaign and creative production',
    '  contact     - View secure channels to connect',
    '  clear       - Clear the console outputs'
  ],
  whois: () => [
    '-------------------------------------------------------',
    'VIDYA BODEPUDI - Global Director of Cybersecurity',
    '-------------------------------------------------------',
    '  Executive leader securing high-performance networks.',
    '  Background in Applied Mathematics & Systems Infrastructure.',
    '  Former lacrosse goalie, integrating athletic precision with',
    '  rapid, high-pressure defense architecture.',
    '  Producer & game designer for tabletop gaming campaigns.',
    '-------------------------------------------------------'
  ],
  pillars: () => [
    '[STRATEGIC IMPACT PILLARS]',
    '  1. CYBERSECURITY LEADERSHIP // Directing global programs, auditing environments,',
    '     securing grid infrastructures, secret harvesting auditing.',
    '  2. APPLIED MATHEMATICS // Using statistical structures, numeric calculation,',
    '     and math frameworks to model threats and optimize networks.',
    '  3. HIGH-PRESSURE DEPLOYMENT // Guiding teams with athletic poise, managing,',
    '     mitigating, and leading through active technical incidents.',
    '  4. CREATIVE PRODUCTION // Developing rules systems, complex balancing,',
    '     and project coordination loops.'
  ],
  speaking: () => [
    '[THOUGHT LEADERSHIP & OUTPUT LOGS]',
    '  * CONFS: "High-Performance Secret Harvesting"',
    '    Delivered at Sec Nerds: The Conference 2026 (SF Bay Area)',
    '    Abstract: Advanced environment secret detection at line-rate.',
    '',
    '  * SURVEYS: "Navigating InfoSec Burnout in High-Pressure Operations"',
    '    A dataset study detailing structural resilience and team preservation.',
    '',
    '  * PUBLICATIONS: "FAITH: Sci-Fi Tabletop Campaign"',
    '    Creative producer credits. System balance and game theory design.'
  ],
  math: () => [
    '  [CONVERGENCE ALGORITHM MODEL]',
    '       f(s) = \u222B [ \u0394t \u00B7 (Risk \u00D7 Threat) ] / Compliance',
    '  ',
    '  100% |        /\\  (High-Performance Audits)',
    '       |       /  \\',
    '   50% |  /\\  /    \\  (Continuous Verification)',
    '       | /  \\/      \\',
    '    0% |__________________',
    '       0ms     50ms    100ms  [SECRET INGEST TIME]',
    '  ',
    '  -> Applied Mathematics converge with line-rate SecOps.'
  ],
  goalie: () => [
    '[THE CREASE AND THE COMPROMISE]',
    '  "Playing goalie isn\'t about avoidance; it\'s about position."',
    '  In lacrosse, the goalie controls the defense, coordinates alignments,',
    '  and blocks high-velocity incoming threats under intense pressure.',
    '  ',
    '  Cybersecurity is identical. True defense requires:',
    '  - Full 360\u00B0 grid visibility.',
    '  - Immediate reflex responses without hesitation.',
    '  - Leading from the rear with absolute calm.'
  ],
  rpg: () => [
    '[WORLD ARCHITECTURE & CREATIVE DESIGN]',
    '  * Project: FAITH - Sci-Fi Tabletop RPG Starter Box',
    '  * Role: Creative Producer / Systems Balancing Engineer',
    '  * Key Work: Crafting probability curve balance systems, state vectors,',
    '    grid dynamics, and collaborative narrative frameworks.',
    '  -> Multi-disciplinary worldbuilding mapped directly to complex tech scaling.'
  ],
  contact: () => [
    'CONNECT SECURELY:',
    '  - EMAIL:  vidya@vidyabodepudi.com',
    '  - LOC:    San Francisco Bay Area, CA',
    '  - LI:     linkedin.com (Use header shortcut link)'
  ],
  clear: () => null
};

// Simulated boot loader inside terminal on load
const runTerminalBoot = () => {
  const bootLines = [
    { text: '[SEC-OPS INIT] Booting Vidya Bodepudi Personal Hub Sandbox...', delay: 0 },
    { text: '[SYSTEM] Secure tunnel established (Port: 2600Hz).', delay: 150 },
    { text: '[SCAN] Auditing local workspace environment...', delay: 350 },
    { text: '[SUCCESS] 0 compromised secrets found. Infrastructure secure.', delay: 600 },
    { text: '[READY] Terminal active. Type \'help\' or select shortcuts below.', delay: 800 }
  ];

  bootLines.forEach(line => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'terminal-output-line';
      if (line.text.startsWith('[SUCCESS]') || line.text.startsWith('[READY]')) {
        div.className += ' terminal-system-line';
      } else if (line.text.startsWith('[SCAN]') || line.text.startsWith('[SEC-OPS]')) {
        div.className += ' terminal-accent-line';
      }
      div.textContent = line.text;
      terminalBody.appendChild(div);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, line.delay);
  });
};

// Process terminal input
const processCommand = (rawInput) => {
  const input = rawInput.trim().toLowerCase();
  
  // Print user command prompt first
  const cmdRow = document.createElement('div');
  cmdRow.className = 'terminal-output-line';
  cmdRow.innerHTML = `<span class="prompt-symbol">&gt;</span> ${rawInput}`;
  terminalBody.appendChild(cmdRow);

  if (input === '') {
    terminalBody.scrollTop = terminalBody.scrollHeight;
    return;
  }

  if (COMMANDS[input]) {
    const outputs = COMMANDS[input]();
    if (outputs !== null) {
      outputs.forEach(line => {
        const div = document.createElement('div');
        div.className = 'terminal-output-line';
        if (line.startsWith('[') || line.startsWith('CONNECT')) {
          div.className += ' terminal-accent-line';
        }
        div.textContent = line;
        terminalBody.appendChild(div);
      });
    } else {
      // clear command
      terminalBody.innerHTML = '';
    }
  } else {
    // Unrecognized command
    const div = document.createElement('div');
    div.className = 'terminal-output-line';
    div.innerHTML = `<span style="color:#ef4444;">[ERROR] Command '${rawInput}' unrecognized.</span> Type 'help' for options.`;
    terminalBody.appendChild(div);
  }

  terminalBody.scrollTop = terminalBody.scrollHeight;
};

// Input event listener
if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      processCommand(val);
      terminalInput.value = '';
    }
  });
  
  // Shortcut buttons triggers
  shortcutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      processCommand(cmd);
      terminalInput.focus();
    });
  });

  // Focus input if user clicks terminal body
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });
}

// Initial Boot Sequence
runTerminalBoot();

/* ==========================================================================
   CONTACT FORM HANDLER
   ========================================================================== */
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const formSubmitBtn = document.getElementById('form-submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear old feedback
    formFeedback.textContent = '';
    formFeedback.className = 'form-feedback font-mono';
    
    // Animated submission loading state
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Encrypting transmission...';
    formFeedback.textContent = '[SEC-CONN] Establishing encrypted handshake...';
    
    setTimeout(() => {
      formFeedback.textContent = '[HANDSHAKE] Handshake secured. Packing payload...';
      
      setTimeout(() => {
        formSubmitBtn.textContent = 'Send Secure Message';
        formSubmitBtn.disabled = false;
        formFeedback.textContent = '[SUCCESS] Message transmitted successfully. Security response queued.';
        formFeedback.className += ' success';
        
        // Reset form
        contactForm.reset();
      }, 1000);
    }, 1200);
  });
}

/* ==========================================================================
   BROWSER CONSOLE EASTER EGGS
   ========================================================================== */
// Styled banner
console.log('%c> Welcome to vidyabodepudi.com', 'color: #ea580c; font-family: monospace; font-size: 14px; font-weight: bold;');
console.log('%c> Type "help()" or "whois()" for browser console commands.', 'color: #ea580c; font-family: monospace; font-size: 12px;');

window.help = function() {
  console.log('%c\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510', 'color: #ea580c; font-family: monospace;');
  console.log('%c\u2502  AVAILABLE CONSOLE EASTER EGGS        \u2502', 'color: #ea580c; font-family: monospace;');
  console.log('%c\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524', 'color: #ea580c; font-family: monospace;');
  console.log('%c\u2502  whois()   - Executive biography       \u2502', 'color: #ea580c; font-family: monospace;');
  console.log('%c\u2502  math()    - Convergence equation      \u2502', 'color: #ea580c; font-family: monospace;');
  console.log('%c\u2502  goalie()  - Goalie crease security   \u2502', 'color: #ea580c; font-family: monospace;');
  console.log('%c\u2502  rpg()     - Tabletop RPG production   \u2502', 'color: #ea580c; font-family: monospace;');
  console.log('%c\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518', 'color: #ea580c; font-family: monospace;');
  return 'Sandbox command initialized.';
};

window.whois = function() {
  console.log('%c> Vidya Bodepudi — Global Cybersecurity Director', 'color: #ea580c; font-family: monospace; font-size: 13px; font-weight: bold;');
  console.log('%c  study: Applied Mathematics (UC Davis)', 'color: #888; font-family: monospace;');
  console.log('%c  defends: High-pressure infrastructure systems', 'color: #888; font-family: monospace;');
  console.log('%c  produces: Tabletop gaming campaigns & narratives', 'color: #888; font-family: monospace;');
  return '200 OK';
};

window.math = function() {
  console.log('%c> Risk convergence convergence formula:', 'color: #ea580c; font-family: monospace;');
  console.log('%c  f(s) = \u222B [ \u0394t \u00B7 (Risk \u00D7 Threat) ] / Compliance', 'color: #fb923c; font-family: monospace; font-weight: bold;');
  return 'Convergence computed.';
};

window.goalie = function() {
  console.log('%c> Defensive Alignment Creed:', 'color: #ea580c; font-family: monospace;');
  console.log('%c  "A goalie manages the field, block the threats, keep the poise."', 'color: #fb923c; font-family: monospace; font-style: italic;');
  return 'Poise value maximum.';
};

window.rpg = function() {
  console.log('%c> FAITH Production Matrix:', 'color: #ea580c; font-family: monospace;');
  console.log('%c  Rule Design + Narrative System + Probability Curves = World Balanced.', 'color: #fb923c; font-family: monospace;');
  return 'Systems validated.';
};
