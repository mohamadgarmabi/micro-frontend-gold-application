import { cva } from 'class-variance-authority'
import { singleComponentStyles } from '../../lib/styles'

const separatorClassName = cva(singleComponentStyles.Separator ?? '')

export { separatorClassName }
