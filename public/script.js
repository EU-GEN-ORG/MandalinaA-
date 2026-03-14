const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const btn = document.getElementById('send-btn');

async function sendMessage() {
    const prompt = input.value.trim();
    if (!prompt) return; // Boşsa gönderme

    // Kullanıcı mesajını ekrana yaz (sağa yaslı)
    appendMessage('Siz', prompt, 'user-msg');
    input.value = ''; // Giriş alanını temizle

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error(`Sunucu Hatası: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.text) {
            // MandalinaAİ mesajını ekrana yaz (sola yaslı)
            appendMessage('MandalinaAİ', data.text, 'ai-msg');
        } else {
            appendMessage('Sistem', "Boş bir cevap döndü.", 'error-msg');
        }
    } catch (error) {
        console.error("Hata Detayı:", error);
        appendMessage('Sistem', "MandalinaAİ şu an bir çekirdeğe takıldı: " + error.message, 'error-msg');
    }
}

function appendMessage(sender, text, className) {
    const div = document.createElement('div');
    div.className = `message ${className}`;
    
    // M3 tarzında mesaj içeriğini ekliyoruz (innerText güvenlidir)
    const body = document.createElement('span');
    body.innerText = text; // HTML olarak çalıştırma
    body.style.whiteSpace = "pre-wrap"; 
    
    div.appendChild(body);
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter tuşuyla da gönderilebilmesi için:
input.addEventListener('keypress', (e) => {
    // Eğer Enter tuşuna basıldıysa ve shift tuşu basılı değilse gönder
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Varsayılan enter davranışını (yeni satır) engelle
        sendMessage();
    }
});

btn.addEventListener('click', sendMessage);