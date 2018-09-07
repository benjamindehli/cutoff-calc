var app = new Vue({
	el: '#app',
	data: {
		offsetResistor: {
			value: 6.8,
			multiplier: 1000
		},
		potentiometer: {
			value: 960,
			position: 100,
			multiplier: 1000
		},
		potentiometerType: 'lin',
		capacitor: {
			value: 15,
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
		offsetResistorValue: function () {
			return this.offsetResistor.value * this.offsetResistor.multiplier;
		},
		potentiometerValue: function () {
			return this.getPotentiometerValue();
			
		},
		cutoff: function () {
			var currentResistanceValue = this.getPotentiometerValue() + this.offsetResistorValue;
			var minimumResistanceValue = this.getPotentiometerValue(0) + this.offsetResistorValue;
			var maximumResistanceValue = this.getPotentiometerValue(100) + this.offsetResistorValue;
			var currentCutoff = 1 / (2*3.1415*currentResistanceValue*this.capacitorValue);
			var minimumCutoff = 1 / (2*3.1415*minimumResistanceValue*this.capacitorValue);
			var maximumCutoff = 1 / (2*3.1415*maximumResistanceValue*this.capacitorValue);
			cutoff = {
				current: currentCutoff,
				minimum: minimumCutoff,
				maximum: maximumCutoff
			};
			/*if (cutoff > 999999){
				cutoff = cutoff / 1000000;
				cutoff = cutoff + " M"
			}
			else if (cutoff > 999){
				cutoff = cutoff / 1000;
				cutoff = cutoff + " K"
			}
			else {
				cutoff = cutoff + " ";
			}*/
			return cutoff;
		}
	},
	methods: {
		getPotentiometerValue(position) {
			var potentiometerPosition = position !== undefined ? position : this.potentiometer.position;
			if (this.potentiometerType == 'lin'){
				return this.potentiometer.value * (potentiometerPosition/100) * this.potentiometer.multiplier;
			}else if(this.potentiometerType == 'log'){
				var logValue = potentiometerPosition > 0 ? Math.pow(this.potentiometer.value, potentiometerPosition/100) : 0;
				return logValue * this.potentiometer.multiplier;
			}
		},
		getSuffixValue(value){
			if (value > 999999){
				return Math.round(value / 1000000) + " M";
			}
			else if (value > 999){
				return Math.round(value)/ 1000 + " K";
			}
			else {
				return Math.round(value);
			}
		}
	}
});
