import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  defineFormSchema,
  GeneratedForm,
  LockIcon,
  MailIcon,
  type InferFormValues,
} from '@gold/form'

const contactSchema = defineFormSchema([
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
    required: true,
    leftIcon: <MailIcon />,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '••••••••',
    required: true,
    leftIcon: <LockIcon />,
  },
  {
    name: 'remember',
    type: 'checkbox',
    label: 'Remember me',
  },
])

type ContactFormValues = InferFormValues<typeof contactSchema>

export const Route = createFileRoute('/form')({
  component: FormDemo,
})

function FormDemo() {
  const [lastSubmit, setLastSubmit] = useState<ContactFormValues | null>(null)

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell mx-auto max-w-lg rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">@gold/form</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Generated form
        </h1>
        <p className="mb-6 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Schema-driven fields rendered with TanStack Form and{' '}
          <code>@gold/shared-components</code> inputs. Submit values are fully
          typed from the schema.
        </p>

        <div className="gold-root rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <GeneratedForm
            fields={contactSchema}
            defaultValues={{ password:"2342432423" }}
            submitLabel="Sign in"
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 800))
              setLastSubmit(values)
            }}
          />
        </div>

        {lastSubmit ? (
          <pre className="mt-6 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-xs text-[var(--sea-ink-soft)]">
            {JSON.stringify(lastSubmit, null, 2)}
          </pre>
        ) : null}
      </section>
    </main>
  )
}
