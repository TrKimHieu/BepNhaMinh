#!/usr/bin/env bash
#
# Chạy TỪ CI RUNNER (không chạy trên EC2). Gọi bởi .github/workflows/deploy-backend.yml.
#
# Luồng:
#   1. ssh vào EC2
#   2. ghi file .env từ secret (không nằm trong repo, không nằm trong image)
#   3. pull image mới → up -d → đợi healthcheck
#   4. nếu healthcheck fail → rollback về image trước
#
set -euo pipefail

: "${EC2_HOST:?Thiếu EC2_HOST}"
: "${EC2_USER:?Thiếu EC2_USER}"
: "${IMAGE_TAG:?Thiếu IMAGE_TAG}"
: "${GHCR_USER:?Thiếu GHCR_USER}"
: "${GHCR_TOKEN:?Thiếu GHCR_TOKEN}"

REMOTE_DIR="${REMOTE_DIR:-/opt/bepnhaminh}"
SSH_OPTS=(-i "$HOME/.ssh/deploy_key" -o StrictHostKeyChecking=yes)

echo "→ Deploy ${IMAGE_TAG} lên ${EC2_USER}@${EC2_HOST}"

ssh "${SSH_OPTS[@]}" "${EC2_USER}@${EC2_HOST}" bash -s <<REMOTE
set -euo pipefail

mkdir -p "${REMOTE_DIR}"
cd "${REMOTE_DIR}"

# 1. Ghi secret vào .env (chỉ trên server, quyền 600)
umask 077
cat > .env <<'ENVEOF'
${ENV_FILE_PAYLOAD:-}
ENVEOF
chmod 600 .env

# 2. Đăng nhập registry
echo "${GHCR_TOKEN}" | docker login ghcr.io -u "${GHCR_USER}" --password-stdin

# 3. Nhớ image đang chạy để rollback nếu cần
PREVIOUS=\$(docker inspect --format='{{.Config.Image}}' bepnhaminh-api-1 2>/dev/null || true)

# 4. Upgrade
export API_IMAGE="${API_IMAGE:-ghcr.io/change-me/bepnhaminh/api}:${IMAGE_TAG}"
docker compose pull api
docker compose up -d --remove-orphans

# 5. Đợi healthcheck
echo "→ Đợi container healthy..."
for i in \$(seq 1 30); do
  STATUS=\$(docker inspect --format='{{.State.Health.Status}}' bepnhaminh-api-1 2>/dev/null || echo starting)
  if [ "\$STATUS" = "healthy" ]; then
    echo "✓ Deploy thành công"
    docker image prune -f >/dev/null
    exit 0
  fi
  sleep 2
done

echo "✗ Healthcheck thất bại sau 60s"
docker compose logs --tail=100 api
if [ -n "\$PREVIOUS" ]; then
  echo "→ Rollback về \$PREVIOUS"
  API_IMAGE="\$PREVIOUS" docker compose up -d api
fi
exit 1
REMOTE
