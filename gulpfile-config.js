module.exports = {
    vendorsDir: 'bower_components',
    source: {
        styles: 'Resources/Private/Styles/**/',
        vendorScripts: [
            'bower_components/foundation/js/vendor/modernizr.js',
            'bower_components/foundation/js/vendor/jquery.js',
            'bower_components/foundation/js/foundation.js',
            'node_modules/slick-carousel/slick/slick.js'
        ],
        scripts: ['Resources/Private/Scripts/App.js'],
        fonts: ['bower_components/Font-Awesome/fonts/*.*'],
        includePaths: [
            'bower_components',
            'bower_components/foundation/scss',
            'bower_components/Font-Awesome/scss',
            'node_modules/slick-carousel/slick'
        ]
    },
    dest: {
        styles: 'Resources/Public/Styles',
        scripts: 'Resources/Public/Scripts',
        images: '/_Resources/Static/Packages/Pb.Site/Images',
        fonts: 'Resources/Public/Fonts'
    },
    watch: {
        styles: 'Resources/Private/Styles/**/*',
        scripts: 'Resources/Private/Scripts/**/*',
        php: [
            'Classes/**/*',
            'Configuration/**/*',
            'Resources/**/*',
            '../../Plugins/M12.Foundation/**/*',
            '../../Plugins/M12.SlickCarousel/**/*',
            '../../Plugins/M12.Utils/**/*'
        ]
    },
    clear: [
        'Resources/Public/Styles/*',
        'Resources/Public/Scripts/*',
        'Resources/Public/Fonts/*'
    ]
};
