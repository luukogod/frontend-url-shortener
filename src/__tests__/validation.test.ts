import { isValidUrl } from "@/utils/validation";

describe("isValidUrl", () => {
  it("returns true for valid http or https urls", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://example.com/path")).toBe(true);
  });

  it("returns false for invalid urls", () => {
    expect(isValidUrl("")).toBe(false);
    expect(isValidUrl("ftp://example.com")).toBe(false);
    expect(isValidUrl("example.com")).toBe(false);
  });
});
