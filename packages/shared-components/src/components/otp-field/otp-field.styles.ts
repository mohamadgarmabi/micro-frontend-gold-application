import { cva } from 'class-variance-authority'
import { styles } from '../../lib/styles'

const otpfieldStyles = {
  Input: cva(
    `${styles.otpInput} gold-otp-slot p-0 leading-none !text-center [direction:ltr] [text-align:center]`,
  ),
}

export { otpfieldStyles }
