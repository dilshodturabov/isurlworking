const axios = require('axios');
const notifier = require('node-notifier');

const domain = 'malaka-oshirish.uz'
const url = `https://${domain}`;
const checkInterval = 30000; // 30 seconds - means that evey 30 seconds the code will check the url. It's optional and changable
async function checkSite() {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            notifier.notify({
                title: 'Website Status',
                message: `${domain} is working!`,
                sound: true, // Optional: set to true to play a sound
            });
            clearInterval(intervalId);
        } else {
            console.log('Still down, status code:', response.status);
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log(`${domain} is still returning 404.`);

        } else {
            console.log('Error accessing site:', error.message);
        }
    }
}

const intervalId = setInterval(checkSite, checkInterval);
