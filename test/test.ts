import { fixture } from "@open-wc/testing-helpers";
import { expect } from "chai";
import { MetricChart } from "../src/components/MetricChart";

describe("Metric Chart", () => {
  it("can instantiate the element", async () => {
    const el = await fixture("<metric-chart></metric-chart>");
    expect(el.getAttribute("foo")).to.equal("bar");
  });
});
