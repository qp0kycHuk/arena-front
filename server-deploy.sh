#!/bin/sh
set -e

echo "Deploying application ..."

echo "Get from git"
git pull origin master

echo "Building "
/root/.nvm/versions/node/v18.4.0/bin/npm install
/root/.nvm/versions/node/v18.4.0/bin/npm run build

echo "Application deployed!"
