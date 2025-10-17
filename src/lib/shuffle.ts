/**
 * خوارزمية Fisher-Yates لخلط المصفوفات بشكل عشوائي
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]; // نسخة من المصفوفة
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * خلط الأسئلة مع الحفاظ على الترتيب الأصلي كمرجع
 */
export function shuffleWithIndex<T>(array: T[]): Array<T & { originalIndex: number }> {
  return shuffle(
    array.map((item, index) => ({
      ...item,
      originalIndex: index,
    }))
  );
}

/**
 * خلط اختيارات سؤال MCQ
 */
export function shuffleChoices(choices: string[], correctIndex: number): {
  shuffledChoices: string[];
  newCorrectIndex: number;
} {
  const correctAnswer = choices[correctIndex];
  
  // إنشاء مصفوفة مع الفهارس
  const choicesWithIndex = choices.map((choice, index) => ({
    choice,
    index,
  }));
  
  // خلط الاختيارات
  const shuffled = shuffle(choicesWithIndex);
  
  // إيجاد الفهرس الجديد للإجابة الصحيحة
  const newCorrectIndex = shuffled.findIndex(
    (item) => item.choice === correctAnswer
  );
  
  return {
    shuffledChoices: shuffled.map((item) => item.choice),
    newCorrectIndex,
  };
}