/* ============================================================
   Navnit Kumar — DevOps Engineer Portfolio
   Vanilla JS (ES6) — all interactions and animations
   ============================================================ */
'use strict';

/* ============================================================
   Page Loader
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 600);
});

/* ============================================================
   Custom Cursor
   ============================================================ */
(() => {
  if (matchMedia('(pointer: coarse)').matches) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  const loop = () => {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  };
  loop();

  document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card, .contact-card, .tl-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });
})();

/* ============================================================
   Scroll Progress + Navbar + Scroll-to-top
   ============================================================ */
(() => {
  const progress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');

  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = scrolled + '%';

    navbar.classList.toggle('scrolled', h.scrollTop > 50);
    scrollTop.classList.toggle('show', h.scrollTop > 600);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   Mobile Hamburger Menu
   ============================================================ */
(() => {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');

  const toggle = () => {
    menu.classList.toggle('open');
    burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', menu.classList.contains('open'));
  };

  burger.addEventListener('click', toggle);
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('open');
    });
  });
})();

/* ============================================================
   Active Nav Link on Scroll (Scroll Spy)
   ============================================================ */
(() => {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const spy = () => {
    const pos = window.scrollY + 120;
    let current = 'home';
    sections.forEach(s => {
      if (pos >= s.offsetTop) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', spy, { passive: true });
  spy();
})();

/* ============================================================
   Typing Animation
   ============================================================ */
(() => {
  const el = document.getElementById('typed');
  if (!el) return;
  const roles = ['DevOps Engineer', 'Cloud Engineer', 'AWS Enthusiast', 'Automation Engineer'];
  let i = 0, char = 0, deleting = false;

  const type = () => {
    const word = roles[i];
    if (deleting) {
      char--;
      el.textContent = word.slice(0, char);
      if (char === 0) { deleting = false; i = (i + 1) % roles.length; setTimeout(type, 400); return; }
      setTimeout(type, 45);
    } else {
      char++;
      el.textContent = word.slice(0, char);
      if (char === word.length) { deleting = true; setTimeout(type, 1800); return; }
      setTimeout(type, 90);
    }
  };
  type();
})();

/* ============================================================
   Particle Background (Canvas)
   ============================================================ */
(() => {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 70;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };

  const colors = ['#00e5ff', '#7c3aed', '#38bdf8'];

  const init = () => {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.4,
        c: colors[Math.floor(Math.random() * colors.length)],
        a: Math.random() * 0.5 + 0.2
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = p.a;
      ctx.fill();
    });
    // connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].c;
          ctx.globalAlpha = (1 - dist / 120) * 0.12;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };

  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ============================================================
   Floating DevOps Icons Background
   ============================================================ */
(() => {
  const container = document.getElementById('floatingIcons');
  const svgs = {
    docker: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="#00e5ff" d="M22 9.6c-.4-.3-1.5-.4-2.3-.3-.1-.8-.6-1.5-1.3-2.1l-.4-.3-.3.4c-.6.7-.8 1.8-.7 2.6-1.5.1-2.9.9-3.6 2H4.5C2.6 12.5 1 14.1 1 16c0 2.8 2.6 4.4 5 4.4 4.1 0 7-2 9.5-5.7 1.5.1 3-.3 3.7-1.3.2-.3.4-.7.5-1.1.6-.1 1.4-.4 1.8-.9.4-.4.5-1.1.5-1.8z"/></svg>',
    kubernetes: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="#38bdf8" d="M12 1.5 2.5 5.9v10.2L12 22.5l9.5-6.4V5.9L12 1.5zm0 3 6.5 4.3v6.4L12 19.5 5.5 15.2V8.8L12 4.5z"/></svg>',
    terraform: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="#7c3aed" d="M1 7v10l5 3V10L1 7zm6-3v10l5 3V7L7 4zm6 3v10l5 3V10l-5-3zm6-3v10l4 2V6l-4-2z"/></svg>',
    jenkins: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="#00e5ff" d="M12 2a4 4 0 0 0-4 4v3H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v3h-4V6a2 2 0 0 1 2-2z"/></svg>',
    git: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="#7c3aed" d="M23.5 11l-10-10a1.4 1.4 0 0 0-2 0L9 3.5l2.5 2.5a1.7 1.7 0 0 1 2.2 2.2l2.4 2.4a1.7 1.7 0 1 1-1 1L13 9.4v5.3a1.7 1.7 0 1 1-1.4 0V9.3a1.7 1.7 0 0 1-1-2.8L8 4.5.5 11a1.4 1.4 0 0 0 0 2l10 10a1.4 1.4 0 0 0 2 0l9-9a1.4 1.4 0 0 0 0-2z"/></svg>',
    linux: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="#38bdf8" d="M12 2C8 2 7 5 7 8c0 2 1 4 1 6 0 3-3 5-3 9 0 3 4 4 7 4s7-1 7-4c0-4-3-6-3-9 0-2 1-4 1-6 0-3-1-6-5-6z"/></svg>',
    nginx: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="#00e5ff" d="M12 1 2 7v10l10 6 10-6V7L12 1zm0 4 6 3.5v7L12 19l-6-3.5v-7L12 5zm-1 4v6h2v-4l3 4h2V9h-2v4l-3-4h-2z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" width="48" height="48"><path fill="#38bdf8" d="M6 20a5 5 0 0 1-1-9.9A6 6 0 0 1 17 9a4.5 4.5 0 0 1 2 8.6H6z"/></svg>'
  };
  const keys = Object.keys(svgs);
  const count = window.innerWidth < 768 ? 6 : 12;

  for (let i = 0; i < count; i++) {
    const key = keys[Math.floor(Math.random() * keys.length)];
    const el = document.createElement('div');
    el.className = 'float-icon';
    el.innerHTML = svgs[key];
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDuration = (Math.random() * 20 + 18) + 's';
    el.style.animationDelay = -Math.random() * 20 + 's';
    el.style.width = (Math.random() * 30 + 36) + 'px';
    container.appendChild(el);
  }
})();

/* ============================================================
   Skills Data + Render
   ============================================================ */
(() => {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  // AWS custom SVG (not on Simple Icons)
  const awsSVG = `<svg viewBox="0 0 24 24" width="48" height="48"><path fill="#00e5ff" d="M6.7 14.7c0 .3 0 .5.2.7.1.1.3.2.4.2.2 0 .3 0 .4-.1.1-.1.1-.3.1-.6V11h1.2v3.8c0 .6-.1 1-.4 1.3-.3.3-.7.4-1.3.4-.5 0-.9-.1-1.2-.4-.3-.3-.4-.7-.4-1.3V11h1.2v3.7zm3.8-2.6L8.6 11h1.4l1 1.8L12 11h1.3l-1.9 3.2v2.2h-1.2v-2.2l-1.7-2.9zm4.9 1.5h1.2v2.6h-.9l-.1-.4c-.3.3-.7.5-1.2.5-.5 0-.8-.1-1-.4-.2-.2-.3-.6-.3-1.1v-3h1.2v2.8c0 .2 0 .4.1.5.1.1.2.1.4.1.2 0 .4-.1.6-.2v-3.1zM2 16.5c2.5 1.7 6 2.7 10 2.7s7.5-1 10-2.7c-.2 1.8-2.5 3.3-5.4 4-1.5.4-3 .5-4.6.5s-3.1-.1-4.6-.5c-2.9-.7-5.2-2.2-5.4-4z"/><path fill="#00e5ff" d="M19.5 13.8c0-.3-.1-.5-.3-.7-.2-.2-.6-.4-1.1-.6-.7-.2-1.2-.5-1.6-.8-.4-.3-.6-.8-.6-1.4 0-.6.2-1 .6-1.4.4-.4 1-.5 1.7-.5.5 0 .9.1 1.3.3.4.2.7.5.9.8.2.4.3.8.3 1.2h-1.2c0-.4-.1-.7-.4-.9-.2-.2-.5-.3-.9-.3s-.7.1-.9.3c-.2.2-.3.4-.3.7 0 .3.1.5.3.7.2.2.6.3 1.1.5.7.2 1.2.5 1.6.8.4.3.5.8.5 1.4 0 .6-.2 1.1-.6 1.4-.4.4-1 .5-1.7.5-.5 0-1-.1-1.4-.3-.4-.2-.7-.5-.9-.9-.2-.4-.3-.8-.3-1.3h1.2c0 .4.1.8.4 1 .2.2.6.3 1 .3.4 0 .7-.1.9-.3.2-.1.3-.4.3-.7z"/></svg>`;

  // Skills list — uses Simple Icons CDN for official logos, custom AWS SVG
  const skills = [
    { name: 'AWS', custom: awsSVG },
    { name: 'Docker', slug: 'docker' },
    { name: 'Kubernetes', slug: 'kubernetes' },
    { name: 'Terraform', slug: 'terraform' },
    { name: 'Jenkins', slug: 'jenkins' },
    { name: 'Git', slug: 'git' },
    { name: 'GitHub', slug: 'github' },
    { name: 'Linux', slug: 'linux' },
    { name: 'Bash', slug: 'gnubash' },
    { name: 'NGINX', slug: 'nginx' },
    { name: 'GitHub Actions', slug: 'githubactions' },
    { name: 'Prometheus', slug: 'prometheus' },
    { name: 'Grafana', slug: 'grafana' },
    { name: 'Helm', slug: 'helm' },
    { name: 'Ansible', slug: 'ansible' },
    { name: 'YAML', slug: 'yaml' },
    { name: 'JSON', slug: 'json' },
    { name: 'EC2', custom: awsSVG },
    { name: 'S3', custom: awsSVG },
    { name: 'IAM', custom: awsSVG },
    { name: 'VPC', custom: awsSVG }
  ];

  skills.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card reveal';
    card.dataset.tilt = '';
    card.style.transitionDelay = (i % 10) * 50 + 'ms';

    let iconHTML;
    if (s.custom) {
      iconHTML = `<div class="skill-icon">${s.custom}</div>`;
    } else {
      iconHTML = `<div class="skill-icon"><img src="https://cdn.simpleicons.org/${s.slug}/00E5FF" alt="${s.name} logo" loading="lazy" width="48" height="48" /></div>`;
    }
    card.innerHTML = `${iconHTML}<span class="skill-name">${s.name}</span>`;
    grid.appendChild(card);
  });
})();

