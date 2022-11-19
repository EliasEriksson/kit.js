import * as cryptly from "cryptly"

export namespace File_ {
	export function fromText(text: string): Blob {
		return new Blob([new TextEncoder().encode(text)])
	}
	export async function toText(file: Blob): Promise<string> {
		cryptly.Base64.encode(new Uint8Array(await file.arrayBuffer()))
		return new TextDecoder().decode(await file.arrayBuffer())
	}
	export function fromB64(text: string): Blob {
		return new Blob([cryptly.Base64.decode(text, "url")])
	}
	export async function toB64(file: Blob): Promise<string> {
		return cryptly.Base64.encode(new Uint8Array(await file.arrayBuffer()), "url")
	}
}
