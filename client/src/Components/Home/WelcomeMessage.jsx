import React from "react";
import { Segment, Header } from "semantic-ui-react";

export default function WelcomeMessage() {
  return (
    <Segment vertical>
      <Header as="h1">Welcome to Milk & PEPPERS!</Header>
      <p>
        ✨ Handmade designs, upcycled pieces, and quality thrifts. Something for every mood & occasion. 🌈 Located in ATX. 📍
      </p>
    </Segment>
  );
}
