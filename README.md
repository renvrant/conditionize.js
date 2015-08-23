# conditionize.js
A small jQuery plugin for handling showing and hiding things conditionally based on input - typically groups of form fields. It works using data attributes to keep all of the name/values for inputs directly in the markup and saves you the trouble of having to manually show/hide a bunch of stuff through JS, as well as improving maintenance if you need to change the name or value of an input you were listening to.

Conditionize supports the following form field types:
- Checkboxes
- Radio buttons
- Selects
- Text input

# Usage
Conditionize looks for the name of an input to listen to and a value to listen for via data attributes on the element it is initialized on.

To use it, encapsulate form fields you want to show only conditionally in a container with the data attributes data-cond-option and data-cond-value. Give all containers you want conditionize to listen to a class.

```html
<label for="foo"><input name="foo" type="checkbox"> Foo</label>
<div class="conditional" data-cond-option="foo" data-cond-value="on">
  Bar
</div>
```

Then, call conditionize on the class...

```javascript
  $('.conditional').conditionize();
```

If you'd prefer to use CSS to hide everything that is to be shown conditionally...

```javascript
  $('.conditional').conditionize({
    hideJS: false
  });
```

# Demo

http://codepen.io/renvrant/pen/ogeeBY
