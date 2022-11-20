export namespace Iterable_ {
	class Iterable<I> implements globalThis.Iterable<I> {
		constructor(private readonly iterable: globalThis.Iterable<I>) {}
		[Symbol.iterator](): Iterator<I, any, undefined> {
			return this.iterable[Symbol.iterator]()
		}
		forEach(callback: (value: I) => void): void {
			Iterable_.forEach(this, callback)
		}
		map<O>(mapping: (value: I) => O): Iterable<O> {
			function* generator(iterable: Iterable<I>, mapping: (value: I) => O): globalThis.Iterable<O> {
				for (const value of iterable)
					yield mapping(value)
			}
			return new Iterable(generator(this, mapping))
		}
		reduce<O>(reducer: (aggregate: O, value: I) => O, initial: O): O {
			return Iterable_.reduce(this, reducer, initial)
		}
		filter(filter: (value: I) => boolean): Iterable<I> {
			function* generator(iterable: Iterable<I>, filter: (value: I) => boolean): globalThis.Iterable<I> {
				for (const value of iterable)
					filter(value) && (yield value)
			}
			return new Iterable(generator(this, filter))
		}
		concatenate(iterable: globalThis.Iterable<I>): Iterable<I> {
			function* generator(a: globalThis.Iterable<I>, b: globalThis.Iterable<I>): globalThis.Iterable<I> {
				for (const value of a)
					yield value
				for (const value of b)
					yield value
			}
			return new Iterable(generator(this, iterable))
		}
		push(...values: I[]): Iterable<I> {
			function* generator(iterable: globalThis.Iterable<I>, values: I[]): globalThis.Iterable<I> {
				for (const value of iterable)
					yield value
				for (const value of values)
					yield value
			}
			return new Iterable(generator(this, values))
		}
		every(test: (value: I) => boolean): boolean {
			return Iterable_.every(this, test)
		}
		some(test: (value: I) => boolean): boolean {
			return Iterable_.some(this, test)
		}
		find(finder: (value: I) => boolean): I | undefined {
			return Iterable_.find(this, finder)
		}
		includes(needle: I): boolean {
			return Iterable_.includes(this, needle)
		}
		array(): I[] {
			return Array.from(this)
		}
		set(): Set<I> {
			const set = new Set<I>()
			for (const value of this)
				set.add(value)
			return set
		}
		unique(): Iterable<I> {
			function* generator(iterable: globalThis.Iterable<I>): globalThis.Iterable<I> {
				const history = new Set<I>()
				for (const value of iterable)
					if (!history.has(value))
						history.add(value), yield value
			}
			return new Iterable(generator(this))
		}
		fork(): [Iterable<I>, Iterable<I>] {
			const historyA: I[] = []
			const historyB: I[] = []
			function* generator(iterable: globalThis.Iterable<I>, self: I[], other: I[]): globalThis.Iterable<I> {
				for (let next = self[0]; self.length; next = self[0])
					self.shift(), yield next
				for (const value of iterable) {
					other.push(value)
					yield value
					for (let next = self[0]; self.length; next = self[0])
						self.shift(), yield next
				}
			}
			return [new Iterable(generator(this, historyA, historyB)), new Iterable(generator(this, historyB, historyA))]
		}
		static range(start: number, end: number, step = 1): Iterable<number> {
			function* generator(start: number, end: number, step: number): globalThis.Iterable<number> {
				if (start == end)
					yield start
				else if (step == 0) {
					yield start
					yield end
				} else if (start < end)
					for (let value = start; value < end; value += step)
						yield value
				else
					for (let value = start; value > end; value += step)
						yield value
			}
			return new Iterable(generator(start, end, step))
		}
	}
	export function forEach<I>(iterable: globalThis.Iterable<I>, callback: (value: I) => void): void {
		for (const value of iterable)
			callback(value)
	}
	export function map<I, O>(iterable: globalThis.Iterable<I>, mapping: (value: I) => O): Iterable<O> {
		return new Iterable(iterable).map(mapping)
	}
	export function reduce<I, O>(
		iterable: globalThis.Iterable<I>,
		reducer: (aggregate: O, value: I) => O,
		initial: O
	): O {
		let aggregate = initial
		for (const value of iterable)
			aggregate = reducer(aggregate, value)
		return aggregate
	}
	export function filter<I>(iterable: globalThis.Iterable<I>, filter: (value: I) => boolean): Iterable<I> {
		return new Iterable(iterable).filter(filter)
	}
	export function every<I>(iterable: globalThis.Iterable<I>, test: (value: I) => boolean): boolean {
		for (const value of iterable)
			if (!test(value))
				return false
		return true
	}
	export function some<I>(iterable: globalThis.Iterable<I>, test: (value: I) => boolean): boolean {
		for (const value of iterable)
			if (test(value))
				return true
		return false
	}
	export function find<I>(iterable: globalThis.Iterable<I>, finder: (value: I) => boolean): I | undefined {
		for (const value of iterable)
			if (finder(value))
				return value
		return undefined
	}
	export function includes<I>(iterable: globalThis.Iterable<I>, needle: I): boolean {
		for (const value of iterable)
			if (value == needle)
				return true
		return false
	}
	export function concatenate<I>(a: globalThis.Iterable<I>, b: globalThis.Iterable<I>): Iterable<I> {
		return new Iterable(a).concatenate(b)
	}
	export function push<I>(iterable: globalThis.Iterable<I>, ...values: I[]): Iterable<I> {
		return new Iterable(iterable).push(...values)
	}
	export function range(start: number, end: number, step = 1): Iterable<number> {
		return Iterable.range(start, end, step)
	}
	export function unique<I>(iterable: globalThis.Iterable<I>): Iterable<I> {
		return new Iterable(iterable).unique()
	}
	export function fork<I>(iterable: globalThis.Iterable<I>): [Iterable<I>, Iterable<I>] {
		return new Iterable(iterable).fork()
	}
}
