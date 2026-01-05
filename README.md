# Block Scene Switcher

A visual programming interface for OBS Studio using Blockly. This tool allows you to create complex scene switching logic, respond to OBS events, and integrate with external APIs like the Broadcast Channel API and Server-Sent Events (SSE).

## Usage

1.  **Connect to OBS**: Ensure OBS Studio is running and the OBS WebSocket plugin is enabled.
2.  **Define Logic**: Use the custom blocks in the "OBS Events", "OBS Actions", "Broadcast Channel", and "SSE" categories to build your automation logic.
3.  **Deploy**: Click the "Deploy" button (if available in the UI) to execute your logic.
4.  **Auto-Deploy**: Use URL parameters to automatically load and run a configuration:
    *   `?deploy=filename&location=local`
    *   `?deploy=filename&location=obsidian`

## Features

*   **OBS Integration**: Control scenes, muting, and streaming state.
*   **Event Driven**: Trigger logic based on OBS events (scene changes, mute toggles, etc.).
*   **Broadcast Channel API**: Synchronize state across different browser tabs or windows.
*   **Server-Sent Events (SSE)**: Respond to real-time events from external servers.
*   **Blockly Interface**: Intuitive drag-and-drop programming.

## Developer Overview

### Project Structure

*   `src/main.ts`: Application entry point and workspace initialization.
*   `src/blocks/`:
    *   `definitions.ts`: Custom block UI definitions.
    *   `generators.ts`: JavaScript code generation for custom blocks.
    *   `toolbox.ts`: Definition of the Blockly toolbox categories.
*   `src/lib/`: Core libraries (e.g., OBS connection management).
*   `src/utils/`: Helper functions for file handling and deployment logic.
*   `docs/`: Auto-generated documentation (JSDoc) hosted on GitHub Pages.

### Built-in Commentary

The codebase follows a modular design pattern to ensure scalability. For instance:
*   **Block Definitions**: We use both JSON-based and JavaScript-based definitions to balance simplicity and dynamic behavior.
*   **Code Generation**: The `javascriptGenerator` is used to transform visual blocks into executable JavaScript strings, which are then evaluated in a safe context.
*   **Communication**: The system supports multiple communication protocols (WebSockets for OBS, BroadcastChannel for cross-tab, EventSource for SSE) to provide a versatile automation platform.

### Development Commands

*   `npm run dev`: Build and watch for changes.
*   `npm run build`: Production build.
*   `npm run docs`: Generate JSDoc documentation.

## GitHub Pages

The documentation is automatically generated into the `/docs` folder. To view it, enable GitHub Pages on your repository and point it to the `/docs` folder on the main branch.
