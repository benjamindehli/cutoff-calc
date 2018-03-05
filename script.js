var app = new Vue({
	el: '#app',
	data: {
		resistor: {
			value: 100,
			multiplier: 1000
		},
		capacitor: {
			value: 47,
			multiplier: 0.000000001,
		},
		multipliers: [
		{name: "M", value: 1000000},
		{name: "K", value: 1000},
		{name: "", value: 1},
		{name: "m", value: 0.001},
		{name: "µ", value: 0.000001},
		{name: "n", value: 0.000000001},
		{name: "p", value: 0.000000000001}
		]
	},
	computed: {
		capacitorValue: function () {
			return this.capacitor.value * this.capacitor.multiplier;
		},
		resistorValue: function () {
			return this.resistor.value * this.resistor.multiplier;
		},
		cutoff: function () {
			var cutoff = 1 / (2*3.1415*this.resistorValue*this.capacitorValue);
			cutoff = Math.round(cutoff);
			if (cutoff > 999999){
				cutoff = cutoff / 1000000;
				cutoff = cutoff + " M"
			}
			else if (cutoff > 999){
				cutoff = cutoff / 1000;
				cutoff = cutoff + " K"
			}
			else {
				cutoff = cutoff + " ";
			}
			return cutoff;
		}
	}
});
