# functional reactive programming with bacon.js

a different way to work with asynchronous data

---

# why?

we prefer functional style

we care about good UX

managing state is hard

---

# what does it do for our team?

brings familiar concepts to the UI (`map`, `filter`, "`flatMap`")

simple data transformations with pure functions

can reduce explicit state manipulation

reads top to bottom

robust solution: having to lay out the data flow helps better understand problem

---

# elephants

"just look at the types"

we could use it with TypeScript or PureScript

we can also use it with our current Backbone code

not a hammer: still learning about what works best and what doesn not

---

# event stream

an "immutable" stream of chronological events

```
$('form').asEventStream('change');
```

---

# property

an "immutable" value created from a stream
optionally with initial value

```
formChanges.toProperty(bootstrap.params);
```

---

# example 1: counting clicks

```
var clicks = $('button').asEventStream('click');

var values = clicks.map(1);

var counter = values.scan(0, sum);
```

---

# example 2: capturing triple clicks

```
var clicks = $('button').asEventStream('click');

var throttled = clicks.bufferWithTime(300);

throttled
  .map('.length')
  .filter(function(size) {
    return size >= 3;
  });

```

---

# example 3: asynchronous operations

```
// define our data flow
var changes = $('form').asEventStream('change');
var params = changes.map(serializeToObject);
var results = params.flatMapLatest(compose(Bacon.fromPromise, doAjax));
var waiting = params.awaiting(results);

// update DOM when state changes
waiting.onValue(toggleSpinner);
results.onValue(renderResults);

// bonus points
results.filter(isEmpty).onValue(showNoDataMessage);
```
