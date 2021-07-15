#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e


npm run build


cd dist


git init
git add -A
git commit -m 'deploy'


git push -f git@github.com:AndreyUytov/todo-js.git master:gh-pages

cd -