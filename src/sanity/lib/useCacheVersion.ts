'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/utils/logger';

/**
 * Hook لإدارة إصدار الـ Cache
 * يُستخدم لإعادة جلب البيانات عند تحديث المحتوى في Sanity
 */
export function useCacheVersion() {
  const [version, setVersion] = useState<number>(0);

  useEffect(() => {
    // جلب آخر إصدار من localStorage
    const savedVersion = localStorage.getItem('arabicq_cache_version');
    if (savedVersion) {
      setVersion(parseInt(savedVersion, 10));
    }

    // الاستماع لتحديثات من الـ Webhook (سيتم تفعيله في Layer 5)
    const handleCacheUpdate = (event: CustomEvent) => {
      const newVersion = event.detail.version;
      logger.info('Cache version updated', { newVersion });
      setVersion(newVersion);
      localStorage.setItem('arabicq_cache_version', newVersion.toString());
    };

    window.addEventListener('cache-update' as any, handleCacheUpdate);

    return () => {
      window.removeEventListener('cache-update' as any, handleCacheUpdate);
    };
  }, []);

  // دالة لتحديث الإصدار يدوياً
  const updateVersion = () => {
    const newVersion = Date.now();
    setVersion(newVersion);
    localStorage.setItem('arabicq_cache_version', newVersion.toString());
    logger.info('Cache version manually updated', { newVersion });
  };

  return { version, updateVersion };
}

/**
 * دالة لإرسال حدث تحديث الـ Cache
 * (سيتم استخدامها في Layer 5 مع الـ Webhook)
 */
export function triggerCacheUpdate() {
  const newVersion = Date.now();
  const event = new CustomEvent('cache-update', {
    detail: { version: newVersion },
  });
  window.dispatchEvent(event);
  logger.info('Cache update triggered', { newVersion });
}