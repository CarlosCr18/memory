import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import StartScreen from "./Start";
import { BrowserRouter } from "react-router-dom";

test("renders the Start component", () => {
    render(
        <BrowserRouter>
            <StartScreen />
        </BrowserRouter>
    );
    const logo = screen.getByRole("img");
    const button = screen.getByRole("button", {
        name: /Start game/i,
    });
    expect(logo).toBeDefined();
    expect(button).toBeDefined();
});
