#!/bin/bash
set -e
cd "$(dirname "$0")"
while true; do
  /usr/bin/python3 server.py
  sleep 1
done
