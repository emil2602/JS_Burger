import './main.scss';

'use strict';

class Hamburger {
    constructor(effect) {
        this.effect = effect;
        this.burgerButton = document.querySelector('.burger-toggler');
        this.burgerMenu = document.querySelector('ul');
        this.wrapper = document.querySelector('.wrapper');
        this.tabletMedia = window.matchMedia('(min-width: 769px)');
    }

    activateResizeHandler() {
		let win = window,
			resizeClass = 'resize-active',
			doc = document.documentElement,
			flag, 
            timer;

		function removeClassHandler() {
			flag = false;
			doc.classList.remove(resizeClass);
		};

		function resizeHandler() {
			if (!flag) {
				flag = true;
				doc.classList.add(resizeClass);
			}

			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};

		win.addEventListener('resize', resizeHandler);
		win.addEventListener('orientationchange', resizeHandler);
	};

    burgerMenuAnimate() {
        this.burgerButton.addEventListener('click', () => {
                this.burgerButton.classList.toggle('active');
                this.burgerMenu.classList.toggle(this.effect);
                this.wrapper.classList.toggle('translate');
        });

        window.addEventListener('resize', () => {
            if (this.tabletMedia.matches) {
                this.burgerButton.classList.remove('active');
                this.burgerMenu.classList.remove(this.effect);
                this.wrapper.classList.remove('translate');
            };
        });

        if (this.effect === 'swipe') {
            window.addEventListener('touchmove', (e) => {
                let touchPosition = e.touches[0].clientX;

                if (touchPosition > 0) {
                    this.burgerMenu.classList.add('swipe');
                    this.wrapper.classList.add('translate');
                    this.burgerButton.classList.add('active');
                } else {
                    this.burgerMenu.classList.remove('swipe');
                    this.wrapper.classList.remove('translate');
                    this.burgerButton.classList.remove('active');
                };
            });
        };
    };
};

const burgerSlide = new Hamburger('slide');
const burgerFade = new Hamburger('fade');
const burgerSwipe = new Hamburger('swipe');

// burgerFade.burgerMenuAnimate();
burgerSwipe.burgerMenuAnimate();
// burgerSlide.burgerMenuAnimate();