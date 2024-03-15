Demo rules included:

- NoCustomHexRule: check that there's no custom hex color directly applied to a style


remind folks to hide the success toast on successful query. We're absolutely willing to write the lint tool ourselves as well, but I would find it very helpful to get a formal grammar (for example, in eBNF form) for RSX rather than reverse-engineer the grammar myself."

{{ moment(item).tz('America/Los_Angeles').format() }}
MM/dd/yy

      hh:mm a 'PT'

A check on resource queries that run automatically when inputs change, they should alway have something in Disable query

Currency should always be .toLocaleString("en-US", { style: "currency", currency: "USD" })

This one would be more difficult but if a value is nullable, do not just do moment(self), instead use moment(self ?? 'invalid'). Might just need to do it everywhere

Some background on the above - moment(undefined) resolves to the current date, while moment('invalid') will correctly end up displaying something like - or Invalid date.


These size are some of One's most persistent items that they are looking to have a linter catch.

