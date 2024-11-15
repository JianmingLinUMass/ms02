Chosen Feature: Profile Changer, in Progress-Tracking page.

Description: a functionality that allows the user to upload and change their profile picture; the last uploaded file will be stored in IndexedDB.

Sequence Diagram:

```mermaid
  flowchart LR;
      ProgressTrackingPage -- click_choose_file_button --> FileSelection;
      FileSelection -- upload_an_image_file --> ProgressTrackingPage;
      ProgressTrackingPage -- click_edit_profile_button --> ProgressTrackingPageWithNewProfile;

      ProgressTrackingPageWithNewProfile -- refresh_current_page --> ProgressTrackingPageWithNewProfile;

      ProgressTrackingPageWithNewProfile -- enter_developer_tool --> ProgressTrackingPageWithNewProfileWithDevToolsOpen;

      ProgressTrackingPageWithNewProfileWithDevToolsOpen -- enter_application_tab --> DevToolApplication;

      DevToolApplication -- click_indexedDB --> DevToolIndexedDB;
      DevToolIndexedDB -- click_metricsDB --> DevToolMetricsDB;
      DevToolMetricsDB -- click_delete_database_then_refresh_page --> ProgressTrackingPage

```
