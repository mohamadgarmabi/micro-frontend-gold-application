import { cva } from 'class-variance-authority'

const generatedFormStyles = cva('flex flex-col gap-4')

const generatedFormFooterStyles = cva('flex items-center gap-3 [&>*]:flex-1')

export { generatedFormFooterStyles, generatedFormStyles }
