// src/Cart.jsx

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removefromcart,
} from "./Store";

import { placeOrder } from "./Store";   // ✅ ADDED

import CuponApply from "./CuponApply";
import SendOrderEmail from "./SendOrderEmail";

// QR
import { QRCodeCanvas } from "qrcode.react";

// Router
import { useNavigate } from "react-router-dom";

// Toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// SweetAlert2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function Cart() {
  const Cartitems = useSelector((state) => state.cart);
  const { discount, applied } = useSelector((state) => state.coupon);

  // ✅ ADDED ORDER SELECTOR (as per slide)
  const { loading, error, successMessage } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [manualDiscount, setManualDiscount] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");

  const [showQR, setShowQR] = useState(false);

  // Total calculations
  const totalAmount = Cartitems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const finalDiscount = applied ? discount : manualDiscount;
  const discountAmount = (totalAmount * finalDiscount) / 100;

  const amountAfterDiscount = totalAmount - discountAmount;
  const gst = amountAfterDiscount * 0.18;
  const netAmount = amountAfterDiscount + gst;

  // UPI details
  const upiID = "6301523342@ybl";
  const upiName = "Samudrala Rajkumar";

  const upiLink =
    `upi://pay?pa=${upiID}` +
    `&pn=${upiName}` +
    `&am=${netAmount}` +
    `&cu=INR`;

  // -------------------------------------------------------------------
  // ✅ TEACHER SLIDE CODE (order dispatch logic)
  // -------------------------------------------------------------------
  let handleCheckout = () => {
    // take the order details
    const orderData = {
      items: Cartitems,
      totalAmount: totalAmount,
      orderDate: new Date(), // today's date
    };

    // dispatch the order details to thunk
    dispatch(placeOrder(orderData));

    // KEEP your SweetAlert + navigate
    Swal.fire({
      title: "Payment Successful!",
      html: `<p>Thank you for your order.</p>
             <p><strong>Total Paid:</strong> ₹${netAmount.toFixed(2)}</p>`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/Order");
    });
  };
  // -------------------------------------------------------------------

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary fw-bold">🛒 Your Cart</h2>

      {Cartitems.length === 0 ? (
        <div className="alert alert-warning text-center fs-5">
          Your cart is empty!
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <ul className="list-group shadow mb-4">
            {Cartitems.map((item) => (
              <li key={item.id} className="list-group-item d-flex">
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />

                <div className="flex-grow-1">
                  <h5 className="fw-semibold">{item.name}</h5>
                  <p className="mb-0 text-muted">ID: {item.id}</p>
                </div>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => dispatch(decreaseQuantity(item))}
                  >
                    -
                  </button>

                  <span className="badge bg-primary mx-2 fs-6">
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => dispatch(increaseQuantity(item))}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-danger btn-sm ms-3"
                  onClick={() => {
                    dispatch(removefromcart(item));
                    toast.error(
                      `Product ${item.name} removed successfully...`,
                      {
                        position: "top-right",
                        closeOnClick: true,
                        autoClose: 3000,
                        pauseOnHover: true,
                      }
                    );
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Coupon */}
          <CuponApply />

          {/* Bill Details */}
          <div className="card shadow p-4">
            <h4 className="text-primary fw-bold mb-3">🧾 Bill Details</h4>

            <label className="fw-semibold">Choose Discount</label>
            <div className="d-flex gap-2 mb-3">
              {[10, 20, 30, 50].map((d) => (
                <button
                  key={d}
                  className={`btn ${
                    manualDiscount === d ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setManualDiscount(d)}
                >
                  {d}%
                </button>
              ))}
            </div>

            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Total Amount</th>
                  <td>₹ {totalAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Discount ({finalDiscount}%)</th>
                  <td>₹ {discountAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Amount After Discount</th>
                  <td>₹ {amountAfterDiscount.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>GST (18%)</th>
                  <td>₹ {gst.toFixed(2)}</td>
                </tr>
                <tr className="table-success fw-bold fs-4">
                  <th>Net Amount</th>
                  <td>₹ {netAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Email Input */}
            <div className="mt-4">
              <h4>📧 Enter Email</h4>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            {/* Send Order Email */}
            <SendOrderEmail
              cartItems={Cartitems}
              netAmount={netAmount}
              tax={gst}
              totalAmount={totalAmount}
              customerEmail={customerEmail}
            />

            {/* Show QR */}
            <button
              onClick={() => setShowQR(true)}
              className="btn btn-primary w-100 fw-bold py-2 mt-3"
            >
              Scanner (Pay Now)
            </button>

            {/* QR Code */}
            {showQR && (
              <div className="card text-center mt-4 p-4 border-primary shadow-sm">
                <h2 className="text-primary fw-bold mb-3">Scan to Pay</h2>
                <h3 className="text-success fw-semibold mb-3">
                  Total Amount: ₹{netAmount.toFixed(2)}
                </h3>
                <QRCodeCanvas value={upiLink} size={250} className="mx-auto" />
              </div>
            )}

            {/* Checkout */}
            <button
              className="btn btn-success w-100 fw-bold py-2 mt-3"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Cart;
