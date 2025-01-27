import { Env, Hono } from 'hono'
import { useExceptionMiddleware } from 'src/hooks/use-error-handling'
import controller from 'src/controllers/controller'

const app = new Hono<Env>()

useExceptionMiddleware(app)

app.route('/controllers', controller)

export default app
