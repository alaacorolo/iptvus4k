document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. Navigation Active Link State On Scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    });

    // 3. WhatsApp Floating Widget Logic
    const widgetBubble = document.getElementById('widget-bubble');
    const widgetChatBox = document.getElementById('widget-chat-box');
    const chatBoxClose = document.getElementById('chat-box-close');

    if (widgetBubble && widgetChatBox && chatBoxClose) {
        widgetBubble.addEventListener('click', () => {
            widgetChatBox.classList.toggle('active');
        });

        chatBoxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            widgetChatBox.classList.remove('active');
        });

        // Close widget box if clicked outside
        document.addEventListener('click', (e) => {
            if (!widgetBubble.contains(e.target) && !widgetChatBox.contains(e.target)) {
                widgetChatBox.classList.remove('active');
            }
        });
    }

    // 4. Testimonials Carousel
    const slides = document.querySelectorAll('.chat-slide');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 7000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlideShow();
                startSlideShow();
            });
        });

        startSlideShow();
    }

    // 5. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 6. Policy Modal Injections & Logic
    const modal = document.getElementById('policy-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const policies = {
        privacy: `
            <h2>Privacy Policy</h2>
            <p><strong>Effective Date: July 7, 2026</strong></p>
            <p>At IPTVUS4K (accessible from iptvus4k.shop), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by IPTVUS4K and how we use it.</p>
            
            <h3>Information We Collect</h3>
            <p>If you contact us directly on WhatsApp or through email, we may receive additional information about you such as your name, phone number, email address, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
            
            <h3>How We Use Your Information</h3>
            <p>We use the information we collect in various ways, including to:</p>
            <ul>
                <li>Provide, operate, and maintain our website and IPTV services.</li>
                <li>Improve, personalize, and expand our website.</li>
                <li>Understand and analyze how you use our website.</li>
                <li>Develop new products, services, features, and functionality.</li>
                <li>Communicate with you, either directly or through WhatsApp, including for customer service, to provide you with updates and other information relating to the service, and for marketing purposes.</li>
                <li>Send you emails or chat instructions to configure your devices.</li>
                <li>Find and prevent fraud.</li>
            </ul>

            <h3>Cookies and Web Beacons</h3>
            <p>Like any other website, IPTVUS4K uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        `,
        refund: `
            <h2>Refund Policy</h2>
            <p><strong>Effective Date: July 7, 2026</strong></p>
            <p>We want to ensure that you are 100% happy with your purchase from IPTVUS4K. If you have any technical or sales queries, do not hesitate to contact us. However, if you feel the service you purchased is not the best fit for your requirements and you have attempted to resolve issues with our support staff, we want to make things right.</p>
            
            <h3>7-Day Refund Guarantee</h3>
            <p>We offer a full refund within 7 days of purchase under the following conditions:</p>
            <ul>
                <li>Our servers encountered critical technical downtime or issues that we were unable to resolve within 48 hours.</li>
                <li>You purchased a subscription by mistake and have NOT used/activated the credentials.</li>
                <li>We are unable to activate your line within 24 hours of receiving payment confirmation.</li>
            </ul>

            <h3>Non-Refundable Circumstances</h3>
            <p>Refunds will not be issued in the following circumstances:</p>
            <ul>
                <li>Your internet connection is slow or unstable, causing buffering. A minimum stable speed of 15-30 Mbps is required.</li>
                <li>You changed your mind after activating and using the service for several days.</li>
                <li>You violated our Terms of Service by sharing your login credentials on more than 1 device concurrently (causes automatic block).</li>
                <li>Issues related to third-party app installations or local hardware configuration errors that are outside our control.</li>
            </ul>

            <h3>How to Request a Refund</h3>
            <p>To request a refund, please open a chat with us on WhatsApp or send an email. Provide your order details and the username of your IPTV subscription line. We will process eligible refunds within 3-5 business days.</p>
        `,
        terms: `
            <h2>Terms of Service</h2>
            <p><strong>Effective Date: July 7, 2026</strong></p>
            <p>Welcome to IPTVUS4K! These Terms of Service outline the rules and regulations for the use of IPTVUS4K's Website, located at iptvus4k.shop.</p>
            
            <h3>1. Acceptable Use Policy</h3>
            <p>By purchasing our IPTV subscription, you agree that you are purchasing access to digital resources for personal use only. Sharing your M3U link, Xtream credentials, or account details with other individuals is strictly prohibited.</p>
            
            <h3>2. Connection Limits</h3>
            <p>Each subscription plan includes exactly one (1) concurrent connection active at any time, unless you have specifically paid for multiple connection lines. If our system detects multiple IP addresses streaming from the same line simultaneously, the account will be automatically blocked by our anti-fraud firewall without any refund.</p>

            <h3>3. Content Availability</h3>
            <p>We do not own, host, or broadcast the video streams. We provide access to server playlist links. Content, channels, and VOD selections may change, be added, or removed at any time without prior notice based on server updates and channel stability.</p>

            <h3>4. Requirements</h3>
            <p>You must have a compatible hardware device and a stable broadband internet connection to stream content. IPTVUS4K is not responsible for buffering or latency caused by ISP throttling, low bandwidth, or local network congestion.</p>
        `
    };

    window.showPolicy = (type) => {
        if (policies[type] && modal && modalBody) {
            modalBody.innerHTML = policies[type];
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scroll
        }
    };

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        });

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

});
