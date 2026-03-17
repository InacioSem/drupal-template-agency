/**
 * @file
 * DrupalForge Government theme JavaScript.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Alert banner dismiss behavior.
   */
  Drupal.behaviors.drupalforgeGovernmentAlerts = {
    attach: function (context) {
      once('alert-dismiss', '.alert-banner__close', context).forEach(function (btn) {
        btn.addEventListener('click', function () {
          const banner = btn.closest('.alert-banner');
          if (banner) {
            banner.setAttribute('aria-hidden', 'true');
            banner.style.display = 'none';
          }
        });
      });
    }
  };

  /**
   * Accessible accordion behavior.
   */
  Drupal.behaviors.drupalforgeGovernmentAccordion = {
    attach: function (context) {
      once('accordion', '.accordion-trigger', context).forEach(function (trigger) {
        const content = trigger.nextElementSibling;
        if (!content) return;

        const id = 'accordion-' + Math.random().toString(36).substr(2, 9);
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', id);
        content.id = id;
        content.setAttribute('role', 'region');
        content.setAttribute('aria-labelledby', trigger.id || id + '-trigger');
        content.hidden = true;

        trigger.addEventListener('click', function () {
          const expanded = trigger.getAttribute('aria-expanded') === 'true';
          trigger.setAttribute('aria-expanded', !expanded);
          content.hidden = expanded;
        });
      });
    }
  };

  /**
   * Mobile menu toggle.
   */
  Drupal.behaviors.drupalforgeGovernmentMobileMenu = {
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

})(Drupal, once);
