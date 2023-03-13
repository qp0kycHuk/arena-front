#!/bin/sh
set -e

echo "Deploying application ..."
curl "https://sp-wp.ru/?event=qwertyasdf1"

echo "Get from git"
git pull origin master

echo "Building "
/root/.nvm/versions/node/v18.4.0/bin/npm install
/root/.nvm/versions/node/v18.4.0/bin/npm run build

echo "Application deployed!"
curl "https://sp-wp.ru/?event=qwertyasdf2"
