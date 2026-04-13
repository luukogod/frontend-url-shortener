import { createShortLink } from "@/lib/api";

describe("api", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("creates a short link from api response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "abc123",
        original_url: "https://example.com",
        short_url: "http://localhost:8080/shortlinks/abc123",
        created_at: new Date().toISOString(),
      }),
    });

    const data = await createShortLink({ original_url: "https://example.com" });

    expect(data.id).toBe("abc123");
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/shortlinks",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("throws user friendly error from api payload", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: "Invalid URL format",
      }),
    });

    await expect(
      createShortLink({ original_url: "invalid" })
    ).rejects.toThrow("Invalid URL format");
  });
});
