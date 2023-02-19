import { kit } from "../index"

describe("Number", () => {
	it("modulo", () => {
		expect(kit.Number.modulo(7, 7)).toEqual(0)
		expect(kit.Number.modulo(-1, 7)).toEqual(6)
		expect(kit.Number.modulo(3, 2)).toEqual(1)
	})
})
