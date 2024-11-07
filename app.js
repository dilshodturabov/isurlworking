const axios = require('axios');
const notifier = require('node-notifier');

const url = 'https://malaka-oshirish.uz';
const checkInterval = 30000; // 30 seconds

async function checkSite() {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            notifier.notify({
                title: 'Website Status',
                message: 'green-pixel.uz is working!',
                sound: true, // Optional: set to true to play a sound
            });
            clearInterval(intervalId);
        } else {
            console.log('Still down, status code:', response.status);
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('green-pixel.uz is still returning 404.');

        } else {
            console.log('Error accessing site:', error.message);
        }
    }
}

const intervalId = setInterval(checkSite, checkInterval);
