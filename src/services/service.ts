import { Context, Env } from 'hono'

export async function greet(context: Context) {
  return context.json({ message: 'Hello World' })
}

export async function handleData(context: Context<Env>) {
  const { sub } = context.get('user')!
  const body = await context.req.json<RequestBody>()
  console.log(sub, body)
  return context.json({ message: 'Success' }, 201)
}
