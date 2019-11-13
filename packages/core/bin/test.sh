#!/usr/bin/env bash

mocha \
  --exit \
  --require esm \
  "tests/**/*.test.js"
