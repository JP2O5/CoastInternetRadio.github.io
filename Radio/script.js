// Function to fetch and update track information from an API
function fetchTrackInfo() {
    // TODO: Replace with the actual endpoint URL for track information
    const trackInfoUrl = 'URL_TO_TRACK_INFO_API';

    fetch(trackInfoUrl)
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Update DOM elements with the track information
                document.getElementById('current-track').textContent = `Now Playing: ${data.current}`;
                document.getElementById('previous-track').textContent = `Previously: ${data.previous}`;
                document.getElementById('upcoming-track').textContent = `Up Next: ${data.upcoming}`;
            }
        })
        .catch(error => console.error('Error fetching track info:', error));
}

// Initialize track info update on page load and set interval for regular updates
document.addEventListener('DOMContentLoaded', () => {
    fetchTrackInfo();
    setInterval(fetchTrackInfo, 5000); // Update every 5 seconds
});

// Toggle dark mode functionality
document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.getElementById('dark-mode-button');
    darkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeButton.classList.toggle('dark-mode-active');
        darkModeButton.textContent = document.body.classList.contains('dark-mode') ? 'Disable Dark Mode' : 'Enable Dark Mode';
    });
});

// Toggle now playing sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-now-playing');
    const toggleIcon = document.querySelector('.toggle-icon');
    const nowPlayingSection = document.getElementById('now-playing');

    toggleButton.addEventListener('click', () => {
        const isOpen = nowPlayingSection.style.right === '0px';
        nowPlayingSection.style.right = isOpen ? '-260px' : '0px';
        toggleIcon.textContent = isOpen ? '➤' : '◀';
    });
});

// Accessibility mode toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const accessibilityButton = document.getElementById('accessibility-toggle');
    let isAccessibilityOn = false;

    accessibilityButton.addEventListener('click', () => {
        isAccessibilityOn = !isAccessibilityOn;
        toggleAccessibility(isAccessibilityOn);
    });
});

function toggleAccessibility(isOn) {
    const body = document.body;
    if (isOn) {
        body.classList.add('accessibility-mode');
        // TODO: Add specific accessibility enhancements
    } else {
        body.classList.remove('accessibility-mode');
        // TODO: Revert to normal settings
    }
}

// Text-to-speech functionality
document.addEventListener('DOMContentLoaded', () => {
    const ttsButton = document.getElementById('text-to-speech-button');
    const synth = window.speechSynthesis;
    let isSpeaking = false;

    ttsButton.addEventListener('click', () => {
        if (isSpeaking) {
            synth.cancel();
            isSpeaking = false;
            ttsButton.textContent = 'Read Aloud';
        } else {
            if (synth.speaking) {
                console.error('SpeechSynthesis is already speaking.');
                return;
            }
            const textToSpeak = document.body.textContent || document.body.innerText;
            const utterThis = new SpeechSynthesisUtterance(textToSpeak);

            utterThis.onend = () => {
                isSpeaking = false;
                ttsButton.textContent = 'Read Aloud';
            };

            utterThis.onerror = () => {
                isSpeaking = false;
            };

            synth.speak(utterThis);
            isSpeaking = true;
            ttsButton.textContent = 'Stop Reading';
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    updateLiveStatus();
    setInterval(updateLiveStatus, 60000); // Update every minute
});

function updateLiveStatus() {
    const now = new Date();
    const day = now.toLocaleString('en-US', { weekday: 'long' });
    const hour = now.getHours();
    const minute = now.getMinutes();

    const schedules = {
        "Monday": [{ start: 8, end: 10 }, { start: 14, end: 16 }],
        "Wednesday": [{ start: 8, end: 10 }, { start: 14, end: 16 }],
        "Friday": [{ start: 8, end: 10 }, { start: 14, end: 16 }],
        "Saturday": [{ start: 8, end: 10 }, { start: 14, end: 16 }]
    };

    let isLive = false;
    if (schedules[day]) {
        schedules[day].forEach(session => {
            if (hour >= session.start && hour < session.end) {
                isLive = true;
            }
        });
    }

    const liveIcon = document.getElementById('live-icon');
    const liveText = document.getElementById('live-text');
    if (isLive) {
        liveIcon.classList.add('live');
        liveText.textContent = 'Live Now';
    } else {
        liveIcon.classList.remove('live');
        liveText.textContent = 'Offline';
    }
}
