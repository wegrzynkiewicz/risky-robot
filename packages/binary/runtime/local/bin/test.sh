#!/usr/bin/env bash

CURRENT_DIR="$(dirname $0)"
PROJECT_DIR="$(realpath "$(dirname "$0")/../../..")"

"${CURRENT_DIR}/test-unit.sh"
