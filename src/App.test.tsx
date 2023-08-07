import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("User clicks on start game button", () => {
    render(<App />);
    fireEvent.click(
        screen.getByRole("button", {
            name: /Start game/i,
        })
    );
    const section = screen.getByTestId("GameSection");
    expect(section).toBeDefined();
    const button = screen.queryByRole("button", {
        name: /Start game/i,
    });
    expect(button).toBeNull();
});
