#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

git config user.name "$USER_NAME"
git config user.email "$USER_EMAIL"

# Add github to known_hosts to enable push from CI
mkdir -p ~/.ssh
echo 'github.com ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==' >> ~/.ssh/known_hosts

# Get reference to target branch, then checkout current branch again
git checkout gh-pages
git checkout $CIRCLE_BRANCH

# Remove everything from the project root except _site, .git, and .gitignore
find . -maxdepth 1 ! -name '_site' ! -name '.git' -exec rm -rf {} \;

# Move contents of _site to project root, then remove _site folder
mv _site/* .
rm -R _site/

# Push everything to gh-pages branch. :boom:
git add -fA
git commit --allow-empty -m "$(git log use-gh-pages -1 --pretty=%B)"

git push -f origin use-gh-pages:gh-pages

echo "Deployed successfully to geotrev.github.io/undernet"
