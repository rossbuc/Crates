import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import DataDisplay from "../../src/renderer/src/components/DataDisplay";
import libData from "../../data.json";

console.log(typeof libData);

const library = libData.slice(0, 5);

console.log(library);

describe("DataDisplay", () => {
  it("should render song data list of first 5 entries of the lib", () => {
    render(<DataDisplay library={library} />);
    screen.debug();
  });
});
