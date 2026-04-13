import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePage } from "@/components/Layout/HomePage";

jest.mock("@/lib/api", () => ({
  getAllShortLinks: jest.fn().mockResolvedValue([]),
  createShortLink: jest.fn(),
}));

describe("HomePage", () => {
  it("shows validation message for invalid url", async () => {
    render(<HomePage />);

    await userEvent.type(screen.getByLabelText("Enter URL"), "invalid");
    await userEvent.click(screen.getByRole("button", { name: "Shorten URL" }));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid URL including http:// or https://")
      ).toBeInTheDocument();
    });
  });
});
