#!/usr/bin/env bash

echo "test";

CURRENT_DIR="$(dirname "$0")"
PROJECT_DIR="$(realpath "$(dirname "$0")/../../..")"

mocha \
  --exit \
  --require esm \
  --require "${PROJECT_DIR}/tests/bootstrap.js" \
  "${PROJECT_DIR}/tests/**/*.test.js"
