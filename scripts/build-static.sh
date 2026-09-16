#!/bin/sh
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
rm -rf "$DIST"
mkdir -p "$DIST/css" "$DIST/books" "$DIST/authors" "$DIST/publishers" "$DIST/reviews"
cp "$ROOT/shell/index.html" "$DIST/"
cp "$ROOT/shell/home.html" "$DIST/"
cp "$ROOT/shell/sites.js" "$DIST/"
cp "$ROOT/shell/css/"* "$DIST/css/"
cd "$ROOT/books-frontend"
npm install
npm run build
cp -R dist/* "$DIST/books/"
cd "$ROOT/authors-frontend"
npm install
npm run build
cp -R dist/* "$DIST/authors/"
cp "$ROOT/publishers-frontend/index.html" "$DIST/publishers/"
cp "$ROOT/publishers-frontend/api.js" "$DIST/publishers/"
cp "$ROOT/publishers-frontend/app.js" "$DIST/publishers/"
cp "$ROOT/publishers-frontend/seed.json" "$DIST/publishers/"
cp -R "$ROOT/publishers-frontend/css" "$DIST/publishers/"
cd "$ROOT/reviews-frontend"
npm install
npm run build
cp -R dist/* "$DIST/reviews/"
echo "Static sites built in dist/"
