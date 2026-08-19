import { cva } from 'class-variance-authority'
import { singleComponentStyles } from '../../lib/styles'

const toggleClassName = cva(singleComponentStyles.Toggle ?? '')

export { toggleClassName }
