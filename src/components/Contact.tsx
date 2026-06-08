/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Check, Loader2, Send, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setIsSuccess(false);
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'Contato via site – Dra. Fernanda',
          message: formData.message
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setSubmitError(
          'Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou fale diretamente pelo WhatsApp.'
        );
        console.error('Erro ao enviar formulário via Web3Forms:', result.message || 'Erro desconhecido');
      }
    } catch (err) {
      setSubmitError(
        'Não foi possível enviar sua mensagem agora. Verifique sua conexão e tente novamente, ou fale diretamente pelo WhatsApp.'
      );
      console.error('Erro de rede ao enviar para Web3Forms:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsappClick = () => {
    window.open('https://wa.me/5519982111193', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contato" className="py-16 md:py-24 xl:py-32 bg-lux-bg border-t border-lux-border relative">
      {/* Decorative vector background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.02),transparent)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Office info & Direct WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-gold-brand block">
                CONTATO
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-lux-text-primary">
                Agende seu <span className="title-serif italic font-medium text-gold-brand">atendimento</span>
              </h2>
              <div className="h-0.5 w-16 bg-gold-brand" />
            </div>

            <p className="text-lux-text-secondary font-light leading-relaxed text-sm md:text-base">
              Estamos à disposição para entender o seu caso e orientar com clareza e responsabilidade.
              Preencha o formulário para solicitar contato ou, se preferir, fale diretamente pelo WhatsApp.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4 items-center p-4 bg-lux-panel border border-lux-border rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gold-brand/10 flex items-center justify-center text-gold-brand shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-lux-text-muted">
                    WHATSAPP / TELEFONE
                  </div>
                  <span className="text-sm font-semibold text-lux-text-primary">
                    +55 (19) 98211-1193
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-center p-4 bg-lux-panel border border-lux-border rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gold-brand/10 flex items-center justify-center text-gold-brand shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-lux-text-muted">
                    E-MAIL DE CONTATO
                  </div>
                  <span className="text-sm font-semibold text-lux-text-primary">
                    fpavancini@bol.com.br
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-center p-4 bg-lux-panel border border-lux-border rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gold-brand/10 flex items-center justify-center text-gold-brand shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-lux-text-muted">
                    LOCAL DE ATENDIMENTO
                  </div>
                  <p className="text-sm font-semibold text-lux-text-primary">
                    R. Joaquim Inácio, 276 - Centro, Itapira - SP, 13970-150
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-dark/10 to-gold-brand/5 border border-gold-brand/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-block bg-gold-brand/10 text-[9px] font-bold uppercase tracking-widest text-gold-brand px-2.5 py-1 rounded">
                  ATENDIMENTO DIGITAL DISPONÍVEL
                </span>
              </div>
              <h4 className="title-serif text-lg font-light text-lux-text-primary">
                Prefere falar pelo WhatsApp?
              </h4>
              <p className="text-xs text-lux-text-secondary leading-relaxed font-light">
                Clique abaixo para falar por mensagem e agendar seu atendimento.
              </p>
              <button
                id="whatsapp-direct-button"
                onClick={handleWhatsappClick}
                className="w-full py-3.5 rounded-xl bg-gold-brand hover:bg-gold-light active:scale-98 text-lux-bg font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-lg shadow-gold-brand/15 hover:shadow-gold-brand/25 duration-300"
              >
                <MessageSquare className="w-4 h-4 text-lux-bg" />
                <span>CHAT VIA WHATSAPP</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-lux-panel border border-lux-border rounded-2xl p-6 md:p-8 relative">
            <h3 className="title-serif text-2xl font-light text-lux-text-primary mb-6">
              Agende seu atendimento
            </h3>

            {isSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl mb-6 flex items-start gap-3 animate-fade-in">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-lux-text-primary text-xs uppercase tracking-wider">
                    Mensagem enviada!
                  </h5>
                  <p className="text-xs text-emerald-400/90 leading-relaxed font-light mt-0.5">
                    Recebemos seu contato. Retornaremos o mais breve possível para agendarmos seu atendimento.
                  </p>
                </div>
              </div>
            )}

            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl mb-6 flex items-start gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-lux-text-primary text-xs uppercase tracking-wider">
                    Não foi possível enviar
                  </h5>
                  <p className="text-xs text-red-400/90 leading-relaxed font-light mt-0.5">
                    {submitError}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-lux-text-muted">
                    NOME COMPLETO *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: João da Silva"
                    className="w-full px-4 py-3 rounded-xl bg-lux-bg border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-lux-text-primary text-sm font-light placeholder:text-lux-text-muted/60 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-lux-text-muted">
                    E-MAIL DE CONTATO *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: joaosilva@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-lux-bg border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-lux-text-primary text-sm font-light placeholder:text-lux-text-muted/60 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-lux-text-muted">
                    TELEFONE COM DDD
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: (19) 99876-5432"
                    className="w-full px-4 py-3 rounded-xl bg-lux-bg border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-lux-text-primary text-sm font-light placeholder:text-lux-text-muted/60 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-lux-text-muted">
                    COMO PODEMOS AJUDAR?
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-lux-bg border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-lux-text-primary text-sm font-light select-custom transition-all duration-200"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="Direito Trabalhista">Direito Trabalhista</option>
                    <option value="Direito Previdenciário">Direito Previdenciário</option>
                    <option value="Direito Cível">Direito Cível</option>
                    <option value="Outro assunto">Outro assunto</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-lux-text-muted">
                  MENSAGEM *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Descreva brevemente sua situação."
                  className="w-full px-4 py-3 rounded-xl bg-lux-bg border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-lux-text-primary text-sm font-light placeholder:text-lux-text-muted/60 transition-all duration-200 resize-none"
                ></textarea>
              </div>

              <p className="text-[11px] text-lux-text-muted leading-relaxed">
                Ao preencher este formulário, seus dados serão utilizados exclusivamente para fins de contato e agendamento de atendimento, com privacidade e sigilo profissional.
              </p>

              <button
                type="submit"
                id="contact-form-submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-gold-dark to-gold-brand hover:from-gold-brand hover:to-gold-light text-lux-bg transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-lux-bg" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>ENVIAR MENSAGEM</span>
                    <Send className="w-3.5 h-3.5 text-lux-bg" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
