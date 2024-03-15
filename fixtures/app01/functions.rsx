<GlobalFunctions>
  <RESTQuery
    id="queryNoDisable"
    query="https://pokeapi.co/api/v2/pokemon/{{textInput1.value}}"
    resourceName="REST-WithoutResource"
    resourceTypeOverride=""
    showSuccessToaster={false}
  />
  <RESTQuery
    id="queryDisable"
    query="https://pokeapi.co/api/v2/pokemon/{{textInput1.value}}"
    queryDisabled="{{!textInput1.value}}"
    resourceName="REST-WithoutResource"
    resourceTypeOverride=""
    showSuccessToaster={false}
  />
  <Function
    id="dateToUndefined"
    funcBody={include("./lib/dateToUndefined.js", "string")}
  />
  <JavascriptQuery
    id="momentBadUse"
    notificationDuration={4.5}
    query={include("./lib/momentBadUse.js", "string")}
    resourceName="JavascriptQuery"
    showSuccessToaster={false}
  />
  <JavascriptQuery
    id="momentOkUse"
    notificationDuration={4.5}
    query={include("./lib/momentOkUse.js", "string")}
    resourceName="JavascriptQuery"
    showSuccessToaster={false}
  />
</GlobalFunctions>
