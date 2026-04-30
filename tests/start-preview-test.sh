#!/bin/bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
script_path="$repo_root/start-preview.command"

if [[ ! -x "$script_path" ]]; then
  echo "expected executable script at $script_path"
  exit 1
fi

output="$("$script_path" --dry-run)"

if [[ "$output" != *"http://127.0.0.1:8123/"* ]]; then
  echo "expected preview url in dry-run output"
  exit 1
fi

if [[ "$output" != *"python3 -m http.server 8123 --bind 127.0.0.1"* ]]; then
  echo "expected python http.server command in dry-run output"
  exit 1
fi

if [[ "$output" != *"$repo_root"* ]]; then
  echo "expected repository path in dry-run output"
  exit 1
fi

echo "start-preview dry-run behaves as expected"
