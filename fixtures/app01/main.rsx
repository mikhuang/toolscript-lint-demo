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
    <Button id="button1" text="Download">
      <Event
        event="click"
        method="run"
        params={{
          ordered: [{ src: "utils.downloadFile(query1.data, 'logo.png')" }],
        }}
        type="script"
      />
    </Button>
  </Frame>
</App>
