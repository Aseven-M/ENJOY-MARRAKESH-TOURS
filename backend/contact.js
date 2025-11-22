document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const phone = document.getElementById("contact-phone").value;
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-message").value;

    const text = `📬 Nouvelle demande via le site:\n\n👤 Nom: ${name}\n📧 Email: ${email}\n📞 Téléphone: ${phone}\n📌 Sujet: ${subject}\n📝 Message: ${message}`;

    const token = "7620896871:AAECTDPQeOF8R2IL3VdXK7qitSqyecp_yis";   // ← Replace with your bot token
    const chatId = "5534353190"; 

    const url = `https://api.telegram.org/bot${token}/sendMessage`; // Fixed: removed space after 'bot'

    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: text })
        });

        // Create and show success message div instead of alert
        showSuccessMessage();

        e.target.reset();
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});

function showSuccessMessage() {
    // Create overlay div
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 90%;
    `;

    // Add success icon/message
    messageDiv.innerHTML = `
        <div style="margin-bottom: 1.5rem; color: #24441B;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #F2D04E; margin: 0 auto;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </div>
        <h3 style="font-size: 1.5rem; font-weight: bold; color: #24441B; margin-bottom: 1rem;">Message envoyé avec succès !</h3>
        <p style="color: #666; margin-bottom: 2rem;">Nous vous répondrons dans les plus brefs délais.</p>
        <button id="success-ok-button" style="
            background: linear-gradient(135deg, #F2D04E 0%, #e0c03a 100%);
            color: #24441B;
            border: none;
            padding: 0.75rem 2rem;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(36, 68, 27, 0.2);
        ">OK</button>
    `;

    // Add elements to DOM
    overlay.appendChild(messageDiv);
    document.body.appendChild(overlay);

    // Close when OK button is clicked
    document.getElementById('success-ok-button').addEventListener('click', function() {
        document.body.removeChild(overlay);
    });

    // Also close when clicking outside the message box
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}