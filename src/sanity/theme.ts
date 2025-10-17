import {buildLegacyTheme} from 'sanity'

const props = {
  '--brand-primary': '#002E63',
  '--brand-primary-light': '#1a4d8f',
  '--brand-secondary': '#F2F8FC',
  
  '--white': '#fff',
  '--black': '#1a1a1a',
  
  '--gray-100': '#F2F8FC',
  '--gray-200': '#e8f1f8',
  '--gray-300': '#d1e3f0',
  '--gray-400': '#a8c8e0',
  '--gray-500': '#7fa8c9',
  
  '--component-bg': '#ffffff',
  '--component-text-color': '#1a1a1a',
  
  '--default-button-color': '#002E63',
  '--default-button-primary-color': '#002E63',
  '--default-button-success-color': '#26a269',
  '--default-button-warning-color': '#cd9309',
  '--default-button-danger-color': '#c01c28',
  
  '--state-info-color': '#002E63',
  '--state-success-color': '#26a269',
  '--state-warning-color': '#cd9309',
  '--state-danger-color': '#c01c28',
  
  '--focus-color': '#002E63',
  
  // Typography
  '--font-family-base': '"Cairo", "Tajawal", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '--font-family-monospace': '"SF Mono", Monaco, "Courier New", monospace',
  
  // Font sizes - زيادة الأحجام
  '--font-size-base': '16px',
  '--font-size-small': '14px',
  '--font-size-large': '18px',
  '--font-size-xlarge': '20px',
  
  // Spacing
  '--spacing-base': '16px',
  '--spacing-small': '12px',
  '--spacing-large': '24px',
  
  // Border radius
  '--border-radius-base': '6px',
  '--border-radius-small': '4px',
  '--border-radius-large': '8px',
}

export const theme = buildLegacyTheme({
  '--black': props['--black'],
  '--white': props['--white'],

  '--gray': props['--gray-400'],
  '--gray-base': props['--gray-400'],

  '--component-bg': props['--component-bg'],
  '--component-text-color': props['--component-text-color'],

  '--brand-primary': props['--brand-primary'],

  '--default-button-color': props['--default-button-color'],
  '--default-button-primary-color': props['--default-button-primary-color'],
  '--default-button-success-color': props['--default-button-success-color'],
  '--default-button-warning-color': props['--default-button-warning-color'],
  '--default-button-danger-color': props['--default-button-danger-color'],

  '--state-info-color': props['--state-info-color'],
  '--state-success-color': props['--state-success-color'],
  '--state-warning-color': props['--state-warning-color'],
  '--state-danger-color': props['--state-danger-color'],

  '--focus-color': props['--focus-color'],
})