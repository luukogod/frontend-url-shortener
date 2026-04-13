import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

jest.mock("@/components/Layout/HomePage", () => ({
  HomePage: () => <div data-testid="home-page">Home</div>,
}));

describe("App Router home page", () => {
  it("renders shell heading and home section", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { level: 1, name: "URL Shortener" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });
});
