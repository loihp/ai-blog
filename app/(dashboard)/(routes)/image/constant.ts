import * as z from 'zod';

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Image Prompt is required'
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
})

export const amountOptions = [
  {
    label: '1',
    value: '1 Photo'
  },
  {
    label: '2',
    value: '2 Photos'
  },
  {
    label: '3',
    value: '3 Photos'
  },
  {
    label: '4',
    value: '4 Photos'
  },
  {
    label: '5',
    value: '5 Photos'
  },
]

export const resolutionOptions = [
  {
    value: '256x256',
    label: '256x256',
  },
  {
    value: '512x512',
    label: '512x512',
  },
  {
    value: '1024x1024',
    label: '1024x1024',
  },
  {
    value: '2048x2048',
    label: '2048x2048',
  }
]