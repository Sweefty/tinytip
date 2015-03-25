# TinyTip

Very small tooltip jQuery plugin, No CSS, TinyTip does not force any styling over your tooltips, you can style your tooltips as desired, it also allow you to display any content, texts, html and Dom elements inside your tooltips.

  - Very small code with zero magic
  - No CSS file
  - Tooltip any thing

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
