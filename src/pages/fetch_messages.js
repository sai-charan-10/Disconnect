
import {updateChatHistory} from './ChatInterface'

function fetchMessages(senderId, recipientId, updateChatHistory) {
return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
        if (xhr.getResponseHeader("content-type").includes("application/json")) {
            // Check if the response is JSON
            var messages = JSON.parse(xhr.responseText);
            updateChatHistory(messages);
            resolve(messages);
        } else {
            // Handle non-JSON response here (error or other format)
            console.error("Non-JSON response:", xhr.responseText);
            reject("Non-JSON response");
        }
        } else {
        console.error("Error updating chat history:", xhr.status);
        reject("Error fetching messages");
        }
    }
    };

    var url = `get_messages.php?sender_id=${encodeURIComponent(senderId)}&recipient_id=${encodeURIComponent(recipientId)}`;

    xhr.open("GET", url, true);
    xhr.send();
});
}

export { fetchMessages };
  

