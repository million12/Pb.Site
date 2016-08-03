# Pb.Site - Neos CMS site package
[![Circle CI](https://circleci.com/gh/million12/Pb.Site.svg?style=svg)](https://circleci.com/gh/million12/Pb.Site)

Site package which works together with [M12.Foundation](https://github.com/million12/M12.Foundation)
and other plugins with UI/UX components.


## Usage

Include in your main `composer.json` file:  
``` json
    "require": {
        "your/other": "dependencies/here",
        "m12/neos-foundation": "dev-master",
        "m12/neos-pb-site": "dev-master"
    },
```  
and run `composer install`


## Build process

npm and gulp is used to compile/minify styles and JavaScript.

From `~/neos-site/Packages/Sites/Pb.Site` you can run:

``` bash
# Install npm and bower dependencies:
npm install

# Run complete build
npm run build
npm run build:prod # to minify/compress files

# Run gulp watch
npm watch
```


## Author(s)

* Marcin Ryzycki marcin@m12.io  

Licensed under: The MIT License (MIT)

**Sponsored by** [PrototypeBrewery.io - the new prototyping tool](http://prototypebrewery.io/) 
for building fully interactive prototypes of your website or web app. Built on top of 
Neos CMS and Zurb Foundation framework.
