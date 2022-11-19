import { File, Object as Object_, Set } from "./internal"

export type Basic = string | number | boolean | null | Set | File
export namespace Basic {
	export function is(value: unknown | Basic): value is Basic {
		return (
			typeof value == "number" ||
			typeof value == "string" ||
			typeof value == "boolean" ||
			value === null ||
			value instanceof globalThis.Set ||
			value instanceof globalThis.Blob
		)
	}
	export async function jsonify(value: unknown): Promise<Basic | Object_> {
		return value instanceof globalThis.Set
			? Set.jsonify(value)
			: value instanceof globalThis.Blob
			? File.jsonify(value)
			: Basic.is(value)
			? value
			: null
	}
	export async function objectify(value: Basic): Promise<unknown> {
		return value
	}
}
