/**
 * @file
 * DrupalForge Nonprofit theme JavaScript.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Mobile menu toggle behavior.
   */
  Drupal.behaviors.drupalforgeNonprofitMobileMenu = {
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
   * Donation amount selector.
   */
  Drupal.behaviors.drupalforgeNonprofitDonation = {
    attach: function (context) {
      once('donation-amount', '.donation-amount', context).forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.donation-amount').forEach(function (el) {
            el.classList.remove('is-selected');
          });
          btn.classList.add('is-selected');

          const input = document.querySelector('.donation-custom-input');
          if (input) {
            input.value = btn.textContent.replace(/[^0-9]/g, '');
          }
        });
      });
    }
  };

  /**
   * Animate impact stats on scroll.
   */
  Drupal.behaviors.drupalforgeNonprofitStats = {
    attach: function (context) {
      once('impact-stats', '.impact-stat__number', context).forEach(function (stat) {
        const observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        observer.observe(stat);
      });
    }
  };

})(Drupal, once);
