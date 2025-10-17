import { TEXT } from '@/constants/text';

/**
 * الحصول على تسمية النتيجة بناءً على النسبة المئوية
 */
export function getScoreLabel(percentage: number): string {
  if (percentage >= 90) return TEXT.excellent;
  if (percentage >= 75) return TEXT.veryGood;
  if (percentage >= 60) return TEXT.good;
  return TEXT.weak;
}

/**
 * الحصول على لون النتيجة
 */
export function getScoreColor(percentage: number): string {
  if (percentage >= 90) return '#28A745'; // أخضر
  if (percentage >= 75) return '#17A2B8'; // أزرق
  if (percentage >= 60) return '#FFC107'; // أصفر
  return '#DC3545'; // أحمر
}

/**
 * حساب النسبة المئوية
 */
export function calculatePercentage(score: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * تنسيق النتيجة للعرض
 */
export function formatScore(score: number, total: number): string {
  const percentage = calculatePercentage(score, total);
  return `${score}/${total} (${percentage}%)`;
}