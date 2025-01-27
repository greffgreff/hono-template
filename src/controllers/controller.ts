import { Hono } from 'hono'
import { withAuthentication } from 'src/hooks/with-authentication'
import { greet, handleData } from 'src/services/service'
import { validateRequestBody } from 'src/validation/projects'

const app = new Hono()

app.get('/', greet)
app.get('/', validateRequestBody, withAuthentication, handleData)

export default app
