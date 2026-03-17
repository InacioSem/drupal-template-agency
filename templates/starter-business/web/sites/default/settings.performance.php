<?php

/**
 * @file
 * DrupalForge performance settings for production environments.
 *
 * Include this file in your settings.php:
 *   if (file_exists($app_root . '/' . $site_path . '/settings.performance.php')) {
 *     include $app_root . '/' . $site_path . '/settings.performance.php';
 *   }
 */

// Page cache max age (1 hour).
$config['system.performance']['cache']['page']['max_age'] = 3600;

// Aggregate CSS and JS.
$config['system.performance']['css']['preprocess'] = TRUE;
$config['system.performance']['js']['preprocess'] = TRUE;

// Enable gzip compression.
$config['system.performance']['response']['gzip'] = TRUE;

// Disable render cache debug headers.
$settings['http_response_debug_cacheability_headers'] = FALSE;

// Disable Twig debug mode.
$settings['twig_debug'] = FALSE;
$settings['twig_auto_reload'] = FALSE;
$settings['twig_cache'] = TRUE;

// Suppress error messages on production.
$config['system.logging']['error_level'] = 'hide';

// Redis configuration (uncomment when Redis is available).
// Requires drupal/redis module: composer require drupal/redis
//
// $settings['redis.connection']['interface'] = 'PhpRedis';
// $settings['redis.connection']['host'] = '127.0.0.1';
// $settings['redis.connection']['port'] = '6379';
// $settings['cache']['default'] = 'cache.backend.redis';
// $settings['cache']['bins']['bootstrap'] = 'cache.backend.chainedfast';
// $settings['cache']['bins']['discovery'] = 'cache.backend.chainedfast';
// $settings['cache']['bins']['config'] = 'cache.backend.chainedfast';

// Varnish / CDN reverse proxy settings (uncomment when applicable).
// $settings['reverse_proxy'] = TRUE;
// $settings['reverse_proxy_addresses'] = ['127.0.0.1'];
// $settings['reverse_proxy_trusted_headers'] =
//   \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_FOR |
//   \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_HOST |
//   \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_PORT |
//   \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_PROTO;
