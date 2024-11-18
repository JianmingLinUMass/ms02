import { AppControlComponent } from '../../front-end/ProgressTracking/components/AppControlComponent/AppControlComponent.js' 
import { UserMetricsRepositoryFactory } from '../../front-end/ProgressTracking/services/UserMetricsRepositoryFactory.js';

const appController = new AppControlComponent();
appController.render();

// Initialize IndexedDB database
export function initDatabase() {
    const metricsRepository = UserMetricsRepositoryFactory.get('local');
    console.log('In initializing indexed db.')
} 
