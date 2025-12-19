// SendOrderEmail.jsx
import React from "react";
import emailjs from "@emailjs/browser";

function SendOrderEmail({ cartItems, netAmount, tax, totalAmount, customerEmail }) {
  
  const sendEmail = () => {
    const templateParams = {
      orders: cartItems.map(item => ({
        name: item.name,
        units: item.quantity,
        price: item.price,
        image_url: item.img,
      })),
      order_id: Date.now(),
      totalamount: totalAmount.toFixed(2),
      tax: tax.toFixed(2),
      netamount: netAmount.toFixed(2),
      email: customerEmail,
    };

    emailjs
      .send(
        "service_er7kqfj",       // ✔ your service ID
        "template_50j1quc",      // ✔ your template ID
        templateParams,
        "y8TxNiZ0PNi7fimza"      // ✔ your public key
      )
      .then((response) => {
        alert("Email sent successfully!",response.status, response.text);

      })
    
  };

  return (
    <>
      <button onClick={sendEmail}>Send Order Email</button>
    </>
  );
}

export default SendOrderEmail;
