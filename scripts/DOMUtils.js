(function(global) {
		const DOMUtils = {
				format: (num) => devTools().colorKey(num),
				capitalize: (word) => {
					if (word.length === 0) return word; // Handle empty strings
					return word.charAt(0).toUpperCase() + word.slice(1);
				},
				getInput: (id) =>   document.getElementById(id)	,
				hasClass: (el, className) => el.classList.contains(className),
				addListener: (id, event, callback) => {
					const input = document.getElementById(id)
					if(input) return input.addEventListener(event, (e) => callback(e))
				},
			toggleShow: (id, e ) => {
				const wrapper = document.getElementById(id)
				wrapper.classList.contains("hide")
					? wrapper.classList.remove("hide") : wrapper.classList.add("hide")
			}
			  

			
		};
		global.DOMUtils =  DOMUtils
})(window);