export const css = {
	class: function (classes: { [cls: string]: boolean }) {
		return Object.entries(classes)
			.reduce<string[]>((classes, [cls, condition]) => (condition && classes.push(cls), classes), [])
			.join(" ")
	},
}
