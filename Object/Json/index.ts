import * as internal from "./internal"
export type Json = internal.Json
export namespace Json {
	export const is = internal.Json.is
	export const jsonify = internal.Json.jsonify
	export const objectify = internal.Json.objectify
	export type Basic = internal.Basic
	export const Basic = internal.Basic
	export type Array = internal.Array
	export const Array = internal.Array
	export type Object = internal.Object
	export const Object = internal.Object
	export type Set = internal.Set
	export const Set = internal.Set
	export type File = internal.File
	export const File = internal.File
}
