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
        init: function () {
            // init zurb foundation
            $(document).foundation();

            // prevent some default events when in Neos back-end
            this.preventDefaultsWhenInNeosBackend();
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
            $('label').children('.neos-inline-editable').click(function (e) {
                e.preventDefault();
            });
        }
    };

    /**
     * Invoked when page finished loading (via AJAX) in Neos back-end.
     */
    document.addEventListener('Neos.PageLoaded', function () {
        App.init();
    });
    /**
     * Invoked when new content element has been added and rendered on page
     * (but w/o full page reload).
     */
    document.addEventListener('Neos.NodeCreated', function (e) {
        var createdNodeType = $(e.detail.element).data('node-_nodeType');
        // console.log('Neos.NodeCreated:', createdNodeType);

        switch (createdNodeType) {
            // Some JavaScript components need to be fully re-initialised after inserting
            case 'M12.Foundation:Accordion':
            case 'M12.Foundation:Orbit':
            case 'M12.Foundation:Tabs':
                App.init();
                break;

            // Some components are altered with extra nodes being created before/after the inserted node.
            // E.g. when inserting RevealModal, extra button (to trigger that modal) is created before.
            // To support such a case, we need fully reload the page, otherwise the extra node
            // is not rendered (because Neos doesn't know about it).
            // @see M12.Foundation.assistanceChildNodes in Settings.yaml
            //
            // Update for Neos 2.0-RC1 (2015/08/03):
            // After inserting node types listed below (and couple of others
            // - seems like all of them where we add some extra child nodes
            // which are not defined in NodeTypes) the page is reloaded anyway
            // due to early exit and warning `Node could not be found in rendered collection.`
            // generated from NodeActions.js in _insertNode() function.
            // Commenting out for now as it works perfectly fine (for now).
            // The only remaining issue is that the structure tree is not reloaded
            // so the newly inserted nodes are not visible there. Hopefully it's sth
            // which will be fixed in Neos soon.
            //
            //case 'M12.Foundation:Dropdown':
            //case 'M12.Foundation:DropdownContent':
            //case 'M12.Foundation:RevealModal':
            //	console.log('doing full page reload');
            //	Typo3Neos.Content.reloadPage();
            //	break;
        }
    });

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
