import { structures } from "../index"

describe("Object", () => {
	it("42", () => {
		expect(42).toEqual(42)
	})
	it("nest", () => {
		expect(structures.Object.nest({}, "f.o.o".split("."), true)).toEqual({ f: { o: { o: true } } })
		expect(structures.Object.nest({}, [], true)).toEqual({})
		expect(structures.Object.nest({ f: [] }, "f.o.o".split("."), true)).toEqual({ f: { o: { o: true } } })
		expect(structures.Object.nest({ f: { c: 123 } }, "f.o.o".split("."), true)).toEqual({
			f: { o: { o: true }, c: 123 },
		})
	})
})
