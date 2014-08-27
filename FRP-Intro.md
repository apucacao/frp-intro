# functional reactive programming with bacon.js

a different way to work with asynchronicity

![](wires.jpg)

---

# why?

we like functional style (pure functions, immutability)

we care about good UX

managing state is hard

---

# what does it give us?

familiar concepts to the UI (`map`, `filter`, "`flatMap`")

higher abstractions for managing async events

clear data flow transformations using pure functions

reduce explicit state manipulation

---

# the elephant

"just look at the types"

it's just a new tool we can use now, or in the future with TypeScript or PureScript

not a hammer: we don't need to rewrite everything

---

# event stream

an "immutable" stream of chronological events

```javascript
var changes = $('form').asEventStream('change');
```

can write our own (`Bacon.fromBinder`)

---

# property

similar to an event stream but with a _current value_
(maybe with an initial value)

```javascript
var params = changes.map(toRequestParams)
                    .toProperty(initialParams);
```

---

# example 1: counting clicks

```javascript
// capture clicks
var clicks = $('button').asEventStream('click');

// create a new stream where each click is a 1
var values = clicks.map(1);

// produce a property for the number of clicks
var counter = values.scan(0, plus);
```

---

# example 2: capturing triple clicks

```javascript
var clicks = $('button').asEventStream('click');

clicks
  .bufferWithTime(300)
  .map('.length')
  .filter(function(size) {
    return size >= 3;
  });

```

---

# example 3: asynchronous operations

```javascript
// define our data flow
var changes = $('form').asEventStream('change');
var request = changes.map(serializeToObject);

// create a new event stream for each form change and flatten into one
var response = request.flatMapLatest(compose(Bacon.fromPromise, send));

// create boolean property that represents _waiting_
var waiting = request.awaiting(response);

// update DOM when state changes
waiting.onValue(toggleSpinner);
response.onValue(renderResults);
response.onError(renderErrors);
response.filter(isEmpty).onValue(renderEmptyMessage);
```

---

# questions?

more examples?

followup?