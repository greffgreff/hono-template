import { Context, Env, Next } from 'hono'
import { createRemoteJWKSet, jwtVerify } from 'jose'

export async function withAuthentication(context: Context<Env>, next: Next) {
  const authorization = context.req.header('Authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return context.json({ message: 'Unauthorized' }, 401)
  }

  const token = authorization.replace('Bearer ', '')
  const { OAUTH_AUDIENCE: audience, OAUTH_AUTHORITY: issuer } = context.env

  if (!audience || !issuer) {
    throw new Error('OAuth 2 issuer or audience is null')
  }

  const jwks = createRemoteJWKSet(new URL(`${issuer}.well-known/jwks.json`))

  try {
    const { payload } = await jwtVerify(token, jwks, { audience, issuer })
    context.set('user', payload)
    await next()
  } catch {
    return context.json({ message: 'Invalid token' }, 403)
  }
}
