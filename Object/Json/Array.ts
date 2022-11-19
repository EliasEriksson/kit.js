import { Json } from "./internal"

export type Array_ = Json[]
export namespace Array_ {
	export function is(value: unknown | Array_): value is Array_ {
		return globalThis.Array.isArray(value) && value.every(value => Json.is(value))
	}
	export async function jsonify(value: Array_): Promise<Array_> {
		return Promise.all(value.map(async value => Json.jsonify(value)))
	}
	export async function objectify(value: Array_): Promise<unknown[]> {
		return Promise.all(value.map(async value => Json.objectify(value)))
	}
}
