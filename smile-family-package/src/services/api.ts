import type { AppointmentFormData } from '@/types';

/**
 * Camada única de comunicação com o backend PHP.
 * A URL base vem de VITE_API_BASE_URL (nunca fixar endereços nos componentes).
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/** Indica se existe um backend configurado. Sem ele, corre em modo demonstrativo. */
export const isApiConfigured = Boolean(API_BASE_URL);

export interface ApiResult {
  ok: boolean;
  /** true quando nenhum backend está configurado e a resposta foi simulada. */
  demo: boolean;
  message: string;
}

/** Sanitização básica: remove tags e limita comprimento antes de enviar. */
function clean(value: string, maxLength = 1000): string {
  return value
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

function sanitize(data: AppointmentFormData): AppointmentFormData {
  return {
    name: clean(data.name, 120),
    phone: clean(data.phone, 40),
    email: clean(data.email, 160),
    treatment: clean(data.treatment, 120),
    preferredDate: clean(data.preferredDate, 20),
    preferredTime: clean(data.preferredTime, 20),
    message: clean(data.message, 1000),
    consent: Boolean(data.consent),
  };
}

/**
 * Submete uma marcação de consulta.
 *
 * - Com backend configurado: envia POST para `${API_BASE_URL}/appointments`.
 *   >>> PONTO DE INTEGRAÇÃO com o sistema de gestão PHP existente. <<<
 * - Sem backend: devolve sucesso simulado (modo demonstrativo) para que o
 *   formulário continue utilizável durante o desenvolvimento.
 */
export async function submitAppointment(
  data: AppointmentFormData
): Promise<ApiResult> {
  const payload = sanitize(data);

  if (!isApiConfigured) {
    // Modo demonstrativo — simula latência de rede.
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.info('[modo demonstrativo] Marcação que seria enviada:', payload);
    return {
      ok: true,
      demo: true,
      message:
        'Marcação registada em modo demonstrativo. Ligue a API em VITE_API_BASE_URL para envio real.',
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        ok: false,
        demo: false,
        message:
          'Não foi possível enviar a marcação. Tente novamente ou contacte-nos por telefone.',
      };
    }

    return {
      ok: true,
      demo: false,
      message: 'Marcação enviada com sucesso. Entraremos em contacto em breve.',
    };
  } catch {
    return {
      ok: false,
      demo: false,
      message:
        'Ocorreu um erro de ligação. Verifique a sua internet ou contacte-nos por telefone.',
    };
  }
}
