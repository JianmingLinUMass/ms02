import { Events } from '../eventHub/Events.js';
import Service from './Service.js';

// Local service
export class UserMetricsRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = 'metricsDB';
    this.storeName = 'metrics';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load metrics on initialization
        this.loadMetricsFromDB();
      })
      .catch(error => {
        console.error(error);
      });
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      };

      request.onsuccess = event => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = event => {
        reject('Error initializing IndexedDB');
      };
    });
  }

  async storeMetrics(metrics) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(metrics);

      request.onsuccess = () => {
        this.publish(Events.StoreMetricsSuccess, metrics);
        resolve('Metrics stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreMetricsFailure, metrics);
        reject('Error storing metrics: ');
      };
    });
  }

  async loadMetricsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const metrics = event.target.result;
        metrics.forEach(metric => this.publish('NewMetric', metric));
        resolve(metrics);
      };

      request.onerror = () => {
        this.publish(Events.LoadMetricsFailure);
        reject('Error retrieving metrics');
      };
    });
  }

  async clearMetrics() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.DeleteMetricsSuccess);
        resolve('All metrics cleared');
      };

      request.onerror = () => {
        this.publish(Events.DeleteMetricsFailure);
        reject('Error clearing metrics');
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreMetrics, data => {
      this.storeMetrics(data);
    });

    this.subscribe(Events.DeleteMetrics, () => {
      this.clearMetrics();
    });
  }
}