/* ============================================================
   Projects Data + Render
   ============================================================ */
(() => {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const projects = [
    {
      title: 'AWS Infrastructure Automation',
      tech: ['Terraform', 'EC2', 'VPC', 'ALB', 'IAM', 'RDS', 'Auto Scaling'],
      icon: '<svg viewBox="0 0 24 24" width="64" height="64"><path fill="#00e5ff" d="M6.7 14.7c0 .3 0 .5.2.7.1.1.3.2.4.2.2 0 .3 0 .4-.1.1-.1.1-.3.1-.6V11h1.2v3.8c0 .6-.1 1-.4 1.3-.3.3-.7.4-1.3.4-.5 0-.9-.1-1.2-.4-.3-.3-.4-.7-.4-1.3V11h1.2v3.7zM2 16.5c2.5 1.7 6 2.7 10 2.7s7.5-1 10-2.7c-.2 1.8-2.5 3.3-5.4 4-1.5.4-3 .5-4.6.5s-3.1-.1-4.6-.5c-2.9-.7-5.2-2.2-5.4-4z"/></svg>',
      github: '#',
      demo: '#'
    },
    {
      title: 'Kubernetes Deployment',
      tech: ['Docker', 'Kubernetes', 'Rolling Updates', 'Health Checks', 'Load Balancer'],
      icon: '<svg viewBox="0 0 24 24" width="64" height="64"><path fill="#38bdf8" d="M12 1.5 2.5 5.9v10.2L12 22.5l9.5-6.4V5.9L12 1.5zm0 3 6.5 4.3v6.4L12 19.5 5.5 15.2V8.8L12 4.5z"/></svg>',
      github: '#',
      demo: '#'
    },
    {
      title: 'CI/CD Pipeline',
      tech: ['Jenkins', 'GitHub Actions', 'Docker', 'AWS ECR'],
      icon: '<svg viewBox="0 0 24 24" width="64" height="64"><path fill="#00e5ff" d="M12 2a4 4 0 0 0-4 4v3H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v3h-4V6a2 2 0 0 1 2-2z"/></svg>',
      github: '#',
      demo: '#'
    },
    {
      title: 'Dockerized NGINX Website',
      tech: ['Docker', 'NGINX', 'GitHub Actions'],
      icon: '<svg viewBox="0 0 24 24" width="64" height="64"><path fill="#7c3aed" d="M12 1 2 7v10l10 6 10-6V7L12 1zm0 4 6 3.5v7L12 19l-6-3.5v-7L12 5z"/></svg>',
      github: '#',
      demo: '#'
    }
  ];

  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.dataset.tilt = '';
    card.style.transitionDelay = i * 80 + 'ms';

    const badges = p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

    card.innerHTML = `
      <div class="project-img"><div class="picon">${p.icon}</div></div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <div class="project-tech">${badges}</div>
        <div class="project-links">
          <a href="${p.github}" target="_blank" rel="noopener" class="pl-github">
            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.4.61-1.61.07-.62.3-1.08.3-1.08-2.23-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>
            GitHub
          </a>
          <a href="${p.demo}" target="_blank" rel="noopener" class="pl-demo">Live Demo →</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
})();

/* ============================================================
   Experience Timeline
   ============================================================ */
(() => {
  const tl = document.getElementById('timeline');
  if (!tl) return;

  const items = [
    { title: 'Cloud Infrastructure', desc: 'Designing and provisioning scalable AWS infrastructure using Terraform and CloudFormation — VPCs, EC2 fleets, RDS, ALB, and auto-scaling groups.' },
    { title: 'Containerization', desc: 'Containerizing applications with Docker and orchestrating deployments on Kubernetes clusters with Helm charts and rolling updates.' },
    { title: 'CI/CD Automation', desc: 'Building end-to-end CI/CD pipelines with Jenkins and GitHub Actions — automated build, test, scan, push to ECR, and deploy.' },
    { title: 'Infrastructure as Code', desc: 'Managing all infrastructure through Terraform modules and Ansible playbooks — version-controlled, peer-reviewed, reproducible.' },
    { title: 'Monitoring & Observability', desc: 'Implementing Prometheus and Grafana dashboards, alerting, and log aggregation for full production visibility.' },
    { title: 'Cloud Deployments', desc: 'Shipping reliable production deployments with zero downtime — blue/green, canary, and automated rollback strategies.' }
  ];

  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'tl-item reveal';
    el.dataset.anim = 'left';
    el.style.transitionDelay = i * 100 + 'ms';
    el.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-card">
        <h3 class="tl-title">${item.title}</h3>
        <p class="tl-desc">${item.desc}</p>
      </div>
    `;
    tl.appendChild(el);
  });
})();

