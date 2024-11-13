import { Events } from '../eventHub/Events.js';
import Service from './Service.js';

// Local service
export class UserMetricsRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = 'metricsDB';
    this.storeNames = ['userProfileMetrics', 'userBasicMetrics', 'userPasswordMetrics',
                       'userNativeLanMetrics', 'userTargetLanMetrics', 'userPointMetrics'];
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load profile on initialization
        this.loadProfileFromDB();
        //this.loadBasicFromDB(); // *To-Do: enable load user metrics here, if needed*
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
        this.createAllObjectStores(db);
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

  async createAllObjectStores(db) {
    for (const storeName of this.storeNames) {
      db.createObjectStore(storeName, {
        keyPath: storeName,
        autoIncrement: true,
      });
    }
  }

  // ------------------------------------------------ User Profile ------------------------------------------------
  async clearProfile() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeNames[0]], 'readwrite');
      const store = transaction.objectStore(this.storeNames[0]);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.ClearProfileSuccess);
        resolve('Profile cleared');
      };

      request.onerror = () => {
        this.publish(Events.ClearProfileFailure);
        reject('Error clearing profile');
      };
    });
  }

  async storeProfile(profile) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeNames[0]], 'readwrite');
      const store = transaction.objectStore(this.storeNames[0]);
      const request = store.add(profile);
      // profile should contain:
      //   0: profile image (file object)

      request.onsuccess = () => {
        this.publish(Events.StoreProfileSuccess, profile);
        resolve('Profile stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreProfileFailure, profile);
        reject('Error storing profile');
      };
    });
  }

  async loadProfileFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeNames[0]], 'readonly');
      const store = transaction.objectStore(this.storeNames[0]);
      const request = store.getAll();

      request.onsuccess = event => {
        if (event.target.result && event.target.result['0']) {
          const profile = event.target.result['0'].file;
          this.readURL(profile);
          this.publish(Events.LoadProfileSuccess, profile)
          resolve(event.target.result['0'].file);
        }
      };

      request.onerror = () => {
        this.publish(Events.LoadProfileFailure);
        reject('Error retrieving profile');
      };
    });
  }
  
  readURL(file) {
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-picture').src = e.target.result
        }
        reader.readAsDataURL(file)
    }
  }

  // ------------------------------------------------ User Basic ------------------------------------------------
  // currently basic metrics are not stored in the database, since they are initialized before we load them from this db
  // to enable this store function, complete pair it with loadBasicMetricsFromDB().
  async storeBasicMetrics(basicMetrics) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeNames[1]], 'readwrite');
      const store = transaction.objectStore(this.storeNames[1]);
      const request = store.add(basicMetrics);
      // add one of the followings for each call of storeBasicMetrics()
      //   0: user id
      //   1: username
      //   2: email address

      request.onsuccess = () => {
        this.publish(Events.StoreBasicMetricsSuccess, basicMetrics);
        resolve('Basic metrics stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreBasicMetricsFailure, basicMetrics);
        reject('Error storing basic metrics');
      };
    });
  }

  // *To-Do: enable load basic metrics here, if needed*
  /*
  async loadBasicMetricsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeNames[1]], 'readonly');
      const store = transaction.objectStore(this.storeNames[1]);
      const request = store.getAll();

      request.onsuccess = event => {
        console.log('result:', event.target.result)
        if (event.target.result && event.target.result['0'] && event.target.result['1'] && event.target.result['2']) {
          const profile = event.target.result['0'].file; // change this to user id, then duplicate twice for username and email address
          this.publish(Events.LoadBasicMetricsSuccess, profile)
          resolve(event.target.result['0'].file);
        }
      };

      request.onerror = () => {
        this.publish(Events.LoadBasicMetricsFailure);
        reject('Error retrieving basic metrics');
      };
    });
  }
  */



  // ------------------------------------------------ User Point ------------------------------------------------
  // currently point metrics are not stored in the database, since they are initialized before we load them from this db
  // to enable this store function, complete pair it with loadPointMetricsFromDB().
  async storePointMetrics(pointMetrics) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeNames[5]], 'readwrite');
      const store = transaction.objectStore(this.storeNames[5]);
      const request = store.add(pointMetrics);
      // add one of the followings for each call of storePointMetrics()
      //   0: level
      //   1: points earned from learn page
      //   2: points earned from exercise page

      request.onsuccess = () => {
        this.publish(Events.StorePointMetricsSuccess, pointMetrics);
        resolve('Point metrics stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StorePointMetricsFailure, pointMetrics);
        reject('Error storing point metrics');
      };
    });
  }

  // *To-Do: enable load point metrics here, if needed*
  /*
  async loadPointMetricsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeNames[5]], 'readonly');
      const store = transaction.objectStore(this.storeNames[5]);
      const request = store.getAll();

      request.onsuccess = event => {
        console.log('result:', event.target.result)
        if (event.target.result && event.target.result['0'] && event.target.result['1'] && event.target.result['2']) {
          const profile = event.target.result['0'].file; // change this to level, then duplicate twice for two points
          this.publish(Events.LoadPointMetricsSuccess, profile)
          resolve(event.target.result['0'].file);
        }
      };

      request.onerror = () => {
        this.publish(Events.LoadPointMetricsFailure);
        reject('Error retrieving point metrics');
      };
    });
  }
  */

  // ------------------------------------------------ Add Subscriptions ------------------------------------------------
  addSubscriptions() {
    // profile
    this.subscribe(Events.ClearProfile, data => {
      this.clearProfile();
    });
    this.subscribe(Events.StoreProfile, data => {
      this.storeProfile(data);
    });
    this.subscribe(Events.LoadProfile, data => {
      this.loadProfileFromDB();
    });

    // basic metrics
    this.subscribe(Events.StoreBasicMetrics, data => {
      this.storeBasicMetrics(data);
    });
    // *To-Do: enable load basic metrics here, if needed*
    /*
    this.subscribe(Events.LoadBasicMetrics, data => {
      this.loadBasicMetricsFromDB();
    });
    */

    // point metrics
    this.subscribe(Events.StorePointMetrics, data => {
      this.storePointMetrics(data);
    });
    // *To-Do: enable load point metrics here, if needed*
    /*
    this.subscribe(Events.LoadPointMetrics, data => {
      this.loadPointMetricsFromDB();
    });
    */
  }
}
