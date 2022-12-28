import { Iterable_ } from "../Iterable"

export namespace Object_ {
	export function merge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
		return {}
	}
	function nestAssign<T extends Record<string, unknown>>(target: T, [key, ...tail]: string[], value: unknown): T {
		return key == undefined
			? target
			: !tail.length
			? Object.assign(target, { [key]: value })
			: Object.assign(target, {
					[key]: nestAssign(
						(current =>
							typeof current != "object" || !current || Array.isArray(current)
								? {}
								: (current as Record<string, unknown>))(target[key]),
						tail,
						value
					),
			  })
	}
	export function nest(source: Record<string, unknown>, separator = "."): Record<string, unknown> {
		return Object.entries(source).reduce((target, [key, value]) => nestAssign(target, key.split(separator), value), {})
	}
	function flatAssign(prefix: string, source: Record<string, unknown>, separator = "."): Record<string, unknown> {
		return Object.entries(source).reduce(
			(target, [key, value]) =>
				typeof value == "object" && value && value.constructor.name == "Object"
					? flatAssign(prefix + separator + key, value as Record<string, unknown>)
					: Object.assign(target, { [prefix + separator + key]: value }),
			{}
		)
	}
	export function flat(source: Record<string, unknown>, separator = "."): Record<string, unknown> {
		return Object.entries(source).reduce((target, [key, value]) => {
			return typeof value == "object" && value && value.constructor.name == "Object"
				? flatAssign(key, value as Record<string, unknown>, separator)
				: Object.assign(target, { [key]: value })
		}, {})
	}
	export function formData(source: Record<string, unknown>): FormData {
		const [form, data] = Object.entries(flat(source)).reduce<[FormData, Record<string, unknown>]>(
			([form, data], [key, value]) => (
				value instanceof Blob ? form.append(`file.${key}`, value) : (data[key] = value), [form, data]
			),
			[new FormData(), {}]
		)
		form.append("json", JSON.stringify(data))
		return form
	}
	export function fromFormData(form: FormData): Record<string, unknown> {
		return Iterable_.reduce(
			form.entries(),
			(target, [key, value]) => (
				console.log(target),
				key.startsWith("file.")
					? Object.assign(target, nest({ [key.substring(5)]: value }))
					: key == "json" && typeof value == "string"
					? Object.assign(target, nest(JSON.parse(value as string)))
					: target
			),
			{}
		)
	}
}
export function f(v: unknown) {
	return typeof v == "object" && v && "foo" in v && v
}
