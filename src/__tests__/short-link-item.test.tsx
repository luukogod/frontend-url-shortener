import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShortLinkItem } from "@/components/ShortLinkItem/ShortLinkItem";

describe("ShortLinkItem", () => {
  it("copies short url to clipboard", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    render(
      <ShortLinkItem
        link={{
          id: "abc123",
          original_url: "https://example.com",
          short_url: "http://localhost:8080/shortlinks/abc123",
          created_at: new Date().toISOString(),
        }}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledWith(
      "http://localhost:8080/shortlinks/abc123"
    );
  });

  it("renders a QR code for the short URL", () => {
    const shortUrl = "http://localhost:8080/shortlinks/abc123";

    render(
      <ShortLinkItem
        link={{
          id: "abc123",
          original_url: "https://example.com",
          short_url: shortUrl,
          created_at: new Date().toISOString(),
        }}
      />
    );

    expect(
      screen.getByTitle(`QR code for ${shortUrl}`)
    ).toBeInTheDocument();
  });
});
