// API Configuration
const API_BASE = window.location.origin;

// State Management
let currentTrends = [];
let currentPosts = [];
let selectedPost = null;

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const loading = document.getElementById('loading');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadTrends();
    loadPlatforms();
});

// Setup Event Listeners
function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Refresh trends
    document.getElementById('refresh-trends').addEventListener('click', loadTrends);

    // Generate posts
    document.getElementById('generate-posts').addEventListener('click', generatePosts);
}

// Tab Switching
function switchTab(tabName) {
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}-tab`);
    });
}

// Show/Hide Loading
function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

// Load Trending Topics
async function loadTrends() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE}/api/trends`);
        const data = await response.json();
        
        if (data.success) {
            currentTrends = data.data;
            displayTrends(data.data);
        } else {
            showError('Failed to load trends');
        }
    } catch (error) {
        console.error('Error loading trends:', error);
        showError('Failed to load trends');
    } finally {
        hideLoading();
    }
}

// Display Trends
function displayTrends(trends) {
    const trendsList = document.getElementById('trends-list');
    trendsList.innerHTML = '';

    trends.forEach((trend, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3 class="card-title">${trend.title}</h3>
            <p class="card-snippet">${trend.snippet}</p>
            <div class="card-meta">
                <span class="card-source">${trend.source}</span>
                ${trend.link ? `<a href="${trend.link}" class="card-link" target="_blank">View Source →</a>` : ''}
            </div>
        `;
        trendsList.appendChild(card);
    });
}

// Generate Posts
async function generatePosts() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE}/api/content/generate?count=5`);
        const data = await response.json();
        
        if (data.success) {
            currentPosts = data.data;
            displayPosts(data.data);
            switchTab('posts');
        } else {
            showError('Failed to generate posts');
        }
    } catch (error) {
        console.error('Error generating posts:', error);
        showError('Failed to generate posts');
    } finally {
        hideLoading();
    }
}

// Display Posts
function displayPosts(posts) {
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';

    posts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        let sectionsHtml = '';
        if (post.mainContent && Array.isArray(post.mainContent)) {
            sectionsHtml = post.mainContent.map(section => `
                <div class="post-section">
                    <h4 class="post-section-heading">${section.heading}</h4>
                    <p class="post-section-content">${section.content}</p>
                </div>
            `).join('');
        }

        let tagsHtml = '';
        if (post.tags && Array.isArray(post.tags)) {
            tagsHtml = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        }

        postCard.innerHTML = `
            <h3 class="post-title">${post.title}</h3>
            <p class="post-intro">${post.introduction}</p>
            ${sectionsHtml}
            <div class="post-conclusion">
                <strong>Conclusion:</strong> ${post.conclusion}
            </div>
            <div class="post-tags">${tagsHtml}</div>
            <div class="post-meta card-meta">
                <span class="card-source">${post.source}</span>
                <span>${new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="post-actions">
                <button class="btn btn-success btn-small" onclick="selectPostForPublishing(${index})">
                    Select for Publishing
                </button>
            </div>
        `;
        
        postsList.appendChild(postCard);
    });
}

// Load Available Platforms
async function loadPlatforms() {
    try {
        const response = await fetch(`${API_BASE}/api/post/platforms`);
        const data = await response.json();
        
        if (data.success) {
            displayPlatforms(data.data);
        }
    } catch (error) {
        console.error('Error loading platforms:', error);
    }
}

// Display Platforms
function displayPlatforms(platforms) {
    const platformsStatus = document.getElementById('platforms-status');
    platformsStatus.innerHTML = '';

    platforms.forEach(platform => {
        const card = document.createElement('div');
        card.className = `platform-card ${platform.configured ? 'configured' : 'not-configured'}`;
        card.innerHTML = `
            <div class="platform-name">${platform.name}</div>
            <div class="platform-status">
                ${platform.configured ? '✅ Configured' : '⚠️ Not Configured'}
            </div>
        `;
        platformsStatus.appendChild(card);
    });
}

// Select Post for Publishing
function selectPostForPublishing(index) {
    selectedPost = currentPosts[index];
    
    const publishForm = document.getElementById('publish-form');
    publishForm.innerHTML = `
        <h3 style="margin-bottom: 15px;">Selected Post: ${selectedPost.title}</h3>
        <p style="margin-bottom: 20px; color: #666;">Choose platforms to publish:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
            <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" value="twitter" class="platform-checkbox">
                Twitter
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" value="linkedin" class="platform-checkbox">
                LinkedIn
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" value="medium" class="platform-checkbox">
                Medium
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" value="devto" class="platform-checkbox">
                DEV.to
            </label>
        </div>
        <button class="btn btn-success" onclick="publishToSelectedPlatforms()">
            Publish Now
        </button>
    `;
    
    switchTab('publish');
}

// Publish to Selected Platforms
async function publishToSelectedPlatforms() {
    const checkboxes = document.querySelectorAll('.platform-checkbox:checked');
    const platforms = Array.from(checkboxes).map(cb => cb.value);

    if (platforms.length === 0) {
        alert('Please select at least one platform');
        return;
    }

    if (!selectedPost) {
        alert('Please select a post first');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`${API_BASE}/api/post/publish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: selectedPost,
                platforms: platforms
            })
        });

        const data = await response.json();
        
        if (data.success) {
            displayPublishResults(data.data);
        } else {
            showError('Failed to publish content');
        }
    } catch (error) {
        console.error('Error publishing:', error);
        showError('Failed to publish content');
    } finally {
        hideLoading();
    }
}

// Display Publish Results
function displayPublishResults(results) {
    const publishResults = document.getElementById('publish-results');
    publishResults.classList.remove('hidden');
    publishResults.innerHTML = '<h3 style="margin-bottom: 15px;">Publishing Results:</h3>';

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${result.success ? '' : 'failed'}`;
        resultItem.innerHTML = `
            <div class="result-platform">${result.success ? '✅' : '❌'} ${result.platform}</div>
            <div class="result-message">${result.message}</div>
            ${result.mockData ? '<small style="color: #999;">(Mock mode - API keys not configured)</small>' : ''}
        `;
        publishResults.appendChild(resultItem);
    });
}

// Show Error
function showError(message) {
    alert(message);
}

// Make functions globally available
window.selectPostForPublishing = selectPostForPublishing;
window.publishToSelectedPlatforms = publishToSelectedPlatforms;
