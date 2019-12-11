#!/usr/bin/env bash

CURRENT_DIR="$(dirname $0)"
PROJECT_DIR="$(realpath "$(dirname "$0")/../../..")"

node \
  -r esm \
  "$PROJECT_DIR/src/runner.js" \
  "$PROJECT_DIR/dataset/$1.js"
