(function () {
	'use strict';

	/**
	 * Check if we are in Neos back-end
	 * @type {boolean}
	 */
	var IS_NEOS_BE = false;

	/**
	 * M12.FoundationSite app
	 */
	var App = {
		/**
		 * Called on page load, to initialise all necessary components
		 */
		init: function() {
			// init zurb foundation
			$(document).foundation();

			// prevent some default events when in Neos back-end
			this.preventDefaultsWhenInNeosBackend();
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
				// Set the left menu to be shown in sticky mode
				if (null === localStorage.getItem('menuConfiguration')) {
					localStorage.setItem('menuConfiguration', '{"content":false,"menuPanelStickyMode":true,"isMenuPanelStickyModeShown":true}');
				}
			}
		},

		/**
		 * Prevent some default events when in Neos back-end
		 */
		preventDefaultsWhenInNeosBackend: function() {
			if (false === IS_NEOS_BE) {
				return;
			}
			
			// By default, after click on LABEL, focus is moved to related INPUT field.
			// Prevent that default action while in edit mode (@see TS-113)
			$('label').children('.neos-inline-editable').click(function(e) {
				e.preventDefault();
			});
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
		// detect if we are in Neos back-end
		IS_NEOS_BE = typeof T3 !== 'undefined' || typeof Typo3Neos !== 'undefined';
		
		App.initNeosLocalStorage();
		App.init();
	});
})();
