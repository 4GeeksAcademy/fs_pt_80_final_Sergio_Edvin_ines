import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "../../styles/checkoutform.css";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = ({ totalAmount }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

    

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads with the dynamic totalAmount
    fetch(process.env.BACKEND_URL + '/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('Token') 
      },
      body: JSON.stringify({ amount: totalAmount * 100, currency: 'eur' }) // Amount in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret)); 
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!clientSecret) {
      console.error("Missing clientSecret, payment cannot be processed.");
      return;
    }
  

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      },
    );

    setLoading(false);


    {/* starting)*/}
    
    if (error) {
      console.log('[error]', error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
      console.log(paymentIntent);
    
  {/* fetch(/payment-succeeded)*/}

  fetch(process.env.BACKEND_URL + '/api/payment-succeeded', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Token'),
    },
    body: JSON.stringify({
      amount: totalAmount * 100,
    }),
  })
  .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Redirect to order success page
          navigate("/order-success", { state: { amount: totalAmount, paymentIntentId: paymentIntent.id } });
        })
        .catch((err) => console.error("Error in fetch", err));
    } else {
      console.log("Payment failed");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="stripey">
      <CardElement />
      <button className="btn-stripe" type="submit" disabled={!stripe || loading}>
        <strong>Pay</strong>
      </button>
    </form>
  );
};
