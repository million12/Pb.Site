# M12.FoundationSite - Neos CMS site package
[![Circle CI](https://circleci.com/gh/million12/M12.FoundationSite.svg?style=svg)](https://circleci.com/gh/million12/M12.FoundationSite)

Site package which works together with [M12.Foundation](https://github.com/million12/M12.Foundation) plugin implementing [Zurb Foundation](http://foundation.zurb.com/) components.

## Usage

Include in your main `composer.json` file:  
``` json
    "require": {
        "your/other": "dependencies/here",
        "m12/neos-foundation": "dev-master",
        "m12/neos-foundation-site": "dev-master"
    },
```  
and run `composer install`


## Build process

Gulp is used to compile/minify styles and JavaScript. You need **npm** and **bower** tools installed.

From the M12.FoundationSite directory run:

``` bash
# Install bower and npm dependencies:
npm install
bower install

# Run complete build
gulp build [--env=Production] # When run with --env=Production, will minify/compress files

# Run gulp watch
gulp watch
```


## Author(s)

* Marcin Ryzycki marcin@m12.io  

Licensed under: The MIT License (MIT)

**Sponsored by** [Typostrap.io - the new prototyping tool](http://typostrap.io/) for building highly-interactive prototypes of your website or web app. Built on top of Neos CMS and Zurb Foundation framework.
