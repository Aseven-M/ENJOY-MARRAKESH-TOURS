
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email2").value.trim();
  const phone = document.getElementById("phone2").value.trim();
  const guests = document.getElementById("guests").value.trim();
  const date = document.getElementById("date").value.trim();
  const requests = document.getElementById("requests").value.trim();

  if (!fullname || !email || !phone) {
    showCustomMessage("❌ Veuillez remplir tous les champs obligatoires (Nom, Email, Téléphone).", "error");
    return;
  }

  const text = `
🌴 *NOUVELLE RÉSERVATION — 1 DAYS MARRAKECH-AIT BENHADDOU-MARRAKECH*

👤 *Nom complet:* ${fullname}
📧 *Email:* ${email}
📞 *Téléphone:* ${phone}
👥 *Nombre de voyageurs:* ${guests}
📅 *Date de départ:* ${date ? new Date(date).toLocaleDateString('fr-FR') : 'Non spécifiée'}
📝 *Demandes spéciales:*
${requests || "Aucune"}

📩 _Envoyé depuis le site web_
  `.trim();

  const token = "7620896871:AAECTDPQeOF8R2IL3VdXK7qitSqyecp_yis";
  const chatId = "5534353190";
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const submitBtn = e.target.querySelector("button[type='submit']");
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = "⏳ Envoi en cours...";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown"
      })
    });

    const result = await response.json();

    if (result.ok) {
      showCustomMessage(" Votre demande a été envoyée avec succès ! Nous vous contacterons très bientôt.", "success");
      e.target.reset();
    } else {
      showCustomMessage(` Erreur : ${result.description}`, "error");
    }
  } catch (error) {
    showCustomMessage("❌ Une erreur est survenue. Veuillez réessayer plus tard.", "error");
    console.error("Erreur réseau :", error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
});

// ✅ Unified overlay function (same style as first script)
function showCustomMessage(message, type = "info") {
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

  messageDiv.innerHTML = `
    <div style="margin-bottom: 1.5rem; color: #24441B;">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #F2D04E; margin: 0 auto;">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <h3 style="font-size: 1.5rem; font-weight: bold; color: #24441B; margin-bottom: 1rem;">${message}</h3>
    <p style="color: #666; margin-bottom: 2rem;">Nous vous répondrons dans les plus brefs délais.</p>
    <button id="custom-message-ok" style="
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

  overlay.appendChild(messageDiv);
  document.body.appendChild(overlay);

  document.getElementById('custom-message-ok').addEventListener('click', function () {
    document.body.removeChild(overlay);
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}
