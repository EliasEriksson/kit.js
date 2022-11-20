import { structures } from "../index"

describe("Iterable", () => {
	it("map", () => {
		expect(Array.from(structures.Iterable.map([1, 2, 3], v => v))).toEqual([1, 2, 3])
	})
	it("reduce", () => {
		expect(structures.Iterable.reduce([1, 2, 3], (a, c) => a + c, 0)).toEqual(6)
		expect(structures.Iterable.reduce([], v => v, 0)).toEqual(0)
	})
})
