import type { LucideIcon } from 'lucide-react';

/** Item de menu de navegação. */
export interface NavItem {
  label: string;
  /** Alvo de scroll (id da secção) na página inicial. */
  href: string;
}

/** Diferencial apresentado na secção "Porquê a Smile Family?". */
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Tratamento apresentado na grelha de serviços. */
export interface Treatment {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
}

/** Estatística animada da secção de confiança. */
export interface Statistic {
  /** Valor numérico alvo. TEMPORÁRIO — substituir por dados reais. */
  value: number;
  /** Sufixo opcional (ex.: "+"). */
  suffix?: string;
  label: string;
}

/** Parceiro com logotipo. */
export interface Partner {
  id: string;
  name: string;
  /** Caminho para o logotipo em /public/partners. Vazio => placeholder. */
  logo?: string;
  url?: string;
}

/** Item da galeria da clínica. */
export interface GalleryItem {
  id: string;
  /** Caminho da imagem. Vazio => placeholder gerado por gradiente. */
  src?: string;
  alt: string;
  caption: string;
}

/** Depoimento de paciente (demonstrativo até substituição). */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

/** Dia de funcionamento no horário. */
export interface ScheduleDay {
  /** 0 = Domingo ... 6 = Sábado (compatível com Date.getDay). */
  weekday: number;
  label: string;
  /** Hora de abertura em minutos desde a meia-noite, ou null se encerrado. */
  opensAt: number | null;
  /** Hora de fecho em minutos desde a meia-noite, ou null se encerrado. */
  closesAt: number | null;
  display: string;
}

/** Dados submetidos pelo formulário de marcação. */
export interface AppointmentFormData {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  consent: boolean;
}
