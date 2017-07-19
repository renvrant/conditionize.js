Small jQuery plugins for handling showing and hiding things conditionally based on input - typically groups of form fields. It works using data attributes to keep all of the name/values for inputs directly in the markup and saves you the trouble of having to manually show/hide a bunch of stuff through JS, as well as improving maintenance if you need to change the name or value of an input you were listening to. Conditionize supports the following field types: checkboxes, radio buttons, selects, and all HTML5 input types.

Contains two files with plugins `conditionize.js` (old version) and `conditionize.flexible.js` (new version). Old version is saved for compatibility reasons since they use different data attributes. 
**Differences:**
- `conditionize.js` needs 2 or 3 attributes: <data-cond-option, data-cond-value[, data-cond-operator]>. `conditionize.flexible.js` uses only one attribute - data-condition.
- `conditionize.js` can use only one field in condition (data-cond-option). `conditionize.flexible.js` able to use complex conditions: two or more fields, or complex logic of a condition as "(A || B) && C".

# General usage
1. Set attributes in a container you want to be conditional.  **Both `name` and `id` references can be used.**
2. Then, call conditionize on the class...
```javascript
  $('.conditional').conditionize();
```

If you'd prefer to use CSS to hide everything that is to be shown conditionally...
```javascript
  $('.conditional').conditionize({
    hideJS: false
  });
```

# conditionize.js
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
## Usage
Conditionize looks for the name of an input to listen to and a value to listen for via data attributes on the element it is initialized on.

To use it, encapsulate form fields you want to show only conditionally in a container with the data attributes data-cond-option and data-cond-value. Give all containers you want conditionize to listen to a class.
```html
<label for="foo"><input name="foo" type="checkbox"> Foo</label>
<div class="conditional" data-cond-option="foo" data-cond-value="on">
  Bar
</div>
```
You can use conditional operator such as ==, !=, <=, <, >=, > or even 'in' for list of fields ...
```html
<select name="foo" id="foo">
    <option>first</option>
    <option>second</option>
    <option>third</option>
    <option>fourth</option>
</select>
<div class="conditional" data-cond-option="foo" data-cond-value="first,third" data-cond-operator="in">
  Bar
</div>
```
## Demo
http://codepen.io/renvrant/pen/ogeeBY

# conditionize.flexible.js
A flexible version of conditionize.js.
## Set attributes:
Similar to conditionize.js. Just use data-condition instead of <data-cond-option, data-cond-value[, data-cond-operator]>... 
```html
<label><input type="checkbox" id="example1"> Are you sure?</label>
<label><input type="checkbox" name="example2"> Really super sure?</label>
       <input type="text"     id="example3" placeholder="yay">
<!-- This will be shown only if BOTH examle1 and examle2 are checked AND 'yay' typed in examle3 -->
<p class="conditional" data-condition="#example1 == 'on' && example2 == 'on' && #example3 == 'yay'">
 Both are selected and YAY is typed!
</p>
```
## Demo
Download `flexible_demo.html` and `conditionize.flexible.jquery.js` in same folder. Open `flexible_demo.html` in your browser.
