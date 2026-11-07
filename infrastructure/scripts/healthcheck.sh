#!/usr/bin/env bash
#
# Kiểm tra API còn sống không. Dùng trong CI hoặc cron trên EC2.
#
#   ./healthcheck.sh https://api.bepnhaminh.app
#
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
RETRIES="${RETRIES:-10}"
SLEEP_SECONDS="${SLEEP_SECONDS:-3}"

for attempt in $(seq 1 "$RETRIES"); do
  if curl --silent --fail --max-time 5 "${BASE_URL}/health" >/dev/null; then
    echo "✓ ${BASE_URL}/health OK (lần thử ${attempt})"
    exit 0
  fi
  echo "… lần thử ${attempt}/${RETRIES} thất bại"
  sleep "$SLEEP_SECONDS"
done

echo "✗ ${BASE_URL}/health không phản hồi sau ${RETRIES} lần thử"
exit 1
