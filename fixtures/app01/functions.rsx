<GlobalFunctions>
  <SqlQueryUnified
    id="query2"
    query={include("./lib/query2.sql", "string")}
    resourceDisplayName="retool_db"
    resourceName="d0056766-bca1-4ccf-867c-0e3dc3b5b41c"
    resourceTypeOverride=""
    warningCodes={[]}
  />
  <GCSQuery
    id="query3"
    notificationDuration={4.5}
    resourceDisplayName="[dev] Google Cloud Storage"
    resourceName="c80285d0-459e-47f7-9a03-7523b88ad735"
    showSuccessToaster={false}
  />
  <JavascriptQuery
    id="orderQuery"
    query={include("./lib/orderQuery.js", "string")}
  />
  <State id="cart" value="[]" />
  <JavascriptQuery
    id="query4"
    notificationDuration={4.5}
    resourceName="JavascriptQuery"
    showSuccessToaster={false}
  />
  <RESTQuery
    id="query1"
    query="https://logo.clearbit.com/google.com?size=400"
    resourceName="REST-WithoutResource"
    resourceTypeOverride=""
  />
</GlobalFunctions>
