#!/bin/bash
set -e

echo "============================================"
echo " DrupalForge Government - Setup"
echo "============================================"

command -v php >/dev/null 2>&1 || { echo "PHP is required but not installed. Aborting."; exit 1; }
command -v composer >/dev/null 2>&1 || { echo "Composer is required but not installed. Aborting."; exit 1; }

echo ""
echo "Step 1: Installing Composer dependencies..."
composer install --no-interaction

echo ""
echo "Step 2: Copying default settings..."
if [ ! -f web/sites/default/settings.php ]; then
  cp web/sites/default/default.settings.php web/sites/default/settings.php
  echo "Created settings.php"
else
  echo "settings.php already exists, skipping"
fi

echo ""
echo "============================================"
echo " Setup complete!"
echo ""
echo " Next steps:"
echo "   1. Configure your database in web/sites/default/settings.php"
echo "   2. Run: drush site:install --existing-config -y"
echo "   3. Run: drush recipe recipes/base"
echo "   4. Visit your site and log in"
echo ""
echo " Or with Lando:"
echo "   1. Run: lando start"
echo "   2. Run: lando drush site:install --existing-config -y"
echo "   3. Run: lando drush recipe recipes/base"
echo "============================================"
