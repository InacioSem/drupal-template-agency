/**
 * @file
 * DrupalForge Business theme JavaScript.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Mobile menu toggle behavior.
   */
  Drupal.behaviors.drupalforgeBusinessMobileMenu = {
    attach: function (context) {
      once('mobile-menu', '.mobile-menu-toggle', context).forEach(function (toggle) {
        toggle.addEventListener('click', function () {
          const menu = document.querySelector('.main-nav');
          if (menu) {
            menu.classList.toggle('is-open');
            toggle.setAttribute(
              'aria-expanded',
              toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
          }
        });
      });
    }
  };

  /**
   * Smooth scroll for anchor links.
   */
  Drupal.behaviors.drupalforgeBusinessSmoothScroll = {
    attach: function (context) {
      once('smooth-scroll', 'a[href^="#"]', context).forEach(function (link) {
        link.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href').substring(1);
          const target = document.getElementById(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  };

})(Drupal, once);
