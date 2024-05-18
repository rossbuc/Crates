import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import DataDisplay from "../../src/renderer/src/components/DataDisplay";
import libData from "../../data.json";

// Mocking the Howl class
const playMock = vi.fn();
const pauseMock = vi.fn();

vi.mock("howler", () => ({
  Howl: vi.fn().mockImplementation(() => ({
    play: playMock,
    pause: pauseMock,
  })),
  Howler: {},
}));

const library = libData.slice(0, 5);

describe("DataDisplay", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    playMock.mockClear();
    pauseMock.mockClear();
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("should render a pause button and have an onClick method", () => {
    render(<DataDisplay library={library} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/pause/i);

    fireEvent.click(button);
    // Ensure that clicking the pause button when no song is playing logs the correct message
    expect(console.log).toHaveBeenCalledWith("there is no song playing");
  });

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

  it("should call pause on playingSong when pause button is clicked", () => {
    render(<DataDisplay library={library} />);

    // Simulate setting a playing song
    const setPlayingSong = screen.getAllByTestId("song")[0];
    fireEvent.click(setPlayingSong);

    const button = screen.getByText(/pause/i);
    fireEvent.click(button);

    // The pause method should be called on the playing song
    expect(pauseMock).toHaveBeenCalled();
  });
});
