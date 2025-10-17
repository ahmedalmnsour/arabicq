/**
 * تطبيع النص العربي لمقارنة الإجابات
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  
  return text
    .trim()
    .toLowerCase()
    // إزالة التشكيل
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // توحيد الهمزات
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ىي]/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    // إزالة المسافات الزائدة
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * مقارنة إجابتين مع تطبيع النص
 */
export function compareAnswers(answer1: string, answer2: string): boolean {
  return normalizeArabicText(answer1) === normalizeArabicText(answer2);
}

/**
 * التحقق من صحة الإجابة النصية مع قائمة إجابات صحيحة
 */
export function checkTextAnswer(
  userAnswer: string,
  validAnswers: string[]
): boolean {
  const normalizedUserAnswer = normalizeArabicText(userAnswer);
  
  return validAnswers.some((validAnswer) =>
    normalizeArabicText(validAnswer) === normalizedUserAnswer
  );
}

/**
 * تنظيف الإجابة من الأحرف غير الضرورية
 */
export function cleanAnswer(answer: string): string {
  return answer
    .trim()
    // إزالة علامات الترقيم من البداية والنهاية
    .replace(/^[.,;:!?؟،]+|[.,;:!?؟،]+$/g, '')
    .trim();
}

/**
 * التحقق من التطابق الجزئي (للإجابات الطويلة)
 */
export function partialMatch(
  userAnswer: string,
  validAnswer: string,
  threshold = 0.8
): boolean {
  const normalized1 = normalizeArabicText(userAnswer);
  const normalized2 = normalizeArabicText(validAnswer);
  
  // حساب نسبة التطابق باستخدام Levenshtein distance المبسط
  const maxLength = Math.max(normalized1.length, normalized2.length);
  if (maxLength === 0) return true;
  
  let matches = 0;
  const minLength = Math.min(normalized1.length, normalized2.length);
  
  for (let i = 0; i < minLength; i++) {
    if (normalized1[i] === normalized2[i]) {
      matches++;
    }
  }
  
  const similarity = matches / maxLength;
  return similarity >= threshold;
}