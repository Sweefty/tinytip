# TinyTip

Tiny tooltip jQuery plugin

  - Very small code with zero magic
  - No CSS file
  - Tooltip any html element

### Installation

You can install with bower:

```sh
$ bower install tinytip
```

### Demo & Documentation

Please Check [TinyTip](http://sweefty.com/tinytip) web page

### Quick Usage

Make sure to include jQuery before loadin swTooltip.js file

```js
$('.element').tinytip({
    position : 'bottom',
    animation : '+10',
    content : $('.drop-menu'),
    fix : '-20 -20',
    speed : 100,
    on : 'click',
    off: 'click',
    preventClose : true,
    onLoad : function(e){
        //e is the loaded tooltip element
        alert('tool tip box loaded');
    }
});
```

**Free Plugin by [sweefty.com](http://sweefty.com)**

License
----
MIT
