# membership-form
Webform for concluding a supporting membership.

## Supported Payments

Sepa, CreditCard, Paypal

## Tracking

### Payload
```
{
    "event": "trigger-membership-form",
    "category": "MembershipForm",
    "action": action,
    "name": name,
    "value": value
}
```

### Actions:

| action | description |
| --- | --- |
| next | move to next Step |
| prev | move to prev Step |
| subscribe | subscribe an supporting membership |
| newsletter | subscribe newsletter |
| contact_us | contact us with feedback |

### Names Action Value

| name | action | value |
| --- | --- | --- |
| StepOne-Next | next | 0 |
| StepTwo-Next | prev | 0 |
| StepTwo-Prev | prev | 0 |
| StepThree-Prev | prev | 0 |
| StepThree-Subscription-Montly | subscribe | amount_year |
| StepThree-Subscription-Yearly | subscribe | amount_year |
| StepFour-Newsletter | newsletter | 0 |
| StepFour-Contact-Us | contact-us | 0 |
