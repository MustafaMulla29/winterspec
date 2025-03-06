import { createWithWinterSpec } from "./create-with-winter-spec.js"
import { withReturnTypeCheck } from "./middleware/with-return-type-check.js"

export const withRouteSpec = createWithWinterSpec({
  beforeAuthMiddleware: [withReturnTypeCheck],
  authMiddleware: {},
  apiName: "Example",
  productionServerUrl: "https://example.com",
})
