// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animated Ledger Prediction Sequence
const predictions = [
    { row: 0, predicted: '$ 1.524,800', change: '↑ 22,2% proyectado', positive: true },
    { row: 1, predicted: '$ 486.150', change: '↑ 13,5% vs actual', positive: true },
    { row: 2, predicted: '37,8%', change: '↑ 3,6 p.p. mejora', positive: true },
    { row: 3, predicted: '$ 42.300', change: 'Saldo a favor estimado', positive: true }
];

function animateLedger() {
    predictions.forEach((pred, index) => {
        setTimeout(() => {
            const rows = document.querySelectorAll('#ledger-body tr');
            const row = rows[pred.row];
            if (!row) return;

            const predictedCell = row.querySelector('.predicted-col');
            const changeCell = row.querySelector('.change-col');
            if (!predictedCell || !changeCell) return;

            predictedCell.classList.remove('calculating');
            predictedCell.textContent = pred.predicted;

            changeCell.classList.remove('loading');
            changeCell.textContent = pred.change;
            if (pred.positive) {
                changeCell.classList.add('positive');
            }
        }, 800 + (index * 600));
    });
}

// Trigger animation when ledger comes into view
const ledgerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateLedger();
            ledgerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const ledger = document.querySelector('.ledger-demo #ledger-body .predicted-col')
    ? document.querySelector('.ledger-demo')
    : null;
if (ledger) {
    ledgerObserver.observe(ledger);
}

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');

    if (currentScroll > 50) {
        header.style.padding = '0.8rem 0';
    } else {
        header.style.padding = '1.2rem 0';
    }
});

// Case Study Interactive Comparison
const caseStudyData = {
    before: {
        q1: { height: 40, value: '$ 840K', label: 'Q1 2025', isNegative: false },
        q2: { height: 20, value: '-$ 420K', label: 'Q2 2025', isNegative: true },
        q3: { height: 55, value: '$ 1.15M', label: 'Q3 2025', isNegative: false },
        q4: { height: 45, value: '$ 945K', label: 'Q4 2025', isNegative: false },
        metrics: {
            metric1: '% 0,00',
            metric2: '60 días',
            metric3: '+8%'
        }
    },
    after: {
        q1: { height: 95, value: '$ 2.0M', label: 'Q1 2025', isNegative: false },
        q2: { height: 85, value: '$ 1.79M', label: 'Q2 2025', isNegative: false },
        q3: { height: 92, value: '$ 1.93M', label: 'Q3 2025', isNegative: false },
        q4: { height: 98, value: '$ 2.06M', label: 'Q4 2025', isNegative: false },
        metrics: {
            metric1: '$ 3.2M',
            metric2: '45 días',
            metric3: '+24%'
        }
    }
};

const toggleButtons = document.querySelectorAll('.toggle-btn');
const bars = document.querySelectorAll('.bar');
const metric1 = document.getElementById('metric1');
const metric2 = document.getElementById('metric2');
const metric3 = document.getElementById('metric3');

function updateChart(view) {
    if (!metric1 || !metric2 || !metric3 || !bars.length) return;

    const data = caseStudyData[view];

    bars.forEach((bar, index) => {
        const quarter = ['q1', 'q2', 'q3', 'q4'][index];
        const barData = data[quarter];

        bar.style.height = barData.height + '%';
        bar.querySelector('.bar-value').textContent = barData.value;

        if (barData.isNegative) {
            bar.classList.add('negative');
        } else {
            bar.classList.remove('negative');
        }
    });

    // Animate metrics
    setTimeout(() => {
        metric1.style.transform = 'scale(0.9)';
        metric2.style.transform = 'scale(0.9)';
        metric3.style.transform = 'scale(0.9)';

        setTimeout(() => {
            metric1.textContent = data.metrics.metric1;
            metric2.textContent = data.metrics.metric2;
            metric3.textContent = data.metrics.metric3;

            metric1.style.transform = 'scale(1)';
            metric2.style.transform = 'scale(1)';
            metric3.style.transform = 'scale(1)';
        }, 200);
    }, 400);
}

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const view = button.dataset.view;
        updateChart(view);
    });
});

// Initialize with "before" view
if (metric1) {
    updateChart('before');
}

// Animate chart when it comes into view
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                updateChart('before');
            }, 300);
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const chartContainer = document.querySelector('.case-study');
if (chartContainer) {
    chartObserver.observe(chartContainer);
}

// Add transition to metrics
if (metric1) {
    metric1.style.transition = 'transform 0.3s ease';
    metric2.style.transition = 'transform 0.3s ease';
    metric3.style.transition = 'transform 0.3s ease';
}

// Scroll Animation Observer
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, index * 100);
            scrollAnimationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale').forEach(el => {
    scrollAnimationObserver.observe(el);
});

// Counter Animation for Stats
function animateCounter(element, target, suffix = '', duration = 2000) {
    const isPercentage = suffix.includes('%');
    const isNegative = target < 0;
    const absoluteTarget = Math.abs(target);

    let current = 0;
    const increment = absoluteTarget / (duration / 16);
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        current = absoluteTarget * easeOutQuart(progress);

        let displayValue;
        if (isPercentage) {
            displayValue = current.toFixed(1).replace('.', ',') + suffix;
        } else {
            displayValue = Math.round(current).toLocaleString('es-AR') + suffix;
        }

        element.textContent = (isNegative ? '-' : '') + displayValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            setTimeout(() => {
                // 99.8%
                animateCounter(statNumbers[0], 99.8, '%', 2000);

                // <5min - just reveal
                setTimeout(() => {
                    statNumbers[1].style.opacity = '0';
                    statNumbers[1].style.transform = 'scale(0.8)';
                    statNumbers[1].style.transition = 'all 0.5s ease';
                    setTimeout(() => {
                        statNumbers[1].textContent = '<5min';
                        statNumbers[1].style.opacity = '1';
                        statNumbers[1].style.transform = 'scale(1)';
                    }, 500);
                }, 500);

                // 500+
                setTimeout(() => {
                    animateCounter(statNumbers[2], 500, '+', 2000);
                }, 1000);

                // -73%
                setTimeout(() => {
                    animateCounter(statNumbers[3], -73, '%', 2000);
                }, 1500);
            }, 300);

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats[data-animate-counters]');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add stagger animation to compliance items
const complianceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.compliance-item');
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-30px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.6s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 150);
            });
            complianceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const complianceList = document.querySelector('.compliance-list');
if (complianceList) {
    complianceObserver.observe(complianceList);
}

// Add pulse animation to CTA buttons periodically
const ctaButtons = document.querySelectorAll('.cta-section .btn-primary');
ctaButtons.forEach(btn => {
    setInterval(() => {
        btn.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            btn.style.animation = '';
        }, 500);
    }, 5000);
});

// Parallax on hero content only — CTA buttons stay fixed to avoid overlap with stats
const heroParallaxElements = document.querySelectorAll('.hero h1, .hero .tagline, .hero .ledger-demo');

if (heroParallaxElements.length) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        heroParallaxElements.forEach(el => {
            if (scrolled < 600) {
                el.style.transform = `translateY(${scrolled * -0.12}px)`;
                el.style.opacity = String(Math.max(1 - scrolled / 700, 0));
            } else {
                el.style.transform = '';
                el.style.opacity = '';
            }
        });
    }, { passive: true });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 20px;
            height: 20px;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Animate regulatory items on hover with sequential delay
const regulatoryItems = document.querySelectorAll('.regulatory-item');
regulatoryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.05}s`;
});