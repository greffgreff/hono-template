import { Context, Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

export function useExceptionMiddleware(app: Hono<any>, capture?: (err: any, ctx: Context) => Promise<void>) {
  app.onError((err, ctx) => {
    console.log(err)

    if (err instanceof HTTPException) {
      return err.getResponse()
    }

    if (capture) {
      capture(err, ctx)
    }

    return ctx.json({ message: `An error occured: ${err}` }, 500)
  })
}
