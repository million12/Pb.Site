(function (App) {
	'use strict';

	/**
	 * M12.FoundationSite app
	 */
	App = {
		/**
		 * Called on page load, to initialise all necessary components
		 */
		init: function() {
			// init zurb foundation
			$(document).foundation();
		},

		/**
		 * Initialise some localStorage variables,
		 * so Neos is by default pre-configured (e.g. Structure panel is opened)
		 */
		initNeosLocalStorage: function() {
			if (Modernizr.localstorage) {
				// Open the 'Structure' panel by default
				if (null === localStorage.getItem('contextStructureMode')) {
					localStorage.setItem('contextStructureMode', false);
				}
			}
		}
	};
	
	/**
	 * Invoked when page finished loading (via AJAX) in Neos back-end.
	 */
	document.addEventListener('Neos.PageLoaded', function () {
		App.init();
	}, false);

	/**
	 * Document ready: initialise all necessary components
	 */
	$(document).ready(function () {
		App.initNeosLocalStorage();
		App.init();
	});
})();
