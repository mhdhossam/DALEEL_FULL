import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges conflicting Tailwind classes in favor of the last class", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("combines ordinary classes and ignores false values", () => {
    expect(cn("flex", false, "gap-2")).toBe("flex gap-2");
  });
});
