/**
 * AI Home Inventory Application - Simple Version
 * 
 * This file contains only the essential functionality for file uploads and video analysis
 */

console.log('App-simple.js loaded successfully!');

// Mock configuration
const appConfig = {
    storage: {
        inventory: 'ai-home-inventory'
    },
    itemsPerPage: 10
};

// Global state
const state = {
    inventory: [],
    currentRoom: '',
    videoFiles: []
};

// DOM Elements
const elements = {
    // Upload section
    videoFileInput: document.getElementById('videoFile'),
    roomSelect: document.getElementById('roomSelect'),
    customRoomInput: document.getElementById('customRoom'),
    videoPreview: document.getElementById('videoPreview'),
    videoFilename: document.getElementById('videoFilename'),
    videoDuration: document.getElementById('videoDuration'),
    videoSize: document.getElementById('videoSize'),
    videoPreviewContainer: document.querySelector('.video-preview-container'),
    fileInputContainer: document.querySelector('.file-input-container'),
    fileStatus: document.getElementById('fileStatus'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    
    // Progress section
    progressSection: document.querySelector('.progress-section'),
    progressFill: document.querySelector('.progress-fill'),
    progressStatus: document.querySelector('.progress-status'),
    processingSteps: document.querySelectorAll('.step'),
    
    // Results section
    resultsSection: document.querySelector('.results-section')
};

// Initialize the application
function init() {
    loadInventoryFromStorage();
    attachEventListeners();
}

// Load inventory data from local storage
function loadInventoryFromStorage() {
    const savedInventory = localStorage.getItem(appConfig.storage.inventory);
    if (savedInventory) {
        try {
            state.inventory = JSON.parse(savedInventory);
            console.log('Loaded inventory from storage:', state.inventory.length, 'items');
        } catch (error) {
            console.error('Error loading inventory from storage:', error);
            state.inventory = [];
        }
    }
}

// Save inventory data to local storage
function saveInventoryToStorage() {
    try {
        localStorage.setItem(appConfig.storage.inventory, JSON.stringify(state.inventory));
        console.log('Saved inventory to storage:', state.inventory.length, 'items');
    } catch (error) {
        console.error('Error saving inventory to storage:', error);
    }
}

// Attach event listeners to DOM elements
function attachEventListeners() {
    // Video file input
    console.log('Adding event listener to videoFileInput:', elements.videoFileInput);
    elements.videoFileInput.addEventListener('change', handleVideoFileSelect);
    
    // Room selection
    elements.roomSelect.addEventListener('change', handleRoomSelectChange);
    
    // Analyze button
    elements.analyzeBtn.addEventListener('click', startVideoAnalysis);
}

// Handle video file selection
function handleVideoFileSelect(event) {
    console.log('handleVideoFileSelect called', event);
    const files = event.target.files;
    if (files.length === 0) return;
    
    state.videoFiles = Array.from(files);
    state.currentRoom = elements.roomSelect.value;
    
    // Update UI for selected video
    updateVideoPreview(state.videoFiles[0]);
    
    // Add visual feedback for file selection
    elements.fileInputContainer.classList.add('file-selected');
    elements.fileStatus.textContent = files.length > 1 
        ? `${files.length} files selected successfully!` 
        : 'File selected successfully!';
    elements.fileStatus.classList.remove('hidden');
    
    // Enable analyze button
    elements.analyzeBtn.disabled = false;
}

// Update video preview
function updateVideoPreview(file) {
    // Create object URL for the video file
    const videoURL = URL.createObjectURL(file);
    
    // Set video source and show preview
    elements.videoPreview.src = videoURL;
    elements.videoFilename.textContent = file.name;
    elements.videoSize.textContent = formatFileSize(file.size);
    
    // Get video duration when metadata is loaded
    elements.videoPreview.onloadedmetadata = () => {
        elements.videoDuration.textContent = formatDuration(elements.videoPreview.duration);
    };
    
    elements.videoPreviewContainer.classList.remove('hidden');
}

// Format file size for display
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format duration for display
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Handle room selection change
function handleRoomSelectChange() {
    const selectedRoom = elements.roomSelect.value;
    
    if (selectedRoom === 'other') {
        elements.customRoomInput.classList.remove('hidden');
    } else {
        elements.customRoomInput.classList.add('hidden');
    }
    
    state.currentRoom = selectedRoom;
}

// Start video analysis process
async function startVideoAnalysis() {
    console.log('startVideoAnalysis called');
    console.log('Video files:', state.videoFiles);
    
    if (state.videoFiles.length === 0) {
        console.error('No video files selected');
        return;
    }
    
    // Show progress section
    if (elements.progressSection) {
        console.log('Showing progress section');
        elements.progressSection.classList.remove('hidden');
    } else {
        console.error('Progress section element not found');
    }
    
    // Reset progress indicators
    updateProgressBar(0);
    updateProgressStep('upload');
    
    // Process each video file
    for (let i = 0; i < state.videoFiles.length; i++) {
        const file = state.videoFiles[i];
        const room = state.currentRoom === 'other' ? elements.customRoomInput.value : state.currentRoom;
        
        try {
            // Step 1: Upload video
            updateProgressStatus(`Uploading video ${i+1} of ${state.videoFiles.length}: ${file.name}`);
            await simulateProgress(10, 20); // Simulate upload progress
            
            // Step 2: Analyze video
            updateProgressStep('analyze');
            updateProgressStatus(`Analyzing video ${i+1} of ${state.videoFiles.length}`);
            await simulateProgress(20, 40); // Simulate analysis progress
            
            // Step 3: Identify items
            updateProgressStep('identify');
            updateProgressStatus(`Identifying items in video ${i+1} of ${state.videoFiles.length}`);
            const detectedItems = await simulateItemDetection(file, room);
            await simulateProgress(40, 70); // Simulate identification progress
            
            // Step 4: Estimate values
            updateProgressStep('value');
            updateProgressStatus(`Estimating values for ${detectedItems.length} items`);
            const valuedItems = await simulateValueEstimation(detectedItems);
            await simulateProgress(70, 95); // Simulate valuation progress
            
            // Add items to inventory
            state.inventory = [...state.inventory, ...valuedItems];
            
            // Save to local storage
            saveInventoryToStorage();
            
            // Update progress
            updateProgressBar(95 + (i / state.videoFiles.length) * 5);
        } catch (error) {
            console.error('Error processing video:', error);
            updateProgressStatus(`Error processing video: ${error.message}`);
            return;
        }
    }
    
    // Complete the process
    updateProgressStep('complete');
    updateProgressBar(100);
    updateProgressStatus('Analysis complete!');
    
    // Show results section after a short delay
    setTimeout(() => {
        if (elements.resultsSection) {
            elements.resultsSection.classList.remove('hidden');
        }
    }, 1000);
}

// Update progress bar
function updateProgressBar(percent) {
    if (elements.progressFill) {
        elements.progressFill.style.width = `${percent}%`;
    }
}

// Update progress status text
function updateProgressStatus(message) {
    if (elements.progressStatus) {
        elements.progressStatus.textContent = message;
    }
}

// Update active progress step
function updateProgressStep(stepId) {
    if (!elements.processingSteps) return;
    
    elements.processingSteps.forEach(step => {
        const stepElement = step;
        if (stepElement.dataset.step === stepId) {
            stepElement.classList.add('active');
        } else if (
            (stepId === 'analyze' && stepElement.dataset.step === 'upload') ||
            (stepId === 'identify' && ['upload', 'analyze'].includes(stepElement.dataset.step)) ||
            (stepId === 'value' && ['upload', 'analyze', 'identify'].includes(stepElement.dataset.step)) ||
            (stepId === 'complete' && ['upload', 'analyze', 'identify', 'value'].includes(stepElement.dataset.step))
        ) {
            stepElement.classList.remove('active');
            stepElement.classList.add('completed');
        } else {
            stepElement.classList.remove('active', 'completed');
        }
    });
}

// Simulate progress over time
function simulateProgress(startPercent, endPercent) {
    return new Promise(resolve => {
        const duration = 1000 + Math.random() * 2000; // Random duration between 1-3 seconds
        const startTime = Date.now();
        
        function updateProgress() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentPercent = startPercent + progress * (endPercent - startPercent);
            
            updateProgressBar(currentPercent);
            
            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            } else {
                resolve();
            }
        }
        
        updateProgress();
    });
}

