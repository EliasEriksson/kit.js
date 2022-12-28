import { kit } from "../index"

describe("css", () => {
	it("class", () => {
		expect(kit.css.class({ hidden: true, visible: false, wrapper: true })).toEqual("hidden wrapper")
	})
})
