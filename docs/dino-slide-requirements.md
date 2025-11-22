I want to create a tile sliding puzzle for my 7 year old daughter. The app will slice the selected image into smaller squares, randomly sort them on a canvas, and allow the user to swap two squares by clicking them. Additionally, the player can choose to limit the game either by time or by the number of swaps before starting. Below is the set of requirements

---

### **Requirements for Margo’s Dino Sliding Puzzle (MVP)**

#### **1. General Overview**
- **App Name:** Margo’s Dino Puzzle
- **Platform:** Progressive Web App (PWA) compatible with iPad
- **Target Audience:** 7-year-old child (Margo)
- **Core Functionality:** A sliding puzzle game where the user selects an image, chooses a difficulty level, sets a game limit (time or number of swaps), and solves the puzzle by swapping squares to reconstruct the image.
- **Offline Capability:** The app must work offline after being added to the iPad Home Screen.
- **Development Platform:** Lovable.dev

#### **2. Functional Requirements**

##### **2.1. App Setup and PWA Features**
- The app must be a PWA that can be added to the iPad Home Screen.
- It must include a manifest file (`manifest.json`) to enable PWA features, such as:
  - App icon for the Home Screen (dinosaur-themed icon, 192x192 PNG, as previously generated).
  - App name displayed as “Margo’s Dino Puzzle.”
  - Full-screen display mode (no browser UI).
- The app must use a service worker to cache all assets (HTML, CSS, JavaScript, images, audio files) for offline functionality.
- On first load, the app should prompt the user to add it to the Home Screen with a simple message: “Add Margo’s Dino Puzzle to your Home Screen to play anytime!”

##### **2.2. Image Selection**
- The app must allow the user to select one of the four provided dinosaur images to solve as a puzzle.
- Display the images as thumbnails on the main screen with a simple label below each (e.g., “Volcano Dino,” “Forest Family,” “Jungle Friends,” “Dino Battle”).
- Each thumbnail should be clickable/tappable, leading to the difficulty selection screen.

##### **2.3. Difficulty Levels**
- The app must offer three difficulty levels for each image:
  - **Easy:** 9 pieces (3x3 grid)
  - **Medium:** 16 pieces (4x4 grid)
  - **Hard:** 32 pieces (8x8 grid)
- On the difficulty selection screen, display three buttons labeled “Easy,” “Medium,” and “Hard,” each with a small icon (e.g., a star: 1 star for Easy, 2 stars for Medium, 3 stars for Hard).
- After selecting a difficulty, the app transitions to the game limit selection screen (new).

##### **2.4. Game Limit Selection (New)**
- Before starting the puzzle, the user must choose how to limit the game:
  - **Option 1: Time Limit**
    - The user can select a time limit from predefined options: 2 minutes, 5 minutes, or 10 minutes.
    - Display three buttons: “2 Minutes,” “5 Minutes,” “10 Minutes.”
  - **Option 2: Swap Limit**
    - The user can select a maximum number of swaps: 20 swaps, 50 swaps, or 100 swaps.
    - Display three buttons: “20 Swaps,” “50 Swaps,” “100 Swaps.”
- The user must select one limit type (time or swaps) and one value (e.g., 5 minutes or 50 swaps).
- Display a toggle or radio buttons to switch between “Time Limit” and “Swap Limit,” with the corresponding options shown below.
- Include a “Start Game” button to proceed to the puzzle screen after selecting the limit.