// Simulate item detection from video
async function simulateItemDetection(file, room) {
    // In a real implementation, this would call the Azure Computer Vision API
    // For this demo, we'll generate some random items
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const roomName = room.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Generate random items based on the room
    const items = [];
    const itemCount = 5 + Math.floor(Math.random() * 10); // 5-15 items
    
    for (let i = 0; i < itemCount; i++) {
        const item = generateRandomItem(roomName);
        items.push(item);
    }
    
    return items;
}

// Generate a random item based on room
function generateRandomItem(room) {
    // Define possible items by room
    const roomItems = {
        'Living Room': [
            { name: 'Sofa', category: 'furniture', brands: ['IKEA', 'Ashley', 'La-Z-Boy'] },
            { name: 'Coffee Table', category: 'furniture', brands: ['IKEA', 'West Elm', 'Pottery Barn'] },
            { name: 'TV', category: 'electronics', brands: ['Samsung', 'LG', 'Sony'] },
            { name: 'Bookshelf', category: 'furniture', brands: ['IKEA', 'Target', 'Wayfair'] },
            { name: 'Floor Lamp', category: 'decor', brands: ['IKEA', 'Target', 'Wayfair'] },
            { name: 'Area Rug', category: 'decor', brands: ['Ruggable', 'Wayfair', 'West Elm'] }
        ],
        'Kitchen': [
            { name: 'Refrigerator', category: 'appliances', brands: ['Samsung', 'LG', 'Whirlpool'] },
            { name: 'Microwave', category: 'appliances', brands: ['Samsung', 'LG', 'Whirlpool'] },
            { name: 'Toaster', category: 'appliances', brands: ['Cuisinart', 'KitchenAid', 'Breville'] },
            { name: 'Dining Table', category: 'furniture', brands: ['IKEA', 'West Elm', 'Pottery Barn'] },
            { name: 'Blender', category: 'appliances', brands: ['Vitamix', 'Ninja', 'KitchenAid'] },
            { name: 'Knife Set', category: 'kitchenware', brands: ['Wusthof', 'Henckels', 'Cuisinart'] }
        ],
        'Bedroom': [
            { name: 'Bed Frame', category: 'furniture', brands: ['IKEA', 'Wayfair', 'West Elm'] },
            { name: 'Mattress', category: 'furniture', brands: ['Casper', 'Purple', 'Tempur-Pedic'] },
            { name: 'Dresser', category: 'furniture', brands: ['IKEA', 'Wayfair', 'Ashley'] },
            { name: 'Nightstand', category: 'furniture', brands: ['IKEA', 'Wayfair', 'West Elm'] },
            { name: 'Lamp', category: 'decor', brands: ['Target', 'IKEA', 'Pottery Barn'] },
            { name: 'Mirror', category: 'decor', brands: ['IKEA', 'Target', 'West Elm'] }
        ],
        'Bathroom': [
            { name: 'Shower Curtain', category: 'decor', brands: ['Target', 'Bed Bath & Beyond', 'Amazon Basics'] },
            { name: 'Bath Mat', category: 'decor', brands: ['Target', 'Bed Bath & Beyond', 'Amazon Basics'] },
            { name: 'Towel Set', category: 'decor', brands: ['Target', 'Bed Bath & Beyond', 'Amazon Basics'] },
            { name: 'Medicine Cabinet', category: 'furniture', brands: ['Home Depot', 'Wayfair', 'IKEA'] },
            { name: 'Hair Dryer', category: 'electronics', brands: ['Dyson', 'Conair', 'Revlon'] }
        ],
        'Home Office': [
            { name: 'Desk', category: 'furniture', brands: ['IKEA', 'Wayfair', 'Pottery Barn'] },
            { name: 'Office Chair', category: 'furniture', brands: ['Herman Miller', 'Steelcase', 'IKEA'] },
            { name: 'Laptop', category: 'electronics', brands: ['Apple', 'Dell', 'HP'] },
            { name: 'Monitor', category: 'electronics', brands: ['Dell', 'LG', 'Samsung'] },
            { name: 'Desk Lamp', category: 'decor', brands: ['IKEA', 'Target', 'Amazon Basics'] },
            { name: 'Bookshelf', category: 'furniture', brands: ['IKEA', 'Target', 'Wayfair'] }
        ],
        'Garage': [
            { name: 'Tool Set', category: 'other', brands: ['DeWalt', 'Milwaukee', 'Craftsman'] },
            { name: 'Lawn Mower', category: 'other', brands: ['Honda', 'Toro', 'John Deere'] },
            { name: 'Workbench', category: 'furniture', brands: ['Husky', 'Gladiator', 'Craftsman'] },
            { name: 'Storage Shelves', category: 'furniture', brands: ['Husky', 'Gladiator', 'IKEA'] },
            { name: 'Bicycle', category: 'other', brands: ['Trek', 'Specialized', 'Giant'] }
        ]
    };
    
    // Default to Living Room if room not found
    const roomItemList = roomItems[room] || roomItems['Living Room'];
    
    // Pick a random item from the room's list
    const randomItemTemplate = roomItemList[Math.floor(Math.random() * roomItemList.length)];
    
    // Generate a random brand from the item's possible brands
    const brand = randomItemTemplate.brands[Math.floor(Math.random() * randomItemTemplate.brands.length)];
    
    // Generate random condition
    const conditions = ['new', 'like-new', 'good', 'fair', 'poor'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    // Generate random quantity (usually 1, but sometimes more)
    const quantity = Math.random() > 0.8 ? Math.floor(Math.random() * 5) + 2 : 1;
    
    // Generate a random value range based on category and condition
    const baseValue = getBaseValueForItem(randomItemTemplate.name, randomItemTemplate.category);
    const conditionMultiplier = getConditionMultiplier(condition);
    const valueMin = Math.round(baseValue * conditionMultiplier * 0.8);
    const valueMax = Math.round(baseValue * conditionMultiplier * 1.2);
    
    // Generate a random image URL (in a real app, this would be a screenshot from the video)
    const imageUrl = `https://source.unsplash.com/300x300/?${encodeURIComponent(randomItemTemplate.name)}`;
    
    // Create the item object
    return {
        id: generateUniqueId(),
        name: randomItemTemplate.name,
        category: randomItemTemplate.category,
        brand: brand,
        quantity: quantity,
        condition: condition,
        valueMin: valueMin,
        valueMax: valueMax,
        room: room,
        imageUrl: imageUrl,
        notes: '',
        timestamp: new Date().toISOString()
    };
}

// Get base value for an item based on its category
function getBaseValueForItem(name, category) {
    // These are rough estimates for demo purposes
    const categoryValues = {
        'furniture': { min: 100, max: 2000 },
        'electronics': { min: 50, max: 3000 },
        'appliances': { min: 50, max: 2000 },
        'decor': { min: 20, max: 500 },
        'kitchenware': { min: 20, max: 300 },
        'clothing': { min: 20, max: 200 },
        'other': { min: 10, max: 1000 }
    };
    
    // Special cases for high-value items
    const highValueItems = {
        'TV': { min: 300, max: 3000 },
        'Laptop': { min: 500, max: 2500 },
        'Refrigerator': { min: 800, max: 3000 },
        'Sofa': { min: 500, max: 3000 },
        'Mattress': { min: 300, max: 2000 },
        'Office Chair': { min: 100, max: 1500 }
    };
    
    if (highValueItems[name]) {
        const { min, max } = highValueItems[name];
        return min + Math.random() * (max - min);
    } else {
        const { min, max } = categoryValues[category] || categoryValues.other;
        return min + Math.random() * (max - min);
    }
}

// Get value multiplier based on condition
function getConditionMultiplier(condition) {
    const multipliers = {
        'new': 1.0,
        'like-new': 0.9,
        'good': 0.7,
        'fair': 0.5,
        'poor': 0.3
    };
    
    return multipliers[condition] || 0.5;
}

// Generate a unique ID for an item
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Simulate value estimation for detected items
async function simulateValueEstimation(items) {
    // In a real implementation, this would call a pricing API
    // For this demo, we'll just return the items as is since we already assigned values
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return items;
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
