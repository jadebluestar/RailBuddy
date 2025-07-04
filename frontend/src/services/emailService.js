import emailjs from '@emailjs/browser';

// ✅ Init your EmailJS key ONCE here.
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
// Or: emailjs.init('YOUR_PUBLIC_KEY');

const EMAIL_CONFIG = {
  serviceID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

// Send location + details with EmailJS
export const sendLocationEmail = async (emailData) => {
  try {
    const templateParams = {
      to_email: emailData.partnerEmail,
      to_name: emailData.partnerName,
      from_name: emailData.senderName || 'RailBuddy',
      current_location: emailData.location,
      google_maps_link: emailData.mapsLink,
      meeting_points: emailData.securePoints?.join('\n') || '',
      meeting_time: emailData.meetingTime,
      train_details: emailData.trainDetails || '',
      seat_exchange: emailData.seatExchange || '',
      contact_number: emailData.contactNumber || '',
      safety_tips: `
        🛡️ Safety Guidelines:
        • Meet in public, well-lit areas
        • Verify partner identity before meeting
        • Keep your ticket and ID ready
        • Inform someone about your meeting
      `
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceID,
      EMAIL_CONFIG.templateID,
      templateParams,
      EMAIL_CONFIG.publicKey
    );

    return { success: true, response };
  } catch (error) {
    console.error('EmailJS failed:', error);
    return { success: false, error };
  }
};

// Optional fallback: Formspree
export const sendEmailViaFormspree = async (emailData) => {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailData.partnerEmail,
        subject: 'RailBuddy - Meeting Details & Location',
        message: `
          Hello ${emailData.partnerName},

          📍 Location: ${emailData.location}
          🗺️ Google Maps: ${emailData.mapsLink}

          🚅 Train: ${emailData.trainDetails}
          💺 Seat Exchange: ${emailData.seatExchange}

          📞 Contact: ${emailData.contactNumber}
          ⏰ Meeting Time: ${emailData.meetingTime}

          🛡️ Secure Points:
          ${emailData.securePoints?.join('\n')}

          Safety Tips:
          • Meet in public, well-lit areas
          • Verify partner identity before meeting
          • Keep your ticket and ID ready
          • Inform someone about your meeting

          Safe travels!
          - RailBuddy Team
        `
      })
    });

    return { success: response.ok, response };
  } catch (error) {
    console.error('Formspree failed:', error);
    return { success: false, error };
  }
};
