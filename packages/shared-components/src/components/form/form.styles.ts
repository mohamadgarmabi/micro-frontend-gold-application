import { cva } from 'class-variance-authority'
import { singleComponentStyles } from '../../lib/styles'

const formClassName = cva(singleComponentStyles.Form ?? '')

export { formClassName }
