import type { AppointmentFormData } from '@/types';

/**
 * Camada única de comunicação para o envio de marcações.
 *
 * - Com VITE_API_BASE_URL configurado: envia para o backend PHP próprio.
 * - Sem backend próprio: envia por e-mail para a clínica através do
 *   FormSubmit (serviço gratuito, sem servidor próprio necessário). Na
 *   primeira marcação, o FormSubmit envia um e-mail de confirmação para
 *   CLINIC_EMAIL — é necessário clicar em "Activate" nesse e-mail para que
 *   as marcações seguintes cheguem automaticamente.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const CLINIC_EMAIL = 'info@smilefamily.co.mz';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CLINIC_EMAIL}`;

/** Indica se existe um backend PHP próprio configurado. */
export const isApiConfigured = Boolean(API_BASE_URL);

export interface ApiResult {
  ok: boolean;
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

/** Corpo enviado ao FormSubmit: campos legíveis + configuração do e-mail. */
function toFormSubmitBody(data: AppointmentFormData) {
  return {
    _subject: `Nova marcação — ${data.name}`,
    _template: 'table',
    _captcha: 'false',
    Nome: data.name,
    Telefone: data.phone,
    'E-mail do paciente': data.email || 'Não indicado',
    Tratamento: data.treatment,
    'Data preferida': data.preferredDate,
    'Hora preferida': data.preferredTime || 'Não indicada',
    Mensagem: data.message || '—',
  };
}

/**
 * Submete uma marcação de consulta.
 *
 * - Com backend configurado: envia POST para `${API_BASE_URL}/appointments`.
 *   >>> PONTO DE INTEGRAÇÃO com o sistema de gestão PHP existente. <<<
 * - Sem backend: envia por e-mail para CLINIC_EMAIL através do FormSubmit.
 */
export async function submitAppointment(
  data: AppointmentFormData
): Promise<ApiResult> {
  const payload = sanitize(data);
  const endpoint = isApiConfigured
    ? `${API_BASE_URL}/appointments`
    : FORM_ENDPOINT;
  const body = isApiConfigured ? payload : toFormSubmitBody(payload);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return {
        ok: false,
        message:
          'Não foi possível enviar a marcação. Tente novamente ou contacte-nos por telefone.',
      };
    }

    if (!isApiConfigured) {
      // O FormSubmit responde sempre com HTTP 200; o sucesso real vem no
      // corpo. Na primeira utilização devolve success:"false" enquanto o
      // e-mail de ativação não for confirmado.
      const result = await response.json().catch(() => null);
      if (!result || result.success === 'false' || result.success === false) {
        return {
          ok: false,
          message:
            'Não foi possível enviar a marcação. Tente novamente ou contacte-nos por telefone.',
        };
      }
    }

    return {
      ok: true,
      message: 'Marcação enviada com sucesso. Entraremos em contacto em breve.',
    };
  } catch {
    return {
      ok: false,
      message:
        'Ocorreu um erro de ligação. Verifique a sua internet ou contacte-nos por telefone.',
    };
  }
}
