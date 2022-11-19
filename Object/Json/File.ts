import { File_ } from "../../File"
import { Object as Object_ } from "./internal"

export interface File {
	type: "file"
	value: string
	lastModified?: number
	mime?: string
	name?: string
}
export namespace File {
	export function is(value: unknown): value is File {
		return !!(
			typeof value == "object" &&
			value &&
			(value =>
				value.type == "file" &&
				typeof value.value == "string" &&
				(value.lastModified == undefined || typeof value.lastModified == "number") &&
				(value.mime == undefined || typeof value.mime == "string") &&
				(value.name == undefined || typeof value.name == "string"))(value as Record<string, unknown>)
		)
	}
	export async function jsonify(file: globalThis.Blob): Promise<Object_> {
		return {
			"": {
				type: "file",
				value: await File_.toB64(file),
				...(file instanceof globalThis.File && {
					name: file.name,
					mime: file.type,
					lastModified: file.lastModified,
				}),
			},
		}
	}
	export async function objectify(file: File): Promise<globalThis.Blob> {
		return file.mime && file.name
			? new globalThis.File([File_.fromB64(file.value)], file.name, {
					type: file.mime,
					lastModified: file.lastModified,
			  })
			: File_.fromB64(file.value)
	}
}
