/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsapp() {
  const handleClick = () => {
    window.open('https://wa.me/5519982111193', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      id="floating-whatsapp-btn"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gold-brand hover:bg-gold-light text-lux-bg font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-gold-brand/15 hover:shadow-gold-brand/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer md:px-5 md:py-3.5"
    >
      <MessageCircle className="w-5 h-5 text-lux-bg fill-current" />
      <span className="hidden sm:inline">WhatsApp</span>
    </button>
  );
}
