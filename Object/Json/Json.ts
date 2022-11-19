import { Object as Object_ } from "./internal"
import { Basic } from "./internal"
import { Array } from "./internal"

export type Json = Basic | Array | Object_
export namespace Json {
	export function is(value: unknown): value is Json {
		return Basic.is(value) || Array.is(value) || Object_.is(value)
	}
	export async function jsonify(value: unknown): Promise<Json> {
		return Basic.is(value)
			? Basic.jsonify(value)
			: globalThis.Array.isArray(value)
			? Array.jsonify(value)
			: Object_.is(value)
			? Object_.jsonify(value)
			: null
	}
	export function objectify(value: Json): Promise<unknown> {
		return Basic.is(value)
			? Basic.objectify(value)
			: globalThis.Array.isArray(value)
			? Array.objectify(value)
			: Object_.objectify(value)
	}
}
