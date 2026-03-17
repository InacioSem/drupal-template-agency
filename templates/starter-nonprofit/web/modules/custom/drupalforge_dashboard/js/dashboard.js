/**
 * @file
 * DrupalForge Dashboard JavaScript.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Checklist dismiss behavior.
   */
  Drupal.behaviors.drupalforgeDashboardChecklist = {
    attach: function (context) {
      once('checklist-dismiss', '.df-checklist-dismiss', context).forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var itemId = btn.getAttribute('data-item');
          var item = btn.closest('.df-checklist__item');

          // Animate out.
          item.style.transition = 'opacity 300ms, transform 300ms';
          item.style.opacity = '0';
          item.style.transform = 'translateX(20px)';

          // Send dismiss request.
          fetch('/admin/dashboard/checklist/' + itemId + '/dismiss', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Remove after animation.
          setTimeout(function () {
            item.remove();
            updateChecklistProgress();
          }, 300);
        });
      });
    }
  };

  /**
   * Updates the checklist progress bar.
   */
  function updateChecklistProgress() {
    var items = document.querySelectorAll('.df-checklist__item');
    var total = items.length;
    var completed = document.querySelectorAll('.df-checklist__item.is-completed').length;

    if (total === 0) {
      // All items dismissed — hide the whole checklist.
      var checklist = document.querySelector('.df-dashboard__checklist');
      if (checklist) {
        checklist.style.transition = 'opacity 300ms';
        checklist.style.opacity = '0';
        setTimeout(function () {
          checklist.remove();
        }, 300);
      }
      return;
    }

    var percentage = Math.round(((total - items.length + completed) / total) * 100);
    var fill = document.querySelector('.df-checklist__bar-fill');
    var text = document.querySelector('.df-checklist__progress-text');

    if (fill) {
      fill.style.width = percentage + '%';
    }
    if (text) {
      text.textContent = percentage + '%';
    }
  }

  /**
   * Guided tour behavior.
   */
  Drupal.behaviors.drupalforgeDashboardTour = {
    attach: function (context) {
      once('tour', '.df-tour', context).forEach(function (tour) {
        var steps = tour.querySelectorAll('.df-tour__step');
        var prevBtn = tour.querySelector('[data-tour-prev]');
        var nextBtn = tour.querySelector('[data-tour-next]');
        var finishBtn = tour.querySelector('[data-tour-finish]');
        var progressFill = tour.querySelector('[data-tour-progress]');
        var stepText = tour.querySelector('[data-tour-step-text]');
        var currentStep = 0;
        var totalSteps = steps.length;

        function showStep(index) {
          steps.forEach(function (step) {
            step.classList.remove('is-active');
          });
          steps[index].classList.add('is-active');

          // Update progress.
          var progress = ((index + 1) / totalSteps) * 100;
          if (progressFill) {
            progressFill.style.width = progress + '%';
          }
          if (stepText) {
            stepText.textContent = Drupal.t('Step @current of @total', {
              '@current': index + 1,
              '@total': totalSteps,
            });
          }

          // Update button states.
          if (prevBtn) {
            prevBtn.disabled = index === 0;
          }

          if (index === totalSteps - 1) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (finishBtn) finishBtn.style.display = '';
          } else {
            if (nextBtn) nextBtn.style.display = '';
            if (finishBtn) finishBtn.style.display = 'none';
          }
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function () {
            if (currentStep < totalSteps - 1) {
              currentStep++;
              showStep(currentStep);
            }
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function () {
            if (currentStep > 0) {
              currentStep--;
              showStep(currentStep);
            }
          });
        }

        // Keyboard navigation.
        document.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight' && currentStep < totalSteps - 1) {
            currentStep++;
            showStep(currentStep);
          } else if (e.key === 'ArrowLeft' && currentStep > 0) {
            currentStep--;
            showStep(currentStep);
          }
        });

        // Initialize first step.
        showStep(0);
      });
    }
  };

  /**
   * Animate stat counts on load.
   */
  Drupal.behaviors.drupalforgeDashboardStats = {
    attach: function (context) {
      once('stat-animate', '.df-stat-card__count', context).forEach(function (el) {
        var target = parseInt(el.textContent, 10);
        if (isNaN(target) || target === 0) return;

        var duration = 800;
        var start = 0;
        var startTime = null;

        function animate(timestamp) {
          if (!startTime) startTime = timestamp;
          var elapsed = timestamp - startTime;
          var progress = Math.min(elapsed / duration, 1);

          // Ease out cubic.
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target;
          }
        }

        el.textContent = '0';
        requestAnimationFrame(animate);
      });
    }
  };

})(Drupal, once);
