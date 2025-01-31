import { Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

function General() {
  const messages = ["Send read receipts"];
  const allowedMessages = [
    "Anyone",
    "Friends",
    "Friends of friends",
    "Trade requests"
  ];
  const notifications = [
    "All",
    "Messages",
    "Comments on my posts",
    "Replies to my Comment",
    "Trade request",
    "New events"
  ];

  // State to keep track of settings with "Off" as default
  const [settings, setSettings] = useState({
    messages: {},
    allowedMessages: {},
    notifications: {}
  });

  // Load settings from localStorage or set default as "Off"
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("generalSettings"));
    if (savedSettings) {
      setSettings(savedSettings);
    } else {
      // Initialize with "Off" as the default
      const defaultSettings = {
        messages: Object.fromEntries(messages.map((setting) => [setting, "Off"])),
        allowedMessages: Object.fromEntries(
          allowedMessages.map((setting) => [setting, "Off"])
        ),
        notifications: Object.fromEntries(
          notifications.map((setting) => [setting, "Off"])
        )
      };
      setSettings(defaultSettings);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("generalSettings", JSON.stringify(settings));
  }, [settings]);

  // Handle change in settings
  const handleChange = (category, setting, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [setting]: value
      }
    }));
  };

  const renderOptions = (category, options) => {
    return options.map((setting) => (
      <Row className="my-1" key={setting}>
        <Col lg={9}>{setting}</Col>
        <Col lg={1}>
          <Form.Check
            name={setting}
            id={`${setting}_on`}
            type="radio"
            label="On"
            checked={settings[category][setting] === "On"}
            onChange={() => handleChange(category, setting, "On")}
          />
        </Col>
        <Col lg={1}>
          <Form.Check
            name={setting}
            id={`${setting}_off`}
            type="radio"
            label="Off"
            checked={settings[category][setting] === "Off"}
            onChange={() => handleChange(category, setting, "Off")}
          />
        </Col>
      </Row>
    ));
  };

  return (
    <Container className="content-border-l round-s my-3 g-0">
      <section className="border-bottom mx-0">
        <Row className="m-3">
          <Col lg={12} className="fs-20 fw-500">General</Col>
        </Row>
      </section>
      <section className="border-bottom mx-0">
        <Row className="m-3">
          <Col lg={12}>
            <p className="fw-600 fs-16 my-0">Messages</p>
            {renderOptions("messages", messages)}
          </Col>

          <Col lg={12}>
            <p className="fw-600 fs-16 my-0">Who's allowed to message you?</p>
            {renderOptions("allowedMessages", allowedMessages)}
          </Col>
        </Row>
      </section>
      <section className="border-bottom mx-0">
        <Row className="m-3">
          <Col lg={12}>
            <p className="fw-600 fs-16 my-0">Notifications</p>
            {renderOptions("notifications", notifications)}
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default General;