/* ============================================================
   Achievements Counters
   ============================================================ */
(() => {
  const grid = document.getElementById('countersGrid');
  if (!grid) return;

  const stats = [
    { num: 25, suffix: '+', label: 'Projects Completed' },
    { num: 30, suffix: '+', label: 'CI/CD Pipelines' },
    { num: 40, suffix: '+', label: 'Cloud Deployments' },
    { num: 50, suffix: '+', label: 'Infrastructure Automations' }
  ];

  stats.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'counter-card reveal';
    card.dataset.anim = 'zoom';
    card.style.transitionDelay = i * 80 + 'ms';
    card.innerHTML = `
      <div class="counter-num" data-target="${s.num}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="counter-label">${s.label}</div>
    `;
    grid.appendChild(card);
  });

  // Animate counters when visible
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 40);
    const tick = () => {
      current += step;
      if (current >= target) { el.textContent = target + suffix; return; }
      el.textContent = current + suffix;
      requestAnimationFrame(tick);
    };
    tick();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  grid.querySelectorAll('.counter-num').forEach(el => observer.observe(el));
})();

/* ============================================================
   Certifications
   ============================================================ */
(() => {
  const grid = document.getElementById('certsGrid');
  if (!grid) return;

  const certs = [
    { name: 'AWS', org: 'Amazon Web Services', slug: 'amazonaws', badge: 'Cloud Practitioner' },
    { name: 'Docker', org: 'Docker Inc.', slug: 'docker', badge: 'Certified Associate' },
    { name: 'Kubernetes', org: 'CNCF', slug: 'kubernetes', badge: 'CKA' },
    { name: 'Terraform', org: 'HashiCorp', slug: 'terraform', badge: 'Associate' },
    { name: 'Jenkins', org: 'CloudBees', slug: 'jenkins', badge: 'Certified Engineer' }
  ];

  const awsSVG = '<svg viewBox="0 0 24 24" width="52" height="52"><path fill="#00e5ff" d="M6.7 14.7c0 .3 0 .5.2.7.1.1.3.2.4.2.2 0 .3 0 .4-.1.1-.1.1-.3.1-.6V11h1.2v3.8c0 .6-.1 1-.4 1.3-.3.3-.7.4-1.3.4-.5 0-.9-.1-1.2-.4-.3-.3-.4-.7-.4-1.3V11h1.2v3.7zM2 16.5c2.5 1.7 6 2.7 10 2.7s7.5-1 10-2.7c-.2 1.8-2.5 3.3-5.4 4-1.5.4-3 .5-4.6.5s-3.1-.1-4.6-.5c-2.9-.7-5.2-2.2-5.4-4z"/></svg>';

  certs.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'cert-card reveal';
    card.dataset.tilt = '';
    card.style.transitionDelay = i * 80 + 'ms';

    let iconHTML;
    if (c.slug === 'amazonaws') {
      iconHTML = `<div class="cert-icon">${awsSVG}</div>`;
    } else {
      iconHTML = `<div class="cert-icon"><img src="https://cdn.simpleicons.org/${c.slug}/00E5FF" alt="${c.name} logo" loading="lazy" width="52" height="52" /></div>`;
    }

    card.innerHTML = `
      ${iconHTML}
      <h3 class="cert-name">${c.name}</h3>
      <p class="cert-org">${c.org}</p>
      <span class="cert-badge">${c.badge}</span>
    `;
    grid.appendChild(card);
  });
})();

