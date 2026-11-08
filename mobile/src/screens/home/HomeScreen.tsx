import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import logo from '../../../assets/images/logo.png';
import { colors, radius, spacing, typography } from '../../constants/theme';
import { getApiBaseUrl, pingServer } from '../../services/apiClient';

type HealthState = 'checking' | 'online' | 'offline';

const STATUS_CONTENT: Record<HealthState, string> = {
  checking: 'Đang kiểm tra kết nối server...',
  online: 'Server Bếp Nhà Mình đang hoạt động',
  offline: 'Không gọi được server — kiểm tra lại kết nối',
};

/**
 * Màn hình mặc định khi chạy `npx expo start`.
 * - Tên sản phẩm: "Bếp Nhà Mình".
 * - Bảng thông tin kết nối server: gọi GET /api/v1/ping.
 * - Không gọi được (network error / timeout / lỗi) → dấu tròn đỏ + chữ X.
 * - Thành công → dấu tròn xanh + check xanh.
 */
export function HomeScreen() {
  const { data: ping, isLoading, isError } = useQuery({
    queryKey: ['server-health'],
    queryFn: pingServer,
    retry: false,
    staleTime: 10_000,
  });

  const status: HealthState = isLoading ? 'checking' : isError || !ping ? 'offline' : 'online';
  const online = status === 'online';

  const infoRows = [
    { label: 'Tên sản phẩm', value: 'Bếp Nhà Mình' },
    { label: 'API Base URL', value: getApiBaseUrl() },
    { label: 'Endpoint', value: '/api/v1/ping' },
    {
      label: 'Thời điểm phản hồi',
      value: ping ? new Date(ping.at).toLocaleTimeString('vi-VN') : '—',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Logo Bếp Nhà Mình"
        />
        <View style={styles.brandText}>
          <Text style={styles.title}>Bếp Nhà Mình</Text>
          <Text style={styles.subtitle}>Tuần này nhà mình ăn gì?</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: online ? colors.success : colors.danger },
            ]}
          >
            {status === 'checking' ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.statusBadgeText}>{online ? '✓' : '✕'}</Text>
            )}
          </View>
          <Text style={styles.statusText}>{STATUS_CONTENT[status]}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.infoTitle}>Thông tin kết nối</Text>
        {infoRows.map((row) => (
          <View key={row.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: radius.lg,
  },
  brandText: {
    flex: 1,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  statusBadgeText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  statusText: {
    ...typography.body,
    color: colors.text,
    flexShrink: 1,
  },
  infoTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  infoValue: {
    ...typography.caption,
    color: colors.text,
    textAlign: 'right',
  },
});
