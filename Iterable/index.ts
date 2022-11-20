export namespace Iterable_ {
	export function* map<I, O>(iterable: Iterable<I>, mapping: (value: I) => O): Iterable<O> {
		for (const value of iterable)
			yield mapping(value)
	}
	export function reduce<I, O>(iterable: Iterable<I>, reducer: (aggregate: O, value: I) => O, initial: O): O {
		let aggregate = initial
		for (const value of iterable)
			aggregate = reducer(aggregate, value)
		return aggregate
	}
	export function* filter<I>(iterable: Iterable<I>, filter: (value: I) => boolean): Iterable<I> {
		for (const value of iterable)
			filter(value) && (yield value)
	}
	export function every<I>(iterable: Iterable<I>, test: (value: I) => boolean): boolean {
		for (const value of iterable)
			if (!test(value))
				return false
		return true
	}
	export function some<I>(iterable: Iterable<I>, test: (value: I) => boolean): boolean {
		for (const value of iterable)
			if (test(value))
				return true
		return false
	}
	export function find<I>(iterable: Iterable<I>, search: (value: I) => boolean): I | undefined {
		for (const value of iterable)
			if (search(value))
				return value
		return undefined
	}
	export function includes<I>(iterable: Iterable<I>, needle: I): boolean {
		for (const value of iterable)
			if (value == needle)
				return true
		return false
	}
	export function* concatenate<I>(a: Iterable<I>, b: Iterable<I>): Iterable<I> {
		for (const value of a)
			yield value
		for (const value of b)
			yield value
	}
	export function* push<I>(iterable: Iterable<I>, ...values: I[]): Iterable<I> {
		for (const value of iterable)
			yield value
		for (const value of values)
			yield value
	}
}
