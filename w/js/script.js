const menuBtn = document.querySelector('.menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        const revealEls = document.querySelectorAll('.reveal');
        const skillRows = document.querySelectorAll('.skill-row');
        const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter button');
        const portfolioCards = document.querySelectorAll('.case-card');
        const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
        const topBtn = document.querySelector('.top-btn');

        const projectModal = document.querySelector('.project-modal');
        const projectModalBox = document.querySelector('.project-modal-box');
        const projectModalClose = document.querySelector('.project-modal-close');
        const projectModalTitle = document.querySelector('.project-modal-title');
        const projectModalCategory = document.querySelector('.project-modal-category');
        const projectModalVisual = document.querySelector('.project-modal-visual');
        const projectModalThumb = document.querySelector('.project-modal-thumb');
        const projectModalPlaceholder = document.querySelector('.project-modal-placeholder');
        const projectModalDesc = document.querySelector('.project-modal-desc');
        const modalInfoCategory = document.querySelector('.modal-info-category');
        const projectModalLink = document.querySelector('.project-modal-link');
        const projectModalPrd = document.querySelector('.project-modal-prd');

        const modalDescriptions = {
            web: '웹 표준 구조를 기반으로 시안에 맞는 레이아웃을 구현하고, 반응형 흐름과 사용자 동선을 고려해 완성한 웹 퍼블리싱 프로젝트입니다.',
            dev: 'JavaScript 기능 구현과 데이터 흐름, 화면 전환, 사용성 개선에 집중한 개발형 프로젝트입니다.',
            branding: '브랜드 기획부터 시각 결과물까지 하나의 흐름으로 정리한 브랜딩 포트폴리오 프로젝트입니다.',
            detail: '상세페이지와 배너 디자인 작업을 정리한 프로젝트입니다. 제품 정보 구성, 시각적 강조, 전환을 고려한 디자인 흐름을 보여줍니다.'
        };

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            mobileNav.classList.toggle('open');
        });

        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                mobileNav.classList.remove('open');
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                topBtn.classList.add('show');
            } else {
                topBtn.classList.remove('show');
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('show');

                if (entry.target.classList.contains('skill-row')) {
                    const percent = entry.target.dataset.percent;
                    entry.target.querySelector('.skill-bar span').style.width = `${percent}%`;
                }
            });
        }, {
            threshold: 0.18
        });

        revealEls.forEach((item) => revealObserver.observe(item));
        skillRows.forEach((item) => revealObserver.observe(item));

        portfolioFilterBtns.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const filter = button.dataset.filter;

                portfolioFilterBtns.forEach((item) => item.classList.remove('active'));
                button.classList.add('active');

                portfolioCards.forEach((card) => {
                    const isVisible = filter === 'all' || card.dataset.category === filter;
                    card.classList.toggle('is-hidden', !isVisible);
                });

                updateActiveNav();
            });
        });

        const openProjectModal = (card) => {
            const title = card.querySelector('.case-title')?.innerText.replace('→', '').trim() || 'Project';
            const category = card.querySelector('.case-meta')?.innerText || 'Portfolio';
            const number = card.querySelector('.blue-icon')?.innerText || '↗';
            const type = card.dataset.category || 'web';

            projectModalTitle.textContent = title;
            projectModalCategory.textContent = category;
            const modalSourceImage = card.querySelector('.modal-source-image');
            const modalImageUrl = modalSourceImage?.getAttribute('src') || card.dataset.modalImage || card.dataset.image || '';
            const modalImageAlt = modalSourceImage?.getAttribute('alt') || `${title} 대표 이미지`;

            if (projectModalThumb && projectModalPlaceholder) {
                if (modalImageUrl) {
                    projectModalThumb.src = modalImageUrl;
                    projectModalThumb.alt = modalImageAlt;
                    projectModalThumb.classList.remove('is-hidden');
                    projectModalPlaceholder.classList.add('is-hidden');
                } else {
                    projectModalThumb.src = '';
                    projectModalThumb.alt = '';
                    projectModalThumb.classList.add('is-hidden');
                    projectModalPlaceholder.textContent = number;
                    projectModalPlaceholder.classList.remove('is-hidden');
                }
            }

            projectModalDesc.textContent = modalDescriptions[type] || '해당 프로젝트의 목표, 역할, 작업 과정, 결과물을 설명하는 팝업 영역입니다.';
            modalInfoCategory.textContent = category;

            if (projectModalLink) {
                const projectUrl = card.dataset.url;
                const canShowLink = (type === 'web' || type === 'dev') && projectUrl;

                if (canShowLink) {
                    projectModalLink.href = projectUrl;
                    projectModalLink.classList.remove('is-hidden');
                } else {
                    projectModalLink.href = '#';
                    projectModalLink.classList.add('is-hidden');
                }
            }

            if (projectModalPrd) {
                const prdUrl = card.dataset.prd;

                if (type === 'web' && prdUrl) {
                    projectModalPrd.href = prdUrl;
                    projectModalPrd.download = prdUrl.split('/').pop();
                    projectModalPrd.classList.remove('is-hidden');
                } else {
                    projectModalPrd.href = '#';
                    projectModalPrd.removeAttribute('download');
                    projectModalPrd.classList.add('is-hidden');
                }
            }

            projectModal.classList.add('show');
            projectModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeProjectModal = () => {
            projectModal.classList.remove('show');
            projectModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        portfolioCards.forEach((card) => {
            const thumbnail = card.querySelector('.case-visual');

            if (thumbnail) {
                thumbnail.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    openProjectModal(card);
                });
            }

            card.addEventListener('click', () => openProjectModal(card));
        });

        projectModalClose.addEventListener('click', closeProjectModal);

        projectModal.addEventListener('click', (event) => {
            if (!projectModalBox.contains(event.target)) {
                closeProjectModal();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && projectModal.classList.contains('show')) {
                closeProjectModal();
            }
        });

        const navSections = Array.from(navLinks)
            .map((link) => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        const updateActiveNav = () => {
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const currentY = window.scrollY + headerHeight + 40;
            let currentId = navSections[0]?.id;

            navSections.forEach((section) => {
                if (section.offsetTop <= currentY) {
                    currentId = section.id;
                }
            });

            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
            });
        };

        window.addEventListener('scroll', updateActiveNav);
        window.addEventListener('load', updateActiveNav);
        updateActiveNav();
