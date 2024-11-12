import { UserMetricsRepositoryService } from "./UserMetricsRepositoryService.js";
import { UserMetricsRepositoryRemoteService } from "./UserMetricsRepositoryRemoteService.js";

/**
 * Factory class to create instances of metrics repository services.
 * 
 * This class provides a static method to get an appropriate instance
 * of a data repository service based on the specified repository type.
 * It cannot be instantiated.
 */
export class UserMetricsRepositoryFactory {
  constructor() {
    throw new Error('Cannot instantiate a UserMetricsRepositoryFactory object');
  }

  /**
   * Returns an instance of a metrics repository service based on the given
   * repository type.
   *
   * @param {string} [repoType='local'] - The type of repository service to
   * create. Can be 'local' or 'remote'.
   * @returns {UserMetricsRepositoryService|UserMetricsRepositoryRemoteService} An instance
   * of the appropriate metrics repository service.
   * @throws Will throw an error if the repository type is not recognized.
   */
  static get(repoType = 'local') {
    if (repoType === 'local') {
      return new UserMetricsRepositoryService();
    }
    else if (repoType === 'remote') {
      return new UserMetricsRepositoryRemoteService();
    }
    else {
      throw new Error('Invalid repository type');
    }
  }
}
