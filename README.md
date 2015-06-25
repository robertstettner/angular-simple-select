# angular-simple-select</br>[![Build Status](https://secure.travis-ci.org/robertstettner/angular-simple-select.svg?branch=master)](http://travis-ci.org/robertstettner/angular-simple-select) [![Coverage Status](https://coveralls.io/repos/robertstettner/angular-simple-select/badge.svg?branch=master)](https://coveralls.io/r/robertstettner/angular-simple-select?branch=master)

Create a simple list with icon checkboxes.

## Features
- Select and Multi-select with select all
- jQuery not required

## Getting Started

Install it using bower:
```
bower install angular-simple-select
```

Adding your dependency to your project:
```
angular.module('myModule', ['simple-select']);
```

Using it in your view:
```html
<div simple-select
    multiSelect=true
    item-ticked="active"
    item-disabled="disabled"
    item-unavailable="unavailable"
    item-name="name"
    on-tick-all="selectAll(data)"
    on-item-click="selectItem(data)"
    clicked-item="clickedItem"
    collection="myCollection">
    {{item.name}}
</div>
```

## Release notes

### 0.0.11
- Added Readme
- Integrated travisCI and coveralls
- Added another item state `itemUnavailable`, which only shows visual changes

### 0.0.10
- Fixed tick all functionality

### 0.0.9
- Fixed destination copy directory

### 0.0.2
- Added Multi-select feature with select all

### 0.0.1
- Initial release

## Contributors
- [Robert Stettner](https://github.com/robertstettner/)
- [Neville Chinan](https://github.com/nchinan/)
- [John Kiernander](https://github.com/johnkiernander/)

## License

The license is available within the repository in the [LICENSE](https://github.com/robertstettner/angular-simple-select/blob/master/LICENSE.md) file.
