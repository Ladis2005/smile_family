/**
 * Faz scroll suave até uma secção pelo seu id (com ou sem prefixo "#").
 * Respeita `prefers-reduced-motion` do navegador via CSS scroll-behavior.
 */
export function scrollToId(hash: string) {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
