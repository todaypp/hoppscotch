const findStatusGroup = require("../findStatusGroup")
describe("findStatusGroup.default", () => {
  test("0", () => {
    const callFunction = () => {
      findStatusGroup.default(200)
    }

    expect(callFunction).not.toThrow()
  })

  test("1", () => {
    const callFunction = () => {
      findStatusGroup.default(601)
    }

    expect(callFunction).not.toThrow()
  })

  test("2", () => {
    const callFunction = () => {
      findStatusGroup.default(404)
    }

    expect(callFunction).not.toThrow()
  })

  test("3", () => {
    const callFunction = () => {
      findStatusGroup.default(99)
    }

    expect(callFunction).not.toThrow()
  })

  test("4", () => {
    const callFunction = () => {
      findStatusGroup.default(500.0)
    }

    expect(callFunction).not.toThrow()
  })

  test("5", () => {
    const callFunction = () => {
      findStatusGroup.default(-Infinity)
    }

    expect(callFunction).not.toThrow()
  })
})
