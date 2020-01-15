#!/usr/bin/env bash

CURRENT_DIR="$(dirname $0)"
PROJECT_DIR="$(realpath "$(dirname "$0")/../../..")"

mocha \
  --exit \
  --require esm \
  --require "${PROJECT_DIR}/tests/unit/bootstrap.js" \
  "${PROJECT_DIR}/tests/**/*.test.js"
