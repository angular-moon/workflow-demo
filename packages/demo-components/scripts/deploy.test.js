const rewire = require("rewire")
const deploy = rewire("./deploy")
const run = deploy.__get__("run")
// @ponicode
describe("run", () => {
    test("0", async () => {
        await run()
    })
})
