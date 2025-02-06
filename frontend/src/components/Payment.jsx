// import React from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Payment = () => {
//   const { productId, farmerId, buyerId } = useParams();

//   const handlePayment = async () => {
//     const response = await axios.post("http://localhost:5000/api/payment/create", {
//       productId,
//       buyerId,
//       farmerId,
//       amount: 1000, // Change this dynamically
//     });

//     const { id, currency, amount } = response.data;

//     const options = {
//       key: "YOUR_RAZORPAY_KEY_ID",
//       amount,
//       currency,
//       name: "Farmers Marketplace",
//       description: "Payment for Product",
//       order_id: id,
//       handler: async function (response) {
//         alert("Payment Successful! Order Confirmed.");

//         await axios.post("http://localhost:5000/api/orders/update", {
//           productId,
//           buyerId,
//           status: "payment_successful"
//         });
//       },
//       prefill: {
//         name: "John Doe",
//         email: "john@example.com",
//         contact: "9999999999",
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div>
//       <h2>Complete Payment</h2>
//       <button onClick={handlePayment}>Pay Now</button>
//     </div>
//   );
// };

// export default Payment;
