import { createWithWinterSpec } from "../src/create-with-winter-spec.js"
import { withReturnTypeCheck } from "../src/middleware/with-return-type-check.js"

export const withRouteSpec = createWithWinterSpec({
  beforeAuthMiddleware: [withReturnTypeCheck],
  authMiddleware: {},
  apiName: "Example",
  productionServerUrl: "https://example.com",
})