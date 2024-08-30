console.log("Content script loaded.");

document.addEventListener('DOMContentLoaded', () => {
    const pageUrl = window.location.href;
    console.log("Current URL:", pageUrl);
    console.log("DOM fully loaded and parsed.");

    // 发送 HTML 和 URL 给后台脚本
    chrome.runtime.sendMessage({
        html: document.documentElement.outerHTML,
        url: pageUrl
    });
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Content script received message:', message, 'from sender:', sender);
    if (message.data) {
        const website = message.data.website;
        const summary = message.data.summary;
        console.log(`Website: ${website}`);
        console.log(`Summary: ${summary}`);
        speakText(`Website: ${website}. Summary: ${summary}`);
    }
});

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}
