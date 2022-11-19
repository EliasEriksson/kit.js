import { File, Json, Set } from "./internal"

export interface Object_ {
	[key: string]: Json
}
export namespace Object_ {
	export function is(value: unknown): value is Object_ {
		return !!(
			typeof value == "object" &&
			value &&
			!globalThis.Array.isArray(value) &&
			globalThis.Object.values(value).every(value => {
				return Json.is(value)
			})
		)
	}
	export async function jsonify(value: Object_): Promise<Object_> {
		return globalThis.Object.fromEntries(
			await Promise.all(
				globalThis.Object.entries(value).map<Promise<[string, Json]>>(async ([key, value]) => [
					key,
					await Json.jsonify(value),
				])
			)
		)
	}
	export async function objectify(value: Object_): Promise<unknown> {
		return value[""] && globalThis.Object.keys(value).length == 1 && Set.is(value[""])
			? Set.objectify(value[""])
			: File.is(value[""])
			? File.objectify(value[""])
			: globalThis.Object.fromEntries(
					await Promise.all(
						globalThis.Object.entries(value).map<Promise<[string, unknown]>>(async ([key, value]) => [
							key,
							await Json.objectify(value),
						])
					)
			  )
	}
}
