const subscriptionKey = 'YOUR_AZURE_SUBSCRIPTION_KEY';
const endpoint = 'YOUR_AZURE_ENDPOINT';

async function analyzeVideo() {
    const fileInput = document.getElementById('videoFile');
    const resultsDiv = document.getElementById('results');
    
    if (!fileInput.files[0]) {
        alert('Please select a video file');
        return;
    }

    try {
        // Show loading state
        resultsDiv.innerHTML = 'Analyzing video...';

        const formData = new FormData();
        formData.append('video', fileInput.files[0]);

        // Upload video to Azure Video Indexer
        const response = await fetch(`${endpoint}/vision/v3.2/analyze`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            body: formData
        });

        const result = await response.json();
        
        // Display results
        let html = '<h2>Analysis Results:</h2>';
        if (result.objects) {
            html += '<h3>Objects Detected:</h3><ul>';
            result.objects.forEach(obj => {
                html += `<li>${obj.name} (Confidence: ${Math.round(obj.confidence * 100)}%)</li>`;
            });
            html += '</ul>';
        }

        resultsDiv.innerHTML = html;
    } catch (error) {
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}
