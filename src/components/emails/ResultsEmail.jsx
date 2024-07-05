import * as React from "react";
import { Html, Button } from "@react-email/components";

export function ResultsEmail(props) {
  const { test } = props;

  return (
    <Html lang="en">
      <Button>Click me</Button>
    </Html>
  );
}

export default ResultsEmail;
