import { buildDefaultValues } from './index'
import { defineFormField, defineFormSchema } from '../define-form-schema'

describe('buildDefaultValues', () => {
  it('returns empty string defaults for text fields', () => {
    const schema = defineFormSchema([
      defineFormField({ name: 'email', type: 'text', label: 'Email' }),
      defineFormField({ name: 'password', type: 'password', label: 'Password' }),
    ])

    expect(buildDefaultValues(schema)).toEqual({
      email: '',
      password: '',
    })
  })

  it('returns false defaults for checkbox fields', () => {
    const schema = defineFormSchema([
      defineFormField({ name: 'remember', type: 'checkbox', label: 'Remember me' }),
    ])

    expect(buildDefaultValues(schema)).toEqual({
      remember: false,
    })
  })
})
