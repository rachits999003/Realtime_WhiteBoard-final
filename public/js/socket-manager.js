/**
 * Socket Manager
 * Centralized Socket.IO event handling for the frontend
 * Manages all real-time communication with the server
 */

class SocketManager {
  constructor(socketUrl = window.location.origin) {
    this.socket = io.connect(socketUrl);
    this.setupListeners();
  }

  setupListeners() {
    // Drawing events
    this.socket.on("onmousedown", (point) => {
      this.handleMouseDown(point);
    });

    this.socket.on("onmousemove", (point) => {
      this.handleMouseMove(point);
    });

    this.socket.on("onmouseup", (stroke) => {
      this.handleMouseUp(stroke);
    });

    // Tool events
    this.socket.on("ontoolchange", (tool) => {
      this.handleToolChange(tool);
    });

    this.socket.on("onsize", (size) => {
      this.handleSizeChange(size);
    });

    this.socket.on("oncolor", (color) => {
      this.handleColorChange(color);
    });

    // UI events
    this.socket.on("onhamburger", () => {
      this.handleHamburgerToggle();
    });

    // Undo/Redo events
    this.socket.on("onundo", () => {
      this.handleUndo();
    });

    this.socket.on("onredo", () => {
      this.handleRedo();
    });

    // Clear canvas event
    this.socket.on("onclear", () => {
      this.handleClear();
    });

    // Sticky notes events
    this.socket.on("onaddsticky", (data) => {
      this.handleAddSticky(data);
    });

    this.socket.on("onremovesticky", (id) => {
      this.handleRemoveSticky(id);
    });

    this.socket.on("onupdatesticky", (data) => {
      this.handleUpdateSticky(data);
    });

    // Image events
    this.socket.on("onuploadimage", (data) => {
      this.handleImageUpload(data);
    });

    // Connection events
    this.socket.on("connect", () => {
      console.log("✅ Connected to DrawEase server");
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Disconnected from DrawEase server");
    });

    this.socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  }

  // Drawing handlers
  handleMouseDown(point) {
    if (typeof window.handleRemoteMouseDown === "function") {
      window.handleRemoteMouseDown(point);
    }
  }

  handleMouseMove(point) {
    if (typeof window.handleRemoteMouseMove === "function") {
      window.handleRemoteMouseMove(point);
    }
  }

  handleMouseUp(stroke) {
    // Optional: handle complete stroke
  }

  // Tool handlers
  handleToolChange(tool) {
    if (typeof window.handleToolChange === "function") {
      window.handleToolChange(tool);
    }
  }

  handleSizeChange(size) {
    if (typeof window.handleRemoteSizeChange === "function") {
      window.handleRemoteSizeChange(size);
    }
  }

  handleColorChange(color) {
    if (typeof window.handleRemoteColorChange === "function") {
      window.handleRemoteColorChange(color);
    }
  }

  // UI handlers
  handleHamburgerToggle() {
    if (typeof window.handleHamburger === "function") {
      window.handleHamburger();
    }
  }

  // Undo/Redo handlers
  handleUndo() {
    if (typeof window.undoMaker === "function") {
      window.undoMaker();
    }
  }

  handleRedo() {
    if (typeof window.redoMaker === "function") {
      window.redoMaker();
    }
  }

  // Canvas handlers
  handleClear() {
    if (typeof window.handleClearCanvasRemote === "function") {
      window.handleClearCanvasRemote();
    }
  }

  // Sticky notes handlers
  handleAddSticky(data) {
    if (typeof window.handleRemoteAddSticky === "function") {
      window.handleRemoteAddSticky(data);
    }
  }

  handleRemoveSticky(id) {
    if (typeof window.handleRemoveSticky === "function") {
      window.handleRemoveSticky(id);
    }
  }

  handleUpdateSticky(data) {
    if (typeof window.handleRemoteUpdateSticky === "function") {
      window.handleRemoteUpdateSticky(data);
    }
  }

  // Image handler
  handleImageUpload(data) {
    if (typeof window.handleRemoteImageUpload === "function") {
      window.handleRemoteImageUpload(data);
    }
  }

  // Emit methods
  emitMouseDown(point) {
    this.socket.emit("mousedown", point);
  }

  emitMouseMove(point) {
    this.socket.emit("mousemove", point);
  }

  emitMouseUp(stroke) {
    this.socket.emit("mouseup", stroke);
  }

  emitToolChange(tool) {
    this.socket.emit("toolchange", tool);
  }

  emitSize(size) {
    this.socket.emit("size", size);
  }

  emitColor(color) {
    this.socket.emit("color", color);
  }

  emitHamburger() {
    this.socket.emit("hamburger");
  }

  emitUndo() {
    this.socket.emit("undo");
  }

  emitRedo() {
    this.socket.emit("redo");
  }

  emitClear() {
    this.socket.emit("clear");
  }

  emitAddSticky(data) {
    this.socket.emit("addsticky", data);
  }

  emitRemoveSticky(id) {
    this.socket.emit("removesticky", id);
  }

  emitUpdateSticky(data) {
    this.socket.emit("updatesticky", data);
  }

  emitImageUpload(data) {
    this.socket.emit("uploadimage", data);
  }
}

// Initialize socket manager globally
const socketManager = new SocketManager();
