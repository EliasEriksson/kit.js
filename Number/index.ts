export namespace Number_ {
	export function modulo(number: number, modulo: number) {
		return ((number % modulo) + modulo) % modulo;
	}
}
