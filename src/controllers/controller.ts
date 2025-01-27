import { Hono } from 'hono'
import { greet, handleData } from 'src/services/service'
import { withAuthentication } from 'src/hooks/with-authentication'
import { validateRequestBody } from 'src/validation/request-body'

const app = new Hono()

app.get('/', greet)
app.get('/', validateRequestBody, withAuthentication, handleData)

export default app
