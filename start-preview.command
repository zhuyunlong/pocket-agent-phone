#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-8123}"
URL="http://${HOST}:${PORT}/"
NO_OPEN=0
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-open)
      NO_OPEN=1
      ;;
    --dry-run)
      DRY_RUN=1
      NO_OPEN=1
      ;;
    *)
      echo "Unknown option: $1" >&2
      echo "Usage: $0 [--no-open] [--dry-run]" >&2
      exit 1
      ;;
  esac
  shift
done

SERVER_CMD=(python3 -m http.server "$PORT" --bind "$HOST")

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "Preview root: $ROOT_DIR"
  echo "Preview URL: $URL"
  echo "Server command: ${SERVER_CMD[*]}"
  exit 0
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required but was not found in PATH." >&2
  exit 1
fi

if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $PORT is already in use. Reusing existing listener for $URL"
else
  echo "Preview server starting for $ROOT_DIR"
fi

echo "Open: $URL"

if [[ "$NO_OPEN" -eq 0 ]]; then
  open "$URL"
fi

if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  exit 0
fi

cd "$ROOT_DIR"
exec "${SERVER_CMD[@]}"
