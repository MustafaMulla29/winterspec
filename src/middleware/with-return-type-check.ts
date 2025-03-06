import { Middleware } from "./types.js"

export const withReturnTypeCheck: Middleware = async (req, ctx, next) => {
  const result = await next(req, ctx)
  if (result && typeof result === "object" && !(result instanceof Response)) {
    throw new Error(
      "Return value must be a Response. Use ctx.json({ ... }) to return JSON."
    )
  }
  return result
}
