import 'hono'
import { JWTPayload } from 'jose'

declare module 'hono' {
  interface Env {
    Bindings: {
      OAUTH_AUDIENCE?: string
      OAUTH_AUTHORITY?: string
    }
    Variables: {
      user?: JWTPayload
    }
  }
}
