Demo rules included:

- NoCustomHexRule: check that there's no custom hex color directly applied to a style
- UndefinedMomentRule: moment should check for ?? and timezone should be America/Los_Angeles
- AutoQueryDisableRule: A check on resource queries that run automatically when inputs change, they should alway have something in Disable query
- CurrencyRule: currency should always be .toLocaleString("en-US", { style: "currency", currency: "USD" })
