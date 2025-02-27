## Technologies Used

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Express.js
- **Networking**: Axios

## Features

- **State Management**: Maintained using reducers and contexts for robust and scalable state management.
- **Story View**: Utilized React portals for rendering the story view.
- **Progress Indicator**: Displayed time progress above the story to indicate the remaining time for the next story.
- **Responsive Design**:
  - Desktop: Navigation buttons for next and previous stories.
  - Mobile: Tap left or right sides of the screen to navigate.
- **Playback Control**: Introduced pause and play buttons for better user control.
- **Type Safety**: All types and enums are maintained in the app for enhanced type safety.
- **Constants Management**: Used `constants.ts` for storing application-wide constants.
- **Backend**: Simple Express server serving an array of story data.
- **Networking**: Configured Axios with a base URL for consistent and efficient API requests.

## Assumptions

- Sizes, margins, and paddings are assumed and applied throughout the app.
