import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, Loader2, Info } from 'lucide-react';
import { treatments } from '@/data/treatments';
import { submitAppointment, isApiConfigured } from '@/services/api';
import type { AppointmentFormData } from '@/types';

interface AppointmentModalProps {
  open: boolean;
  onClose: () => void;
}

type Errors = Partial<Record<keyof AppointmentFormData, string>>;

const EMPTY: AppointmentFormData = {
  name: '',
  phone: '',
  email: '',
  treatment: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
  consent: false,
};

/** Valida os campos e devolve um mapa de erros (vazio se válido). */
function validate(data: AppointmentFormData): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 3)
    errors.name = 'Introduza o seu nome completo.';
  if (!/^[+\d][\d\s()-]{6,}$/.test(data.phone.trim()))
    errors.phone = 'Introduza um número de telefone válido.';
  if (
    data.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  )
    errors.email = 'Introduza um e-mail válido.';
  if (!data.treatment) errors.treatment = 'Selecione um tratamento.';
  if (!data.preferredDate) errors.preferredDate = 'Escolha uma data.';
  if (!data.consent)
    errors.consent = 'É necessário aceitar o tratamento dos seus dados.';
  return errors;
}

/** Secção/modal de marcação de consulta. */
export function AppointmentModal({ open, onClose }: AppointmentModalProps) {
  const [data, setData] = useState<AppointmentFormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [feedback, setFeedback] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Fechar com Escape e bloquear scroll do fundo.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // Focar o primeiro campo ao abrir.
    const t = setTimeout(() => firstFieldRef.current?.focus(), 100);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Repor estado ao fechar.
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setData(EMPTY);
        setErrors({});
        setStatus('idle');
        setFeedback('');
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const update = <K extends keyof AppointmentFormData>(
    key: K,
    value: AppointmentFormData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Proteção contra submissões repetidas.
    if (status === 'sending') return;

    const found = validate(data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setStatus('sending');
    setFeedback('');
    const result = await submitAppointment(data);

    if (result.ok) {
      setStatus('success');
      setFeedback(result.message);
    } else {
      setStatus('idle');
      setFeedback(result.message);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-dark/60 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="appointment-title"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-8 w-full max-w-lg rounded-3xl bg-white p-6 shadow-glow sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-light hover:text-dark"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            {status === 'success' ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-dark">
                  Marcação recebida
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  {feedback}
                </p>
                <button onClick={onClose} className="btn btn-primary mt-7">
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <h2
                  id="appointment-title"
                  className="pr-8 font-display text-2xl font-bold text-dark"
                >
                  Marcar consulta
                </h2>
                <p className="mt-1.5 text-sm text-muted">
                  Preencha os seus dados e entraremos em contacto para
                  confirmar.
                </p>

                {!isApiConfigured && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-light p-3 text-xs text-muted">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>
                      Modo demonstrativo: a integração com o sistema será feita
                      em{' '}
                      <code className="text-primary">src/services/api.ts</code>{' '}
                      (VITE_API_BASE_URL).
                    </span>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-5 space-y-4"
                >
                  <Field
                    label="Nome completo"
                    error={errors.name}
                    required
                    htmlFor="ap-name"
                  >
                    <input
                      ref={firstFieldRef}
                      id="ap-name"
                      type="text"
                      value={data.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="input"
                      autoComplete="name"
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Telefone"
                      error={errors.phone}
                      required
                      htmlFor="ap-phone"
                    >
                      <input
                        id="ap-phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="input"
                        autoComplete="tel"
                        placeholder="+258 ..."
                      />
                    </Field>
                    <Field
                      label="E-mail"
                      error={errors.email}
                      htmlFor="ap-email"
                    >
                      <input
                        id="ap-email"
                        type="email"
                        value={data.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="input"
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  <Field
                    label="Tratamento pretendido"
                    error={errors.treatment}
                    required
                    htmlFor="ap-treatment"
                  >
                    <select
                      id="ap-treatment"
                      value={data.treatment}
                      onChange={(e) => update('treatment', e.target.value)}
                      className="input"
                    >
                      <option value="">Selecione…</option>
                      {treatments.map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Data preferida"
                      error={errors.preferredDate}
                      required
                      htmlFor="ap-date"
                    >
                      <input
                        id="ap-date"
                        type="date"
                        min={today}
                        value={data.preferredDate}
                        onChange={(e) =>
                          update('preferredDate', e.target.value)
                        }
                        className="input"
                      />
                    </Field>
                    <Field label="Hora preferida" htmlFor="ap-time">
                      <input
                        id="ap-time"
                        type="time"
                        value={data.preferredTime}
                        onChange={(e) =>
                          update('preferredTime', e.target.value)
                        }
                        className="input"
                      />
                    </Field>
                  </div>

                  <Field label="Mensagem" htmlFor="ap-message">
                    <textarea
                      id="ap-message"
                      rows={3}
                      value={data.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input resize-none"
                      placeholder="Descreva brevemente a sua necessidade (opcional)."
                    />
                  </Field>

                  {/* Consentimento */}
                  <div>
                    <label className="flex items-start gap-2.5 text-sm text-muted">
                      <input
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => update('consent', e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-muted/40 text-primary focus:ring-secondary"
                        aria-describedby={
                          errors.consent ? 'ap-consent-error' : undefined
                        }
                      />
                      <span>
                        Autorizo o tratamento dos meus dados para efeitos de
                        marcação e contacto.
                      </span>
                    </label>
                    {errors.consent && (
                      <p
                        id="ap-consent-error"
                        className="mt-1 text-xs text-rose-500"
                      >
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {feedback && status === 'idle' && (
                    <p
                      role="alert"
                      className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600"
                    >
                      {feedback}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-primary w-full"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />A enviar…
                      </>
                    ) : (
                      'Confirmar marcação'
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Campo de formulário com rótulo e mensagem de erro associada. */
function Field({
  label,
  error,
  required,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-dark"
      >
        {label}
        {required && <span className="text-rose-400"> *</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1 text-xs text-rose-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
