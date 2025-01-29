import { Student } from '../types/student';

export const EJAADA_CERTIFICATE_THRESHOLD = 200;

export function isEligibleForEjaadaCertificate(student: Student): boolean {
  return student.totalPoints >= EJAADA_CERTIFICATE_THRESHOLD;
}

export function calculateProgress(points: number): number {
  return Math.min((points / EJAADA_CERTIFICATE_THRESHOLD) * 100, 100);
}

export function formatArabicDate(date: Date): string {
  const months = [
    'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}