import { zValidator } from '@hono/zod-validator'
import { number, object, string } from 'zod'

const requestBodySchema = {
  property1: string()
    .min(5, '`property1` must be a minimum of 5 characters long')
    .max(35, '`property1` must not exceed 35 characters'),
  property2: number().optional(),
}
export const validateRequestBody = zValidator('json', object(requestBodySchema))
