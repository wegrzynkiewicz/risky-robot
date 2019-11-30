#!/usr/bin/env bash

cd "$(dirname "$0")/..";
RUNTIME="$(basename $(pwd -P))"
cd "../.."
ROOT_DIR="$(pwd -P)"

for DIR in ./packages/*/; do
    SCRIPT="${DIR}runtime/${RUNTIME}/bin/${1}.sh"
    if test -f ${SCRIPT}; then
        echo "Execute: ${SCRIPT}"
        ${SCRIPT} || exit 1;
    fi
done
