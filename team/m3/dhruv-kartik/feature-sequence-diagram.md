# Dynamic Tips Feature Sequence Diagram

## Feature Description
The **Dynamic Tips Feature** displays a new language learning tip dynamically on the homepage.  
It fetches tips from a `tips.json` file and updates the tip displayed in response to user interaction.  
The user can click the "Next Tip" button to view another tip.

### **Key Interactions**
1. The system loads the tips from a JSON file during page initialization.
2. The first tip is displayed automatically.
3. When the user clicks the "Next Tip" button:
   - The current tip index is updated.
   - The displayed tip changes dynamically.

---

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant JSONFile as tips.json

    User->>Browser: Load homepage.html
    Browser->>JSONFile: Fetch tips.json
    JSONFile-->>Browser: Return array of tips
    Browser->>Browser: Display the first tip

    User->>Browser: Click "Next Tip" button
    Browser->>Browser: Increment currentTipIndex
    Browser->>Browser: Update the displayed tip

