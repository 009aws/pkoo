// Professional local logic AI chatbot for website

document.addEventListener('DOMContentLoaded', function() {
  try {
    const chatBox = document.getElementById('chat-box');
    const input = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // Check if chatbot elements exist
    if (!chatBox || !input || !sendBtn) {
      console.warn('Chatbot elements not found on this page');
      return;
    }
    
    console.log('Chatbot initialized successfully');

  // Helper for timestamp
  function getTime() {
    const d = new Date();
    return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  // Show professional welcome message on load
  if (chatBox && chatBox.children.length === 0) {
    addBotMessage(`Hi, I'm PK. How can I help you today?`);
  }

  // Add message with avatar and timestamp
  function addMessage(sender, text, isBot) {
    const msgDiv = document.createElement('div');
    msgDiv.className = isBot ? 'bot-msg' : 'user-msg';
    msgDiv.innerHTML = `
      <div class="msg-bubble">
        <span class="avatar">${isBot ? '<img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Sales Assistant" style="width:32px;height:32px;border-radius:50%;vertical-align:middle;margin-right:4px;object-fit:cover;"> PK' : '🧑'}</span>
        <span class="msg-text">${text}</span>
        <span class="msg-time">${getTime()}</span>
      </div>
    `;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  function addBotMessage(text) { addMessage('PK', text, true); }
  function addUserMessage(text) { addMessage('You', text, false); }

  // Typing indicator
  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'bot-msg typing';
    typing.id = 'typing-indicator';
    typing.innerHTML = `<div class="msg-bubble"><span class="avatar"><img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Sales Assistant" style="width:32px;height:32px;border-radius:50%;vertical-align:middle;margin-right:4px;object-fit:cover;"> PK</span><span class="msg-text"><i>PK is typing...</i></span></div>`;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  function hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) chatBox.removeChild(typing);
  }

  let lastVisaPrompt = false;
  function getBotReply(message) {
    const msg = message.toLowerCase();
    // Visa follow-up logic
    if (msg.includes('renewal')) return "For UAE visa renewal, we handle all paperwork and government procedures to ensure a smooth, fast process. Please let us know your visa type (family, employment, etc.) for more details or visit our office for personalized help. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    if (msg.includes('application')) return "For UAE visa application, we guide you through every step: document preparation, form filling, and submission. Tell us your visa type (family, employment, investor, etc.) for tailored assistance. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    if (msg.includes('cancellation')) return "For UAE visa cancellation, we provide complete support to close your visa officially and avoid any legal issues. Let us know your visa type and we’ll guide you through the process. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    // Business setup follow-up logic
    if (msg.includes('trade license')) return "We handle all aspects of trade license processing, from documentation to submission and follow-up with authorities. Let us know your business type for step-by-step help. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    if (msg.includes('company formation')) return "Our experts manage the entire company formation process, including legal paperwork, approvals, and registration. Tell us your business activity and location for tailored guidance. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    if (msg.includes('pro service')) return "We offer full PRO (Public Relations Officer) services for government paperwork, renewals, and approvals to keep your business running smoothly. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    // Document clearing follow-up logic
    if (msg.includes('attestation')) return "We provide fast and reliable attestation for all documents, including educational, personal, and commercial papers. Let us know your document type for more info. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    if (msg.includes('translation')) return "We offer certified translation services for legal, business, and personal documents in Arabic and English. Share your document type for a quote. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    if (msg.includes('legalization')) return "Our team handles legalization of documents for official use in the UAE and abroad. Tell us your document type for personalized support. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    // Typing services follow-up logic
    if (msg.includes('arabic typing')) return "We provide professional Arabic typing services for all document types, ensuring accuracy and proper formatting. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    if (msg.includes('english typing')) return "Our team offers expert English typing services for business, legal, and personal documents. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    if (msg.includes('form filling')) return "We assist with filling all types of government and business forms, making the process quick and error-free. If you need to know more, please <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>contact us on WhatsApp (0547313286)</a>.";
    // General greetings
    if (msg.includes('hello') || msg.includes('hi')) return "Hello! How can I assist you today?";
    // About page
    if (msg.includes('about') || msg.includes('who are you') || msg.includes('company')) return "Infosoft Typing & Documentation Clearing has been a trusted name in the UAE since 1996, offering reliable documentation, business setup, and transaction services. We are committed to professionalism, transparency, and punctuality. Our expert team ensures comprehensive and specialized services for all your needs.";
    // Services page
    if (msg.includes('service') || msg.includes('offer') || msg.includes('what do you do') || msg.includes('solutions')) return "We offer a wide range of services: Visa Typing, Government Transactions, Document Clearing & Attestation, Typing Services, Business Setup, Company Formation, PRO services, and more. Visit our Services page for full details.";
    // Visa
    if (msg.includes('visa')) {
      lastVisaPrompt = true;
      return "We specialize in all types of UAE visa services: application, renewal, cancellation, and guidance for individuals and companies. Let us know which visa service you need help with!";
    }
    // Business setup
    if (msg.includes('business setup') || msg.includes('company formation') || msg.includes('pro services')) return "Yes! We offer complete business setup, company formation, trade license processing, and PRO services for new and existing companies in the UAE.";
    // Document clearing
    if (msg.includes('document') && (msg.includes('clear') || msg.includes('attest') || msg.includes('translate'))) return "We provide fast and reliable document clearing, attestation, translation, and legalization services for all types of documents.";
    // Typing services
    if (msg.includes('typing')) return "Our professional typing services cover legal, business, and personal documents in both Arabic and English.";
    // Blogs/news
    if (msg.includes('blog') || msg.includes('news')) return "Check out our Blogs & News section for the latest updates, guides, and insights for business, documentation, and government services in the UAE. You can also tap on any blog image for a visual effect!";
    // About contact
    if (msg.includes('contact') || msg.includes('reach you') || msg.includes('get in touch')) return "You can contact us via <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>WhatsApp</a>, phone <a href='https://wa.me/971547313286' target='_blank' style='color:#25d366;text-decoration:none;'>0547313286</a>, email <a href='mailto:infotyping1120@gmail.com' style='color:#003366;text-decoration:none;'>infotyping1120@gmail.com</a>, or the form on our Contact page. We're always happy to help!";
    // Address/location
    if (msg.includes('location') || msg.includes('address') || msg.includes('where are you')) return "Our office is in the UAE. Please see the Contact page for our full address and map.";
    // Working hours
    if (msg.match(/\b(open|working) hours?\b/) || msg.includes('timing') || msg.includes('when are you open') || msg.includes('office hours')) return "Our working hours are 10:00am–2:00pm and 5:00pm–10:00pm, Monday to Saturday. We are closed on Sundays.";
    // Pricing
    if (msg.includes('price') || msg.includes('cost') || msg.includes('charge') || msg.includes('fee')) return "Our pricing is tailored to your needs. Please visit our Services section or contact us for a quote.";
    // Thanks
    if (msg.includes('thanks') || msg.includes('thank you')) return "You're most welcome! If you need anything else, just ask.";
    // Default fallback
    return "I'm sorry, I didn't quite understand that. Could you please rephrase or ask something else?";
  }
  window.getBotReply = getBotReply;

  sendBtn.addEventListener('click', function() {
    const message = input.value.trim();
    if (!message) return;
    addUserMessage(message);
    input.value = '';
    showTyping();
    setTimeout(() => {
      hideTyping();
      addBotMessage(getBotReply(message));
    }, 700);
  });

    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') sendBtn.click();
    });
    
  } catch (error) {
    console.error('Error initializing chatbot:', error);
  }
});
