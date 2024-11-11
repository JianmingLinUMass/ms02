import Service from "./Service.js";
import { fetch } from "../utility/fetch.js"; // 'fetch()' is used by fake service only
import { Events } from '../eventHub/Events.js';

// Remote fake service
export class UserMetricsRepositoryRemoteService extends Service {
  constructor() {
    super();
  }

  // "POST" for store data on the server
  async storeMetrics(metrics) {
    const response = await fetch("http://localhost:3000/metrics", {
      method: "POST",
      body: JSON.stringify(metrics),
    });
    const data = await response.json();
  }

  // "DELETE" for deleting some data from the server
  async clearMetrics() {
    const response = await fetch("http://localhost:3000/metrics", {
      method: "DELETE",
    });
    const data = await response.json();
  }

  // Need to have this method implemented since we are extending this class with the 'Service' class
  addSubscriptions() {
    this.subscribe(Events.StoreMetrics, (data) => {
      this.storeMetrics(data);
    });

    this.subscribe(Events.DeleteMetrics, () => {
      this.clearMetrics();
    });
  }
}
