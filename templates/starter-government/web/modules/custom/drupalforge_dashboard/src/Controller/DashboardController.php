<?php

namespace Drupal\drupalforge_dashboard\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Datetime\DateFormatterInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\State\StateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Controller for the DrupalForge Dashboard.
 */
class DashboardController extends ControllerBase {

  /**
   * The date formatter service.
   */
  protected DateFormatterInterface $dateFormatter;

  /**
   * The state service.
   */
  protected StateInterface $state;

  /**
   * Constructs a DashboardController.
   */
  public function __construct(
    EntityTypeManagerInterface $entity_type_manager,
    AccountProxyInterface $current_user,
    DateFormatterInterface $date_formatter,
    StateInterface $state,
  ) {
    $this->entityTypeManager = $entity_type_manager;
    $this->currentUser = $current_user;
    $this->dateFormatter = $date_formatter;
    $this->state = $state;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): static {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('current_user'),
      $container->get('date.formatter'),
      $container->get('state'),
    );
  }

  /**
   * Renders the main dashboard page.
   */
  public function dashboard(): array {
    $greeting = $this->getGreeting();
    $quick_actions = $this->getQuickActions();
    $content_stats = $this->getContentStats();
    $recent_content = $this->getRecentContent();
    $checklist = $this->getChecklist();
    $checklist_progress = $this->getChecklistProgress($checklist);

    return [
      '#theme' => 'drupalforge_dashboard',
      '#greeting' => $greeting,
      '#quick_actions' => $quick_actions,
      '#content_stats' => $content_stats,
      '#recent_content' => $recent_content,
      '#checklist' => $checklist,
      '#checklist_progress' => $checklist_progress,
      '#cache' => [
        'max-age' => 0,
      ],
    ];
  }

  /**
   * Gets a time-based greeting for the current user.
   */
  protected function getGreeting(): string {
    $hour = (int) date('G');
    $name = $this->currentUser()->getDisplayName();

    if ($hour < 12) {
      $time_greeting = $this->t('Good morning');
    }
    elseif ($hour < 17) {
      $time_greeting = $this->t('Good afternoon');
    }
    else {
      $time_greeting = $this->t('Good evening');
    }

    return $time_greeting . ', ' . $name . '!';
  }

  /**
   * Gets quick action links based on available content types.
   */
  protected function getQuickActions(): array {
    $actions = [];
    $node_types = $this->entityTypeManager()->getStorage('node_type')->loadMultiple();

    // Priority content types with icons.
    $type_config = [
      'page' => ['icon' => 'file-text', 'color' => '#3b82f6'],
      'blog_post' => ['icon' => 'pen-line', 'color' => '#8b5cf6'],
      'case_study' => ['icon' => 'briefcase', 'color' => '#f59e0b'],
      'service' => ['icon' => 'settings', 'color' => '#10b981'],
      'team_member' => ['icon' => 'users', 'color' => '#ec4899'],
      'testimonial' => ['icon' => 'message-circle', 'color' => '#06b6d4'],
      'landing_page' => ['icon' => 'layout', 'color' => '#f97316'],
      'news_article' => ['icon' => 'newspaper', 'color' => '#3b82f6'],
      'event' => ['icon' => 'calendar', 'color' => '#8b5cf6'],
      'story' => ['icon' => 'heart', 'color' => '#ec4899'],
      'program' => ['icon' => 'target', 'color' => '#10b981'],
      'campaign' => ['icon' => 'megaphone', 'color' => '#f59e0b'],
    ];

    foreach ($node_types as $type_id => $type) {
      if ($this->currentUser()->hasPermission("create {$type_id} content")) {
        $config = $type_config[$type_id] ?? ['icon' => 'plus-circle', 'color' => '#6b7280'];
        $actions[] = [
          'label' => $this->t('Create @type', ['@type' => $type->label()]),
          'url' => '/node/add/' . $type_id,
          'icon' => $config['icon'],
          'color' => $config['color'],
          'description' => $this->t('Add a new @type to your site.', ['@type' => strtolower($type->label())]),
        ];
      }
    }

    // Add non-content quick actions.
    if ($this->currentUser()->hasPermission('administer menu')) {
      $actions[] = [
        'label' => $this->t('Edit Menus'),
        'url' => '/admin/structure/menu',
        'icon' => 'menu',
        'color' => '#64748b',
        'description' => $this->t('Manage your site navigation.'),
      ];
    }

    if ($this->currentUser()->hasPermission('access webform overview')) {
      $actions[] = [
        'label' => $this->t('View Form Submissions'),
        'url' => '/admin/structure/webform',
        'icon' => 'inbox',
        'color' => '#14b8a6',
        'description' => $this->t('Review contact form and webform submissions.'),
      ];
    }

    return $actions;
  }

  /**
   * Gets content statistics.
   */
  protected function getContentStats(): array {
    $stats = [];
    $node_storage = $this->entityTypeManager()->getStorage('node');

    // Total published content.
    $total_published = $node_storage->getQuery()
      ->accessCheck(TRUE)
      ->condition('status', 1)
      ->count()
      ->execute();

    $stats[] = [
      'label' => $this->t('Published'),
      'count' => $total_published,
      'icon' => 'check-circle',
      'color' => '#10b981',
    ];

    // Draft content.
    $total_draft = $node_storage->getQuery()
      ->accessCheck(TRUE)
      ->condition('status', 0)
      ->count()
      ->execute();

    $stats[] = [
      'label' => $this->t('Drafts'),
      'count' => $total_draft,
      'icon' => 'edit',
      'color' => '#f59e0b',
    ];

    // Content created this week.
    $week_ago = strtotime('-7 days');
    $this_week = $node_storage->getQuery()
      ->accessCheck(TRUE)
      ->condition('created', $week_ago, '>=')
      ->count()
      ->execute();

    $stats[] = [
      'label' => $this->t('This Week'),
      'count' => $this_week,
      'icon' => 'trending-up',
      'color' => '#3b82f6',
    ];

    // Total users.
    $total_users = $this->entityTypeManager()->getStorage('user')->getQuery()
      ->accessCheck(TRUE)
      ->condition('status', 1)
      ->count()
      ->execute();

    $stats[] = [
      'label' => $this->t('Users'),
      'count' => $total_users,
      'icon' => 'users',
      'color' => '#8b5cf6',
    ];

    return $stats;
  }

  /**
   * Gets recently edited content.
   */
  protected function getRecentContent(): array {
    $recent = [];
    $nodes = $this->entityTypeManager()->getStorage('node')->getQuery()
      ->accessCheck(TRUE)
      ->sort('changed', 'DESC')
      ->range(0, 8)
      ->execute();

    if ($nodes) {
      $loaded = $this->entityTypeManager()->getStorage('node')->loadMultiple($nodes);
      foreach ($loaded as $node) {
        $recent[] = [
          'title' => $node->label(),
          'type' => $node->type->entity->label(),
          'status' => $node->isPublished() ? 'published' : 'draft',
          'changed' => $this->dateFormatter->formatTimeDiffSince($node->getChangedTime()) . ' ' . $this->t('ago'),
          'edit_url' => '/node/' . $node->id() . '/edit',
          'view_url' => $node->toUrl()->toString(),
        ];
      }
    }

    return $recent;
  }

  /**
   * Gets the getting-started checklist.
   */
  protected function getChecklist(): array {
    $dismissed = $this->state->get('drupalforge_dashboard.checklist_dismissed', []);
    $site_config = $this->config('system.site');

    $items = [
      [
        'id' => 'site_name',
        'label' => $this->t('Set your site name'),
        'description' => $this->t('Give your site a name that appears in the browser tab and header.'),
        'url' => '/admin/config/system/site-information',
        'completed' => $site_config->get('name') !== 'Drupal',
        'icon' => 'type',
      ],
      [
        'id' => 'logo',
        'label' => $this->t('Upload your logo'),
        'description' => $this->t('Replace the default logo with your brand.'),
        'url' => '/admin/appearance/settings',
        'completed' => FALSE,
        'icon' => 'image',
      ],
      [
        'id' => 'first_page',
        'label' => $this->t('Create your first page'),
        'description' => $this->t('Add an About or Home page to get started.'),
        'url' => '/node/add/page',
        'completed' => (int) $this->entityTypeManager()->getStorage('node')->getQuery()
          ->accessCheck(TRUE)
          ->condition('type', 'page')
          ->count()
          ->execute() > 0,
        'icon' => 'file-plus',
      ],
      [
        'id' => 'menu',
        'label' => $this->t('Set up your main menu'),
        'description' => $this->t('Add links to your main navigation menu.'),
        'url' => '/admin/structure/menu/manage/main',
        'completed' => FALSE,
        'icon' => 'menu',
      ],
      [
        'id' => 'theme',
        'label' => $this->t('Customize your theme'),
        'description' => $this->t('Adjust colors, fonts, and layout to match your brand.'),
        'url' => '/admin/appearance/settings',
        'completed' => FALSE,
        'icon' => 'palette',
      ],
      [
        'id' => 'contact_form',
        'label' => $this->t('Set up a contact form'),
        'description' => $this->t('Create a form so visitors can reach you.'),
        'url' => '/admin/structure/webform',
        'completed' => FALSE,
        'icon' => 'mail',
      ],
    ];

    // Mark dismissed items.
    foreach ($items as &$item) {
      if (in_array($item['id'], $dismissed)) {
        $item['dismissed'] = TRUE;
      }
      else {
        $item['dismissed'] = FALSE;
      }
    }

    return $items;
  }

  /**
   * Calculates checklist progress percentage.
   */
  protected function getChecklistProgress(array $checklist): int {
    $total = count($checklist);
    if ($total === 0) {
      return 100;
    }

    $completed = 0;
    foreach ($checklist as $item) {
      if ($item['completed'] || $item['dismissed']) {
        $completed++;
      }
    }

    return (int) round(($completed / $total) * 100);
  }

  /**
   * Dismisses a checklist item.
   */
  public function dismissChecklist(string $item): JsonResponse {
    $dismissed = $this->state->get('drupalforge_dashboard.checklist_dismissed', []);
    if (!in_array($item, $dismissed)) {
      $dismissed[] = $item;
      $this->state->set('drupalforge_dashboard.checklist_dismissed', $dismissed);
    }

    return new JsonResponse(['status' => 'ok']);
  }

  /**
   * Renders the guided tour page.
   */
  public function tour(): array {
    $steps = [
      [
        'title' => $this->t('Welcome to your new site!'),
        'description' => $this->t('This quick tour will show you the most important parts of your admin panel. It takes about 2 minutes.'),
        'icon' => 'rocket',
      ],
      [
        'title' => $this->t('The Dashboard'),
        'description' => $this->t('This is your home base. You can see content statistics, quick actions, and your getting started checklist here. You can always come back by clicking "Dashboard" in the toolbar.'),
        'icon' => 'layout-dashboard',
      ],
      [
        'title' => $this->t('Creating Content'),
        'description' => $this->t('Click any "Create" button on the dashboard to add new content. Each content type has a form with fields — just fill them in and click Save. You can preview before publishing.'),
        'icon' => 'pen-line',
      ],
      [
        'title' => $this->t('Editing Pages'),
        'description' => $this->t('To edit an existing page, click "Content" in the admin toolbar, find the page you want, and click "Edit". You can also click "Edit" when viewing any page on the front end.'),
        'icon' => 'edit',
      ],
      [
        'title' => $this->t('Managing Media'),
        'description' => $this->t('When adding images or files, you can upload them directly in the content form. All media is organized in the Media Library (Content > Media) for easy reuse.'),
        'icon' => 'image',
      ],
      [
        'title' => $this->t('Navigation & Menus'),
        'description' => $this->t('Edit your site navigation at Structure > Menus > Main navigation. Drag and drop to reorder. New pages can be automatically added to the menu when you create them.'),
        'icon' => 'menu',
      ],
      [
        'title' => $this->t('Getting Help'),
        'description' => $this->t('Look for the blue help icons (?) next to form fields — they explain what each field does. You can also revisit this tour from the Dashboard at any time.'),
        'icon' => 'help-circle',
      ],
    ];

    return [
      '#theme' => 'drupalforge_dashboard_tour',
      '#steps' => $steps,
      '#attached' => [
        'library' => ['drupalforge_dashboard/dashboard'],
      ],
    ];
  }

}
