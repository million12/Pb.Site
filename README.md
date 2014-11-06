# M12.FoundationSite - site package for TYPO3 Neos

Site package which works together with [M12.Foundation](https://github.com/million12/M12.Foundation) plugin.

## Usage

Include in your main `composer.json` file:  
``` json
    "repositories": [
        { "type": "git", "url": "https://github.com/million12/M12.FoundationSite" }
    ],
    "require": {
        - - standard dependencies here - -
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
* Samuel Ryzycki samuel@m12.io
