/**
 * Main Application Entry Point
 * Initializes the DrawEase whiteboard application
 */

// Application state
const appState = {
  isConnected: false,
  currentTool: 'pencil',
  currentColor: 'blue',
  currentSize: 5
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎨 DrawEase initialized');
  
  // Log connection status
  socket.on('connect', () => {
    appState.isConnected = true;
    console.log('✅ Connected to server');
  });
  
  socket.on('disconnect', () => {
    appState.isConnected = false;
    console.log('❌ Disconnected from server');
  });
});
