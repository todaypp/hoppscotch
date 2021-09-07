const getLinkTag = require("../getLinkTag")
describe("getLinkTag.default", () => {
  test("0", () => {
    const result = getLinkTag.default({ to: "/test", blank: false })
    expect(result).toBe("NuxtLink")
  })

  test("1", () => {
    const result = getLinkTag.default({ to: "./path/to/file", blank: false })
    expect(result).toBe("a")
  })

  test("2", () => {
    const result = getLinkTag.default({ to: ".", blank: false })
    expect(result).toBe("a")
  })

  test("3", () => {
    const result = getLinkTag.default({ to: "path/to/file.ext", blank: false })
    expect(result).toBe("a")
  })

  test("4", () => {
    const result = getLinkTag.default({ to: "/ ", blank: false })
    expect(result).toBe("NuxtLink")
  })

  test("5", () => {
    const result = getLinkTag.default({ to: undefined, blank: undefined })
    expect(result).toBe("button")
  })
})
