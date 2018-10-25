export const canUseDOM =
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement;

export const SafeHTMLElement = canUseDOM ? (window as any).HTMLElement : {};