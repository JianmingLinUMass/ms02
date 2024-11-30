import { AppControlComponent } from '/ProgressTracking/components/AppControlComponent/AppControlComponent.js' 
import { UserMetricsRepositoryFactory } from '/ProgressTracking/services/UserMetricsRepositoryFactory.js';

const appController = new AppControlComponent();
const appContainer = document.getElementById('app');
appContainer.appendChild(appController.render());

const metricsRepository = UserMetricsRepositoryFactory.get('local');