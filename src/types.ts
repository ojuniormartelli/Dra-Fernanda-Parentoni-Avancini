/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface SpecialtyDetail {
  id: string;
  title: string;
  shortDescription: string;
  heroSubtitle: string;
  headerTitle: string;
  illustration: string;
  painPoints: string[];
  solutions: string[];
  howItWorks: string[];
  differentials: { title: string; description: string }[];
  faqs: FAQItem[];
}

export type PageId = 'home' | 'trabalhista' | 'previdenciario' | 'civel';

export interface RouteState {
  page: PageId;
  lp: boolean; // is landing page mode active?
}
