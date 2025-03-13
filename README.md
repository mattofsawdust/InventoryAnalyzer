# AI Home Inventory

An AI-powered application that processes video footage to automatically catalog and value your home contents.

## Overview

AI Home Inventory is a web-based application that uses computer vision to analyze videos of your home, automatically detecting and cataloging items with detailed information including:

- Item name and category
- Estimated quantity
- Brand identification
- Condition assessment
- Current market value range
- Item location within the home

The application generates comprehensive reports for insurance purposes, helping you maintain an up-to-date inventory of your possessions.

## Features

- **Video Processing**: Upload and analyze videos in standard formats (MP4, MOV, AVI)
- **AI Object Detection**: Uses computer vision to identify items with high accuracy
- **Automatic Valuation**: Cross-references identified items with current market prices
- **Room-by-Room Organization**: Categorize items by their location in your home
- **Comprehensive Reporting**: Generate CSV/PDF reports including:
  - Itemized inventory with values
  - Total estimated value of contents
  - Categories breakdown
  - Insurance coverage recommendations
  - Supporting screenshots from the video
- **Manual Editing**: Add, edit, or remove items from the inventory
- **Customization Options**:
  - Price range adjustments
  - Custom categories
  - Multiple video processing
  - Cloud backup of inventory data
  - Insurance company compatible export formats

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Azure Computer Vision API key (for production use)

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/ai-home-inventory.git
   cd ai-home-inventory
   ```

2. Configure API keys:
   - Open `config.js`
   - Replace placeholder values with your actual API keys:
     ```javascript
     // Azure Computer Vision API configuration
     const azureConfig = {
         subscriptionKey: 'YOUR_AZURE_SUBSCRIPTION_KEY',
         endpoint: 'https://YOUR_REGION.api.cognitive.microsoft.com/vision/v3.2',
         confidenceThreshold: 0.7
     };
     ```

3. Open `index.html` in your web browser or serve with a local server:
   ```
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

### Usage

1. **Upload Video**: 
   - Click on the upload area or drag and drop video files
   - Select the room where the video was recorded
   - Click "Analyze Video"

2. **Review Results**:
   - After processing, review detected items in the "Items" tab
   - Check the "Summary" tab for total value and statistics
   - Generate reports in the "Report" tab

3. **Edit Inventory**:
   - Click the edit icon on any item to modify details
   - Use the "+" button to add items manually
   - Filter and sort items using the controls above the inventory table

## Technical Implementation

The application is built using modern web technologies:

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Computer Vision**: Azure Computer Vision API
- **Data Visualization**: Chart.js
- **Data Storage**: Local Storage (browser-based)

In a production environment, this would be extended with:
- Backend server for video processing
- Database for inventory storage
- User authentication
- Cloud storage for videos and images

## Demo Mode

The current implementation runs in demo mode, simulating AI detection with pre-defined items. For full functionality, integrate with the Azure Computer Vision API by updating the API keys in `config.js`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by Font Awesome
- Charts powered by Chart.js
- Demo images from Unsplash