/* ============================================================
   Contact Cards
   ============================================================ */
(() => {
  const grid = document.getElementById('contactGrid');
  if (!grid) return;

  const contacts = [
    {
      label: 'Email',
      value: 'navnitkumar927@gmail.com',
      href: 'mailto:navnitkumar927@gmail.com',
      icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 7L2.76 6h18.48L12 11zm0 2.5L3 8.5V18h18V8.5l-9 5z"/></svg>'
    },
    {
      label: 'GitHub',
      value: 'github.com/navnitkumar',
      href: 'https://github.com/navnitkumar',
      icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.4.61-1.61.07-.62.3-1.08.3-1.08-2.23-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>'
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/navnitkumar',
      href: 'https://linkedin.com/in/navnitkumar',
      icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>'
    },
    {
      label: 'Location',
      value: 'India',
      href: null,
      icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>'
    },
    {
      label: 'Phone',
      value: '+91 XXXXX XXXXX',
      href: null,
      icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z"/></svg>'
    }
  ];

  contacts.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'contact-card reveal';
    card.style.transitionDelay = i * 70 + 'ms';

    const inner = c.href
      ? `<a href="${c.href}" ${c.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} style="display:flex;align-items:center;gap:16px;width:100%;text-decoration:none;color:inherit;">`
        + `<div class="contact-icon">${c.icon}</div>`
        + `<div><div class="contact-label">${c.label}</div><div class="contact-value">${c.value}</div></div>`
        + `</a>`
      : `<div class="contact-icon">${c.icon}</div>`
        + `<div><div class="contact-label">${c.label}</div><div class="contact-value">${c.value}</div></div>`;

    card.innerHTML = inner;
    grid.appendChild(card);
  });
})();

/* ============================================================
   Scroll Reveal (IntersectionObserver)
   ============================================================ */
(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ============================================================
   Tilt Animation (3D hover)
   ============================================================ */
(() => {
  if (matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach(el => {
    let raf = null;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -8;
      const ry = ((x - cx) / cx) * 8;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
    });
    el.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    });
  });
})();

/* ============================================================
   Mouse Parallax (Hero)
   ============================================================ */
(() => {
  if (matchMedia('(pointer: coarse)').matches) return;
  const hero = document.querySelector('.hero');
  const photo = document.querySelector('.hero-photo');
  if (!hero || !photo) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    photo.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  });
  hero.addEventListener('mouseleave', () => {
    photo.style.transform = '';
  });
})();

/* ============================================================
   Ripple Button Effect
   ============================================================ */
(() => {
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const circle = document.createElement('span');
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
})();

/* ============================================================
   Smooth Scroll for anchor links
   ============================================================ */
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
