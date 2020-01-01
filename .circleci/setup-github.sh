#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

git config user.name "$USER_NAME"
git config user.email "$USER_EMAIL"

# Remove everything from the project root except _site, .git, and .gitignore
find . -maxdepth 1 ! -name '_site' ! -name '.git' -exec rm -rf {} \;

# Move contents of _site to project root, then remove _site folder
mv _site/* .
rm -R _site/

# Push everything to gh-pages branch. :boom:
git add -fA
git commit --allow-empty -m "$(git log use-gh-pages -1 --pretty=%B)"

git checkout gh-pages
git checkout use-gh-pages
git push -f origin gh-pages

echo "Deployed successfully to geotrev.github.io/undernet"
