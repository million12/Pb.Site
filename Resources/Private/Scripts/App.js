(function () {
    'use strict';

    /**
     * Check if we are in Neos back-end
     * @type {boolean}
     */
    let IS_NEOS_BE = false;

    /**
     * Pb.Site app
     */
    const App = {
        /**
         * Called on page load, to initialise all necessary components
         */
        initFundation: function () {
            // init zurb foundation
            $(document).foundation();

            // prevent some default events when in Neos back-end
            this.preventDefaultsWhenInNeosBackend();
        },

        /**
         * Init Slick Carousel
         */
        initSlickCarousel: function () {
            var slickEl = $('.m12-slickcarousel-slick');

            $(slickEl).on('init', (event, slick) => {
                // Support non-standard 'nextOnClick' option:
                if (slick.slickGetOption('nextOnClick')) {
                    $(slick.$slider).on('click', () => slick.slickNext());
                }
            });

            // Initialise Slick
            $(slickEl).slick();
        },

        /**
         * Initialise some localStorage variables,
         * so Neos is by default pre-configured (e.g. Structure panel is opened)
         */
        initNeosLocalStorage: function () {
            if (Modernizr.localstorage) {
                // Open the 'Structure' panel by default
                if (null === localStorage.getItem('contextStructureMode')) {
                    localStorage.setItem('contextStructureMode', false);
                }
            }
        },

        /**
         * Prevent some default events when in Neos back-end
         */
        preventDefaultsWhenInNeosBackend: function () {
            if (false === IS_NEOS_BE) {
                return;
            }

            // By default, after click on LABEL, focus is moved to related INPUT field.
            // Prevent that default action while in edit mode (@see TS-113)
            $('label')
                .children('.neos-inline-editable')
                .click(e => e.preventDefault());
        }
    };

    /**
     * Invoked when page finished loading (via AJAX) in Neos back-end.
     */
    document.addEventListener('Neos.PageLoaded', function () {
        // console.log('Neos.PageLoaded');
        App.initFundation();
        App.initSlickCarousel();
    });
    /**
     * Invoked when new content element has been added and rendered on page
     * (but w/o full page reload).
     */
    document.addEventListener('Neos.NodeCreated', function (e) {
        const createdNodeType = $(e.detail.element).data('node-_nodeType');
        const parentNodeType =  $(e.detail.element).data('node-__parent-node-type');
        // console.log('Neos.NodeCreated:', parentNodeType, '>', createdNodeType);

        // When certain node type is inserted...
        switch (createdNodeType) {
            // Some JavaScript components need to be fully re-initialised after inserting
            case 'M12.Foundation:Accordion':
            case 'M12.Foundation:Tabs':
                App.initFundation();
                break;
        }

        // When node is inserted inside certain parent node type...
        switch (parentNodeType) {
            case 'M12.SlickCarousel:Slick':
                App.initSlickCarousel();
                break;
        }
    });

    /**
     * Document ready: initialise all necessary components
     */
    $(document).ready(function () {
        // detect if we are in Neos back-end
        IS_NEOS_BE = typeof T3 !== 'undefined' || typeof Typo3Neos !== 'undefined';

        App.initNeosLocalStorage();
        App.initFundation();
        App.initSlickCarousel();
    });
})();
