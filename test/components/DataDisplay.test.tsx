import { it, expect, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import DataDisplay from "../../src/renderer/src/components/DataDisplay";
import libData from "../../data.json";

console.log(typeof libData);

const library = libData.slice(0, 5);

console.log(library);

describe("DataDisplay", () => {
  it("should render a pause button and have an onClick method", () => {
    render(<DataDisplay library={library} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/pause/i);
  });

  // Potentially room to make this test more maintainable as at the moment it tests specifically for "loading" but you might change this in future
  it('should render "loading" when library is undefined', () => {
    render(<DataDisplay library={undefined} />);
    const loadingMessage = screen.getByText(/loading/i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it("should render song nodes when library has songs", () => {
    render(<DataDisplay library={library} />);
    const songNodes = screen.getAllByTestId("song");
    expect(songNodes).toHaveLength(library.length);
  });
});
