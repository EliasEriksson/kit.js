import { Json as json } from "./Json"

export namespace Object_ {
	export function nest<T extends Record<string, unknown>>(target: T, [key, ...tail]: string[], value: unknown): T {
		return !key
			? target
			: !tail.length
			? Object.assign(target, { [key]: value })
			: Object.assign(target, {
					[key]: nest(
						(current =>
							typeof current != "object" || !current || Array.isArray(current)
								? {}
								: (current as Record<string, unknown>))(target[key]),
						tail,
						value
					),
			  })
	}
	export function keys<T extends Record<string, unknown>>(target: T): (keyof T)[] {
		return Object.keys(target) as (keyof T)[]
	}
	export function entries<T extends Record<string, unknown>>(target: T): [keyof T, T[keyof T]][] {
		return Object.entries(target) as [keyof T, T[keyof T]][]
	}
	export type Json = json
	export const Json = json
}
