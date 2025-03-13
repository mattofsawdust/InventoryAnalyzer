/**
 * AI Home Inventory Configuration
 * 
 * This file contains configuration settings for the AI Home Inventory application.
 * Replace placeholder values with your actual API keys and endpoints.
 */

// Azure Computer Vision API configuration
const azureConfig = {
    // Replace with your Azure Computer Vision API key
    subscriptionKey: 'YOUR_AZURE_SUBSCRIPTION_KEY',
    
    // Replace with your Azure Computer Vision API endpoint
    endpoint: 'https://YOUR_REGION.api.cognitive.microsoft.com/vision/v3.2',
    
    // Confidence threshold for object detection (0.0 to 1.0)
    confidenceThreshold: 0.7
};

// Market price API configuration (for item valuation)
const marketPriceConfig = {
    // Replace with your price API key (e.g., eBay, Amazon, etc.)
    apiKey: 'YOUR_PRICE_API_KEY',
    
    // Replace with your price API endpoint
    endpoint: 'https://api.example.com/prices',
    
    // Maximum age of cached price data in hours
    cacheMaxAge: 24
};

// Application settings
const appConfig = {
    // Maximum video file size in MB
    maxVideoSize: 500,
    
    // Supported video formats
    supportedFormats: ['mp4', 'mov', 'avi'], // mov = QuickTime format
    
    // Number of items per page in the inventory table
    itemsPerPage: 10,
    
    // Default room categories
    rooms: [
        'Living Room',
        'Kitchen',
        'Bedroom',
        'Bathroom',
        'Home Office',
        'Garage',
        'Other'
    ],
    
    // Default item categories
    categories: [
        'Furniture',
        'Electronics',
        'Appliances',
        'Decor',
        'Kitchenware',
        'Clothing',
        'Other'
    ],
    
    // Default condition ratings
    conditions: [
        { id: 'new', label: 'New', valueMultiplier: 1.0 },
        { id: 'like-new', label: 'Like New', valueMultiplier: 0.9 },
        { id: 'good', label: 'Good', valueMultiplier: 0.7 },
        { id: 'fair', label: 'Fair', valueMultiplier: 0.5 },
        { id: 'poor', label: 'Poor', valueMultiplier: 0.3 }
    ],
    
    // Insurance recommendation thresholds
    insurance: {
        // Value thresholds for different coverage recommendations
        valueTiers: [
            { min: 0, max: 10000, recommendation: 'Basic Coverage' },
            { min: 10001, max: 50000, recommendation: 'Standard Coverage' },
            { min: 50001, max: 100000, recommendation: 'Premium Coverage' },
            { min: 100001, max: Infinity, recommendation: 'Custom High-Value Coverage' }
        ],
        
        // High-value category thresholds
        highValueCategories: {
            'Electronics': 5000,
            'Jewelry': 2000,
            'Art': 3000,
            'Collectibles': 2000
        }
    },
    
    // Local storage keys
    storage: {
        inventory: 'ai-home-inventory',
        settings: 'ai-home-inventory-settings',
        lastSync: 'ai-home-inventory-last-sync'
    }
};
