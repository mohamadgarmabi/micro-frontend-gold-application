import { cva } from 'class-variance-authority'
import { singleComponentStyles } from '../../lib/styles'

const menubarClassName = cva(singleComponentStyles.Menubar ?? '')

export { menubarClassName }