##### **2.5. Puzzle Board and Gameplay**
- **Board Layout:**
  - The puzzle board should be a square area in the center of the screen, displaying the image sliced into smaller squares based on the selected difficulty (e.g., 3x3, 4x4, 8x8).
  - The squares should be randomly sorted on the canvas at the start of the game, ensuring the puzzle is solvable (i.e., the initial scramble should not result in an unsolvable state).
  - Each square should have a thin border (e.g., in Jungle Green, #2E8B57) to visually separate the pieces.
- **Swapping Squares:**
  - The user can click/tap on two squares to swap their positions.
  - After the first square is clicked, it should be highlighted (e.g., with a thicker gold border, #FFD700) to indicate it’s selected.
  - When the second square is clicked, the two squares should swap positions with a smooth animation (e.g., a 0.5-second slide transition).
  - Play a “swap” sound (e.g., a soft “click” or “whoosh”) each time a swap occurs.
- **Game Limit Tracking:**
  - **Time Limit Mode:**
    - Display a countdown timer at the top of the screen (e.g., “Time Left: 4:32”).
    - If the time runs out before the puzzle is solved, the game ends, and a message appears: “Time’s up, Margo! Try again?” with a “Play Again” button.
  - **Swap Limit Mode:**
    - Display a swap counter at the top of the screen (e.g., “Swaps Left: 45”).
    - Decrement the counter each time a swap occurs.
    - If the swap limit is reached before the puzzle is solved, the game ends, and a message appears: “No swaps left, Margo! Try again?” with a “Play Again” button.
- **Puzzle Completion:**
  - The app should detect when the squares are in the correct order (i.e., the image is fully reconstructed).
  - If the puzzle is solved before the limit is reached, play a celebratory sound (e.g., a short fanfare) and display a message: “Great job, Margo! You solved the puzzle!” with a “Play Again” button.
  - The “Play Again” button returns the user to the image selection screen.

##### **2.6. Audio**
- The app must include three audio files:
  - **Swap Sound:** A soft “click” or “whoosh” (e.g., a subtle sound to indicate a swap has occurred).
  - **Fail Sound:** A soft “buzzer” or “boop” played when the game ends due to the time or swap limit being reached.
  - **Completion Sound:** A short fanfare (e.g., a triumphant tune) played when the puzzle is completed.
- Audio files should be lightweight (e.g., MP3 format) and cached for offline use.

##### **2.7. Navigation**
- The app should have a simple navigation structure:
  - **Home Screen:** Image selection.
  - **Difficulty Screen:** Choose difficulty level.
  - **Game Limit Screen:** Choose time or swap limit.
  - **Puzzle Screen:** Solve the puzzle.
- Include a “Back” button on the Difficulty, Game Limit, and Puzzle screens to return to the previous screen.
- Include a “Home” button on all screens to return to the image selection screen.

#### **3. Non-Functional Requirements (Mostly Unchanged)**

##### **3.1. Performance**
- The app must load quickly, even on first load, with all assets cached for offline use.
- Swapping animations should be smooth with no noticeable lag on an iPad.
- Timer updates (in Time Limit mode) should not impact performance.

##### **3.2. Design and Usability**
- **Visual Style:**
  - Use a bright, colorful, and child-friendly design with the Jurassic Park-inspired theme:
    - Font: *Bangers*.
    - Colors: Jungle Green (#2E8B57), Dino Red (#FF4040), Sunset Yellow (#FFD700), Sandy Beige (#F5DEB3), Volcanic Gray (#4A4A4A), Sky Blue (#87CEEB).
  - Background: A subtle dinosaur-themed pattern (e.g., faint footprints or leaves in Jungle Green on a Sandy Beige background).
  - Buttons: Large, rounded, and colorful (e.g., green for “2 Minutes,” yellow for “5 Minutes,” red for “10 Minutes”; same for swap limits).
  - Text: Use *Bangers* in a large size for headings (e.g., 24px) and a simpler font like *Open Sans* for smaller text (e.g., timer/swap counter, 16px).
- **Touch Interaction:**
  - All interactions (tapping to select squares, tapping buttons) must be optimized for touch on an iPad.
  - Squares and buttons should be large enough for a 7-year-old to interact with easily (minimum 48x48 pixels for tappable areas).
  - Highlight the first selected square with a clear visual cue (e.g., a thicker gold border) to make the swap mechanic intuitive.
- **Accessibility:**
  - Ensure high contrast between text/buttons and the background for readability (e.g., Volcanic Gray text on Sandy Beige background).
  - Audio feedback should be clear and distinct for swaps, failure, and completion.

##### **3.3. Compatibility**
- The app must work on modern iPads (e.g., iPadOS 16 or later).
- It should be responsive to different iPad screen sizes (e.g., iPad Mini, iPad Pro).
- The app must function in both portrait and landscape orientations.

##### **3.4. Offline Functionality**
- All assets (images, audio, HTML, CSS, JavaScript) must be cached using a service worker.
- The app should display a message if the user tries to load it without an internet connection for the first time: “Please connect to the internet to load the app for the first time.”

#### **4. Technical Requirements for Lovable.dev**

##### **4.1. Project Structure**
- **HTML/CSS/JavaScript:**
  - Use a single-page application (SPA) structure with HTML for the layout, CSS for styling, and JavaScript for interactivity.
  - Organize the app into four main views: Image Selection, Difficulty Selection, Game Limit Selection, and Puzzle Board.
- **Assets:**
  - Include the four provided dinosaur images as puzzle options.
  - Include three audio files for swap, fail, and completion sounds.
  - Include the dinosaur-themed app icon (192x192 PNG).

##### **4.2. PWA Setup**
- Create a `manifest.json` file with:
  - `name`: “Margo’s Dino Puzzle”
  - `short_name`: “Dino Puzzle”
  - `start_url`: “/index.html”
  - `display`: “standalone”
  - `icons`: Include the 192x192 PNG icon.
- Create a service worker (`sw.js`) to cache all assets for offline use:
  - Cache HTML, CSS, JavaScript, images, and audio files on first load.
  - Serve cached assets when offline.

##### **4.3. Puzzle Logic**
- **Image Slicing:**
  - Use JavaScript to programmatically slice the selected image into the appropriate number of squares based on difficulty (e.g., 2x2, 3x3, 4x4).
  - Each square should be a simple rectangular piece (no interlocking tabs or blanks, unlike a traditional jigsaw puzzle).
  - Store the correct position of each square for comparison during gameplay.
- **Random Sorting:**
  - Randomly shuffle the squares at the start of the game using a Fisher-Yates shuffle algorithm to ensure a random but solvable arrangement.
  - Ensure the initial scramble is solvable by checking the number of inversions (for a sliding puzzle, the number of inversions must be even for the puzzle to be solvable).
- **Swapping Mechanic:**
  - Track the user’s clicks to identify the first and second squares selected.
  - On the first click, highlight the square (e.g., with a thicker gold border).
  - On the second click, swap the positions of the two squares with a smooth animation (e.g., a 0.5-second CSS transition using `transform`).
  - Play the swap sound after each successful swap.
- **Game Limit Logic:**
  - **Time Limit Mode:**
    - Use JavaScript’s `setInterval` to create a countdown timer that updates every second.
    - Display the remaining time at the top of the screen (e.g., “Time Left: 4:32”).
    - When the timer reaches 0, end the game, play the fail sound, and show the “Time’s up, Margo!” message.
  - **Swap Limit Mode:**
    - Track the number of swaps in a state variable.
    - Display the remaining swaps at the top of the screen (e.g., “Swaps Left: 45”).
    - Decrement the counter after each swap.
    - When the swap limit reaches 0, end the game, play the fail sound, and show the “No swaps left, Margo!” message.
- **Completion Detection:**
  - After each swap, check if the current arrangement of squares matches the correct order.
  - If the puzzle is solved, play the completion sound and show the “Great job, Margo!” message.

##### **4.4. State Management**
- Use JavaScript to manage the app state:
  - Track the selected image, difficulty level, and game limit (time or swaps).
  - Track the current arrangement of squares and their correct positions.
  - Track the first selected square for swapping.
  - Track the remaining time or swaps, depending on the game mode.
  - Track puzzle completion to trigger the celebratory message.

#### **5. User Stories**
- As Margo, I want to select a dinosaur image to solve as a puzzle so I can choose my favorite scene.
- As Margo, I want to choose a difficulty level so I can play at a level that’s fun for me.
- As Margo, I want to set a time or swap limit so I can challenge myself in different ways.
- As Margo, I want to swap squares by clicking them to solve the puzzle so I can have fun putting the picture back together.
- As Margo, I want to hear a sound when I swap squares so I know I did something.
- As Margo, I want to know if I run out of time or swaps so I can try again.
- As Margo, I want to hear a fun sound and see a message when I finish the puzzle so I feel proud of my achievement.
- As Margo, I want to play the game offline so I can enjoy it anytime, even without internet.

#### **6. Deliverables for Prototype**
- A functional PWA that can be added to the iPad Home Screen.
- Four puzzle images (the provided dinosaur images).
- Three difficulty levels (4, 9, and 16 squares).
- Game limit selection (time or swap limit) with predefined options.
- Touch-friendly puzzle gameplay with a swap mechanic, audio feedback, and visual animations.
- Offline functionality with all assets cached.
- A simple, child-friendly UI with navigation between screens.

#### **7. Future Enhancements**
- Add a hint feature (e.g., show a semi-transparent overlay of the completed image).
- Include a scoring system or rewards (e.g., collect stars based on remaining time/swaps).
- Add a “scramble again” option to reshuffle the squares without changing the image or difficulty.
- Allow the user to toggle background music (e.g., a playful prehistoric tune).

---

### **Implementation Notes for Lovable.dev**
1. **Set Up the Project:**
   - Create a new project in Lovable.dev and set up the PWA structure (HTML, CSS, JavaScript, manifest, service worker).
   - Upload the four dinosaur images, audio files, and app icon as assets.
2. **Build the UI:**
   - Add a new Game Limit Selection screen with toggle/radio buttons for “Time Limit” and “Swap Limit,” and buttons for the predefined options.
   - Update the Puzzle screen to display a grid of squares instead of jigsaw pieces, with a timer or swap counter at the top.
   - Use Lovable.dev’s drag-and-drop UI builder to create the layout and style buttons with the Jurassic Park-inspired theme.
3. **Implement Logic:**
   - Use JavaScript to slice the image into squares and shuffle them (e.g., with the Fisher-Yates algorithm).
   - Implement the swap mechanic by tracking clicks and animating the swap with CSS transitions.
   - Add a countdown timer (for Time Limit mode) or swap counter (for Swap Limit mode) using JavaScript.
   - Add audio playback and completion detection as before.
4. **Test Offline Functionality:**
   - Test the service worker to ensure all assets are cached and the app works offline.
5. **Deploy and Test on iPad:**
   - Deploy the app via Lovable.dev and test it on an iPad to ensure touch interactions and PWA features work as expected.
