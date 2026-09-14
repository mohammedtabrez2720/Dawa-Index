// quick-i18n-setup.js - Run this once to help add data-i18n attributes
document.addEventListener('DOMContentLoaded', function() {
    // This is just a helper to identify elements that need translation
    console.log('Elements that might need translation:');
    
    // Find all text nodes that might need translation
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Only text nodes that aren't empty and aren't in script/style tags
                if (node.parentNode.nodeName === 'SCRIPT' || 
                    node.parentNode.nodeName === 'STYLE') {
                    return NodeFilter.FILTER_REJECT;
                }
                
                const text = node.textContent.trim();
                if (text.length > 2 && /[a-zA-Z]/.test(text)) {
                    return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_REJECT;
            }
        }
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push({
            element: node.parentNode,
            text: node.textContent.trim()
        });
    }
    
    console.log('Found', textNodes.length, 'text nodes that might need translation');
    console.log('Sample:', textNodes.slice(0, 10));
});