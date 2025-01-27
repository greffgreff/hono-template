import { Hono } from 'hono'
import { withAuthentication } from 'src/hooks/with-authentication'
import { greet, handleData } from 'src/services/service'

const app = new Hono()

app.get('/', greet)
app.get('/', withAuthentication, handleData)

export default app
