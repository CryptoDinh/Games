// Mock GameAPI implementation
window.GameAPI = {
    loadAPI: function(callback) {
        // Create a minimal API instance
        var apiInstance = {
            version: '1.0.0',
            Branding: {
                getLink: function(type) {
                    return {
                        action: function() { 
                            console.log('More games clicked');
                        }
                    };
                },
                getLogo: function() {
                    return {};
                }
            },
            Score: {
                submit: function(score) {
                    console.log('Score submitted:', score);
                }
            }
        };
        
        // Call the callback with our mock API instance
        if (callback) {
            setTimeout(function() {
                callback(apiInstance);
            }, 0);
        }
    }
};
