import { Array, Json, Object as Object_ } from "./internal"

export interface Set {
	type: "set"
	value: Array
}
export namespace Set {
	export function is(value: unknown): value is Set {
		return !!(
			typeof value == "object" &&
			value &&
			(value => typeof value.type == "string" && Array.is(value.value))(value as Record<string, unknown>)
		)
	}
	export async function jsonify(set: globalThis.Set<Json>): Promise<Object_> {
		return {
			"": {
				type: "set",
				value: await Array.jsonify(globalThis.Array.from(set)),
			},
		}
	}
	export async function objectify(set: Set): Promise<globalThis.Set<unknown>> {
		return new globalThis.Set(set.value)
	}
}
