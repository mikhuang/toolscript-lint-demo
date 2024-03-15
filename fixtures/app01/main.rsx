<App>
  <Include src="./functions.rsx" />
  <Frame
    id="$main"
    enableFullBleed={false}
    isHiddenOnDesktop={false}
    isHiddenOnMobile={false}
    padding="8px 12px"
    sticky={null}
    type="main"
  >
    <Container
      id="disableQuery"
      footerPadding="4px 12px"
      headerPadding="4px 12px"
      margin="0px"
      padding="0px"
      showBody={true}
      showBorder={false}
      style={{ ordered: [{ background: "rgba(255, 255, 255, 0)" }] }}
    >
      <View id="22a48" viewKey="View 1">
        <TextInput
          id="textInput1"
          labelPosition="top"
          placeholder="Enter value"
        />
        <KeyValue
          id="outputNoDisable"
          data="{{queryNoDisable.data}}"
          editIcon="bold/interface-edit-pencil"
          groupLayout="singleColumn"
          heightType="fixed"
          itemLabelPosition="top"
          labelWrap={true}
        />
        <KeyValue
          id="outputDisable"
          data="{{queryDisable.data}}"
          editIcon="bold/interface-edit-pencil"
          groupLayout="singleColumn"
          heightType="fixed"
          itemLabelPosition="top"
          labelWrap={true}
        />
      </View>
    </Container>
    <Container
      id="hexStyle"
      footerPadding="4px 12px"
      headerPadding="4px 12px"
      margin="0px"
      padding="0px"
      showBody={true}
      showBorder={false}
      style={{ ordered: [{ background: "rgba(255, 255, 255, 0)" }] }}
    >
      <View id="22a48" viewKey="View 1">
        <Button
          id="successButton"
          style={{ ordered: [{ background: "success" }] }}
          styleVariant="solid"
          text="Button"
        />
        <Button
          id="customHexButton"
          style={{ ordered: [{ background: "rgb(18, 52, 86)" }] }}
          styleVariant="solid"
          text="Button"
        />
      </View>
    </Container>
    <Container
      id="money"
      footerPadding="4px 12px"
      headerPadding="4px 12px"
      margin="0px"
      padding="0px"
      showBody={true}
      showBorder={false}
      style={{ ordered: [{ background: "rgba(255, 255, 255, 0)" }] }}
    >
      <View id="5ab2c" viewKey="View 1">
        <NumberInput
          id="currency1"
          currency="USD"
          format="currency"
          inputValue={0}
          labelPosition="top"
          placeholder="Enter value"
          showSeparators={true}
          showStepper={true}
          value="0999990"
        />
        <HTML
          id="html1"
          css={include("./lib/html1.css", "string")}
          html={include("./lib/html1.html", "string")}
        />
        <Text
          id="usd"
          value={
            '{{currency1.value.toLocaleString("en-US", { style: "currency", currency: "USD" })}}'
          }
          verticalAlign="center"
        />
        <Text
          id="cny"
          value={
            '{{currency1.value.toLocaleString("en-US", { style: "currency", currency: "CNY" })}}'
          }
          verticalAlign="center"
        />
      </View>
    </Container>
    <Container
      id="momentInvalid"
      footerPadding="4px 12px"
      headerPadding="4px 12px"
      margin="0px"
      padding="0px"
      showBody={true}
      showBorder={false}
      style={{ ordered: [{ background: "rgba(255, 255, 255, 0)" }] }}
    >
      <View id="22a48" viewKey="View 1">
        <DateTime
          id="dateTime1"
          dateFormat="MMM d, yyyy"
          datePlaceholder="{{ self.dateFormat.toUpperCase() }}"
          iconBefore="bold/interface-calendar"
          labelPosition="top"
          minuteStep={15}
        />
        <Button id="button1" styleVariant="solid" text="Button">
          <Event
            event="click"
            method="run"
            params={{
              ordered: [
                {
                  src: "utils.showNotification({description:\nmoment(dateToUndefined.value).tz('America/New_York').format('LLLL')})",
                },
              ],
            }}
            pluginId=""
            type="script"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Text
          id="momentNoInvalid"
          value="{{moment(dateToUndefined.value).tz('America/New_York').format('LLLL')}}"
          verticalAlign="center"
        />
        <Text
          id="momentCatchInvalid"
          value="{{moment(dateToUndefined.value ?? 'Invalid').tz('America/New_York').format('LLLL')}}"
          verticalAlign="center"
        />
      </View>
    </Container>
  </Frame>
</App>
