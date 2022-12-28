import { Blob, File } from "web-file-polyfill"
import { kit } from "../index"
globalThis.Blob = Blob
globalThis.File = File

describe("Object", () => {
	it("42", () => {
		expect(42).toEqual(42)
	})
	it("nest", () => {
		expect(kit.Object.nest({ "foo.bar": 123, "foo.baz": 456 })).toEqual({ foo: { bar: 123, baz: 456 } })
		expect(kit.Object.nest({ foo: 123 })).toEqual({ foo: 123 })
	})
	it("flat", () => {
		expect(kit.Object.flat({ foo: { bar: 123, baz: 456 } })).toEqual({ "foo.bar": 123, "foo.baz": 456 })
		expect(kit.Object.flat({ foo: 123 })).toEqual({ foo: 123 })
	})
	it("nest + flat", () => {
		expect(kit.Object.nest(kit.Object.flat({ foo: { bar: "baz" } }))).toEqual({ foo: { bar: "baz" } })
		expect(kit.Object.flat(kit.Object.nest({ "foo.bar": "baz" }))).toEqual({ "foo.bar": "baz" })
		expect(kit.Object.nest(kit.Object.flat({ foo: 123 }, "o"))).toEqual({ foo: 123 })
	})
	it("formData", () => {
		const out = new FormData()
		const blob = new Blob()
		out.append("file.foo.baz", blob)
		out.append("json", JSON.stringify({ "foo.bar": 123 }))
		const result = kit.Object.formData({ foo: { bar: 123, baz: new Blob() } })
		const file = result.get("file.foo.baz")
		expect((file as File).name).toEqual("blob")
		expect((file as File).type).toEqual("")
		expect(typeof (file as File).lastModified).toEqual("number")
		const jsonString = result.get("json")
		expect(typeof jsonString).toEqual("string")
		const json = JSON.parse(jsonString as string)
		expect(json["foo.bar"]).toEqual(123)
	})
	it("formData", () => {
		const form = new FormData()
		form.append("json", JSON.stringify({ "foo.bar": 123 }))
		form.append("file.foo.baz", new Blob())
		console.log(kit.Object.fromFormData(form)) //.toEqual({ foo: { bar: 123, baz: new Blob() } })
		// const d = kit.Object.formData({ foo: new Blob(), bar: 123 })
		// const b = kit.Object.fromFormData(d)
	})
})
