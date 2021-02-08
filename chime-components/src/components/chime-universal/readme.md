# chime-universal



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type     | Default     |
| -------------- | --------------- | ----------- | -------- | ----------- |
| `companyImage` | `company-image` |             | `string` | `null`      |
| `question`     | `question`      |             | `string` | `undefined` |
| `questioner`   | `questioner`    |             | `string` | `null`      |


## Events

| Event             | Description | Type                  |
| ----------------- | ----------- | --------------------- |
| `dismissQuestion` |             | `CustomEvent<String>` |
| `submitQuestion`  |             | `CustomEvent<any>`    |


## Dependencies

### Depends on

- [chime-submit-button](../chime-submit-button)

### Graph
```mermaid
graph TD;
  chime-universal --> chime-submit-button
  style chime-universal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
