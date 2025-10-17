import Link from 'next/link';
import { TEXT } from '@/constants/text';

export function Header() {
  return (
    <header 
      style={{
        height: 'var(--size-header-height)',
        backgroundColor: 'var(--color-card)',
        boxShadow: 'var(--shadow-sm)',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
      }}
    >
      <div 
        className="container flex-between" 
        style={{ height: '100%' }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: 'var(--color-primary)', 
            borderRadius: 'var(--size-radius)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}>
            ع
          </div>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: 'var(--color-primary)' 
          }}>
            {TEXT.siteName}
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <Link href="/" style={{ fontWeight: 600, transition: 'color var(--transition-fast)' }}>
            الرئيسية
          </Link>
          <Link href="/about" style={{ fontWeight: 600, transition: 'color var(--transition-fast)' }}>
            عن المنصة
          </Link>
        </nav>
      </div>
    </header>
  );
}