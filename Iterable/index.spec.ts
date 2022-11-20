import { structures } from "../index"

describe("Iterable", () => {
	it("range", () => {
		expect(Array.from(structures.Iterable.range(0, 0, 0))).toEqual([0])
		expect(Array.from(structures.Iterable.range(0, 1, 0))).toEqual([0, 1])
		expect(Array.from(structures.Iterable.range(0, 10))).toEqual(Array.from({ length: 10 }, (_, i) => i))
		expect(Array.from(structures.Iterable.range(0, -10, -1))).toEqual(Array.from({ length: 10 }, (_, i) => 0 - i))
		expect(Array.from(structures.Iterable.range(0, 10, 2))).toEqual(
			Array.from({ length: 10 }, (_, i) => i).filter(i => i % 2 == 0)
		)
		expect(Array.from(structures.Iterable.range(2, 5, 1))).toEqual([2, 3, 4])
		expect(Array.from(structures.Iterable.range(2, 5, 2))).toEqual([2, 4])
	})
	it("array", () => {
		expect(structures.Iterable.range(0, 10, 0).array()).toEqual([0, 10])
	})
	it("set", () => {
		expect(structures.Iterable.range(0, 10, 0).set()).toEqual(new Set([0, 10]))
	})
	it("map", () => {
		expect(structures.Iterable.map([1, 2, 3], v => v * 2).array()).toEqual([2, 4, 6])
		expect(structures.Iterable.map([1, 2, 3], v => v + 1).array()).toEqual([2, 3, 4])
	})
	it("mutability", () => {
		const data = [1, 2, 3]
		let iterable = structures.Iterable.map(data, n => n + 1)
		expect(Array.from(iterable).length).toEqual(3)
		expect(Array.from(iterable).length).not.toEqual(3)
		iterable = structures.Iterable.range(0, 10)
		expect(Array.from(iterable).length).toEqual(10)
		expect(Array.from(iterable).length).not.toEqual(10)
	})
	it("chaining", () => {
		expect(
			structures.Iterable.range(0, 5)
				.map(v => v + 1)
				.map(v => v * 2)
				.array()
		).toEqual([2, 4, 6, 8, 10])
	})
	it("reduce", () => {
		expect(structures.Iterable.range(0, 10).reduce((sum, value) => sum + value, 0)).toEqual(45)
		expect(structures.Iterable.reduce("asd", (aggregate, current) => current + aggregate, "")).toEqual("dsa")
	})
	it("filter", () => {
		expect(
			structures.Iterable.range(0, 10)
				.filter(v => v % 2 == 0)
				.reduce((sum, value) => sum + value, 0)
		).toEqual(20)
		expect(structures.Iterable.filter<string>("asd", v => v != "s").array()).toEqual(["a", "d"])
	})
	it("concatenate", () => {
		expect(structures.Iterable.concatenate([1], [2]).concatenate([3]).array()).toEqual([1, 2, 3])
	})
	it("push", () => {
		expect(structures.Iterable.push([1], 2).push(3, 4).array()).toEqual([1, 2, 3, 4])
	})
	it("includes", () => {
		expect(structures.Iterable.range(0, 10).includes(5)).toEqual(true)
		expect(structures.Iterable.includes([0, 1, 2, 3], 3)).toEqual(true)
	})
	it("every", () => {
		expect(structures.Iterable.range(0, 2).every(v => v >= 0)).toEqual(true)
		expect(structures.Iterable.range(-2, 2).every(v => v > 0)).toEqual(false)
		expect(structures.Iterable.every([0, 1, 2], v => v >= 0)).toEqual(true)
	})
	it("some", () => {
		expect(structures.Iterable.range(0, 2).some(v => v == 1)).toEqual(true)
		expect(structures.Iterable.range(0, 2).some(v => v == 2)).toEqual(false)
		expect(structures.Iterable.some([0, 1, 2], v => v == 2)).toEqual(true)
	})
	it("find", () => {
		const people = structures.Iterable.range(0, 10)
			.map(i => ({
				age: 20 + i,
			}))
			.array()
		expect(people.find(person => person.age == 25)).toEqual({ age: 25 })
		expect(structures.Iterable.find(people, person => person.age == 25)).toEqual({ age: 25 })
	})
	it("unique", () => {
		expect(structures.Iterable.unique([1, 1, 2, 3]).array()).toEqual([1, 2, 3])
	})
	it("fork", () => {
		const [a, b] = structures.Iterable.range(0, 4).fork()
		expect(a.array()).toEqual(b.array())
	})
})
