# base-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# membership-form

## Tracking

```
{
    event: "trigger-membership",
    data: {
        event: "trigger-membership-" + action, 
        target: "MembershipForm",
        action: action, //next, prev, contact-us, donate, newsletter 
        label: label,  //StepOne, StepTwo, StepDonate, StepThanks
        // ab hier nur bei action donation angegeben
        value: value, //amount yearly
        iteration: monthly, yearly
        iteration_end: 0, 1, 2 ... // in Jahren. Bei 0 wurde keine Laufzeit angegeben.
    }
}
```
