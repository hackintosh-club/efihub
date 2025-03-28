#!/bin/bash
SCRIPT_DIR=$(dirname "$0")
DOCS=$SCRIPT_DIR/docs
VENDOR=$DOCS/_vendor

# minify js
minify $VENDOR/h8h.js -o $VENDOR/h8h.min.js
# minify css
minify $VENDOR/h8h.css -o $VENDOR/h8h.min.css
# minify html
minify --html-keep-document-tags --html-keep-default-attrvals --html-keep-end-tags --html-keep-quotes $DOCS/index.html -o $DOCS/index.html
cp -f $DOCS/index.html $DOCS/404.html
