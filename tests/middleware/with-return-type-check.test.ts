import test from "ava"
import { getTestRoute } from "../fixtures/get-test-route.js"
import { withReturnTypeCheck } from "../../src/middleware/with-return-type-check.js"

test("throws error when route returns plain object", async (t) => {
  const { axios } = await getTestRoute(t, {
    globalSpec: {
      authMiddleware: {},
      beforeAuthMiddleware: [withReturnTypeCheck],
    },
    routeSpec: {
      auth: "none",
      methods: ["GET"],
    },
    routeFn: () => {
      return { message: "This should throw an error" }
    },
    routePath: "/test",
  })

  const response = await axios.get("/test", { validateStatus: () => true })

  t.is(response.status, 500)
  t.true(response.data.error.includes("Return value must be a Response"))
})

test("does not throw error when route uses ctx.json", async (t) => {
  const { axios } = await getTestRoute(t, {
    globalSpec: {
      authMiddleware: {},
      beforeAuthMiddleware: [withReturnTypeCheck],
    },
    routeSpec: {
      auth: "none",
      methods: ["GET"],
    },
    routeFn: (req, ctx) => {
      return ctx.json({ message: "This should not throw an error" })
    },
    routePath: "/test",
  })

  const response = await axios.get("/test")

  t.is(response.status, 200)
  t.is(response.data.message, "This should not throw an error")
})
