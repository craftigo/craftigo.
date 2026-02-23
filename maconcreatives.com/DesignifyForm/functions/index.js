const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure using: firebase functions:config:set gmail.email="you@gmail.com" gmail.pass="app-password"
const gmailEmail = functions.config().gmail.email;
const gmailPass = functions.config().gmail.pass;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPass
  }
});

exports.onOrderCreate = functions.region('asia-south1').firestore.document('orders/{orderId}')
  .onCreate(async (snap, ctx) => {
    const order = snap.data();
    const subject = `New Order from ${order.buyerName} — ₹${order.subtotal}`;
    let html = `<h2>New order received</h2>
      <p><strong>Buyer:</strong> ${order.buyerName} (${order.buyerEmail})</p>
      <p><strong>Subtotal:</strong> ₹${order.subtotal}</p>
      <h3>Items</h3>
      <ul>`;
    order.items.forEach(i=>{
      html += `<li>${i.title} x ${i.qty} — ₹${i.price*i.qty}</li>`;
    });
    html += `</ul><p>Payment method: ${order.payment?.method || 'N/A'}</p>
      <p>Payment Uri: ${order.payment?.paymentUri || ''}</p>
      <p>Order ID: ${ctx.params.orderId}</p>
    `;
    const mailOptions = {
      from: gmailEmail,
      to: "craftigo.1@gmail.com", // company email
      subject,
      html
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent to company');
    } catch (err) {
      console.error('Error sending mail', err);
    }
  });
