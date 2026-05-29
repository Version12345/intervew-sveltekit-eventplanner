# **SvelteKit Events App** 📅

This is an event planning app built using **SvelteKit**. The user can see their current events and is able to add new ones.

The app currently supports server-side rendering (SSR) to fetch events data via the **Events Interface** defined under $lib/server/remote-events.ts, and route-based navigation for different events (e.g., `/eventid`).

## **Getting Started**

### **Recommended Editor and Extensions**

We recommend using **Visual Studio Code (VS Code)** for this project, as it provides excellent support for SvelteKit development via extensions.

1. **Install Visual Studio Code**  
   If you don't have VS Code installed, you can download it here:  
   [https://code.visualstudio.com/](https://code.visualstudio.com/)

2. **Recommended Extensions for VS Code**  
   This project includes recommended extensions in its workspace settings.

   - When you open the project in VS Code, you will be prompted to **"Install All"** recommended extensions.  
     Click **"Install All"** to quickly set up your environment.

   - Alternatively, you can find the recommended extensions by searching **`@recommended`** in the **Extensions pane** in VS Code.

### Running the project

To run this project locally, follow these steps:

1. **Install dependencies**:

   ```bash
   npm ci
   ```

1. Start the development server:

   ```bash
   npm run dev -- --open
   ```

1. This will open the project in your browser
   - You will be redirected to / by default.
   - You can now add new events by clicking the add event button

Exercise Goals

This project has some intentional gaps for you to address. Your task is to complete the following improvements and enhancements:

**Do not use AI tools on this project. You are expected to know and understand all the details of your implementation**

1. Enhancement: Sluggish user experience

    - Problem: The app is slow to load and navigate between routes.
    - Task: Optimize the app page load performance by utilizing SvelteKit's response streaming feature. Do not modify the remote-events.ts file and continue to use it as is.
    - Task: Optimize form submission by showing a loading indicator while the form is being submitted. Use Sveltekit's built-in Progressive enhancement feature for form to do this.

1. Enhancement: No way to edit or delete existing events

    - Problem: There is no way to edit or delete existing events.
    - Task: Add a way to edit existing events. You can use the same form for adding and editing events.
    - Task: Add a way to delete existing events.

1. Bug: User is able to submit a new event in the past

    - Problem: The user is able to submit a new event with a start date in the past.
    - Task: Prevent the user from submitting a new event with a start date in the past and show appropriate feedback to the user.

1. Enhancement: Basic Styles

    - Problem: There are no styles
    - Task: Improve the design of the UI, you may use any UI libraries you prefer or no libraries at all

1. Freestyle (Optional)

    - Task: Add any other features or improvements you like to show off your knowledge.
