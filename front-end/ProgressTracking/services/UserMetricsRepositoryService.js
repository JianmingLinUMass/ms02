import { Events } from '../eventHub/Events.js';
import Service from './Service.js';

// Local service
export class UserMetricsRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = 'DB';
    this.storeName = 'tasks';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load profile on initialization
        this.loadProfileFromDB();
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

// ------------------------------------------------ Profile ------------------------------------------------
  async storeProfile(profile) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(profile);

      request.onsuccess = () => {
        this.publish(Events.StoreProfileSuccess, profile);
        resolve('Profile stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreProfileFailure, profile);
        reject('Error storing profile: ');
      };
    });
  }
  async loadProfileFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const profile = event.target.result;
        this.publish('NewProfile', profile)
        resolve(profile);
      };

      request.onerror = () => {
        this.publish(Events.LoadProfileFailure);
        reject('Error retrieving profile');
      };
    });
  }
// ------------------------------------------------ User id ------------------------------------------------
  addSubscriptions() {
    this.subscribe(Events.StoreProfile, data => {
      this.storeProfile(data);
    });
  }
}
