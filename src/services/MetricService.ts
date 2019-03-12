import { Metric } from "../models/Metric";

export class MetricService {
  async getMetrics() {
    const metrics: Metric[] = await this.fetch();
    return metrics ? metrics : [];
  }

  fetch(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch("../data.json")
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => {
          console.error("Error retrieving data:", error);
          reject();
        });
    });
  }
}
