#!/bin/sh
set -e

echo "Deploying application ..."

echo "Get from git"
git pull origin master

echo "Building "
npm install
npm run build

echo "Application deployed!"
