$(document).ready(function(){
	'use strict';

	// Run Zurb Foundation
	$(document).foundation();
});

/**
 * Invoked when page finished loading (via AJAX) in Neos back-end.
 */
document.addEventListener('Neos.PageLoaded', function () {
	'use strict';
	
	// Re-initialise Foundation again
	// This is needed to properly build newly added on page JS components (slider, tabs etc)
	// @TODO: Do we need to call it with some timeout? Seems like it works OK without it.
	$(document).foundation();
	
}, false);
