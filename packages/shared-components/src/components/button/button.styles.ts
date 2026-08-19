import { cva } from 'class-variance-authority'
import { singleComponentStyles } from '../../lib/styles'

const buttonClassName = cva(singleComponentStyles.Button ?? '')

export { buttonClassName }
