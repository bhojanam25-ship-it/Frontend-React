// src/Order.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "./Store";

function Order() {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(
    (state) => state.getOrders
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="container mt-4">

      <h2 className="text-primary fw-bold mb-4">📦 Your Orders</h2>

      {/* Loading */}
      {loading && (
        <div className="alert alert-info text-center fs-5">
          Loading orders...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger text-center fs-5">
          {error.message || error}
        </div>
      )}

      {/* If no orders */}
      {!loading && (!orders || orders.length === 0) && (
        <div className="alert alert-warning text-center fs-5">
          No orders found!
        </div>
      )}

      {/* Orders List */}
      {orders && orders.map((order) => (
        <div key={order._id} className="card shadow mb-4 p-3">

          <h4 className="text-success fw-bold">
            Order ID: <span className="text-dark">{order._id}</span>
          </h4>

          <p className="text-muted">
            <strong>Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </p>

          <h5 className="fw-bold text-primary mt-3">Items:</h5>

          <ul className="list-group">

            {order.items.map((item, i) => (
              <li key={i} className="list-group-item d-flex align-items-center">

                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />

                <div className="flex-grow-1">
                  <h6 className="fw-bold">{item.name}</h6>
                  <p className="mb-0 text-muted">Qty: {item.quantity}</p>
                  <p className="mb-0 text-muted">Price: ₹{item.price}</p>
                </div>

                <span className="fw-bold text-success fs-5">
                  ₹ {item.quantity * item.price}
                </span>

              </li>
            ))}

          </ul>

          {/* Total Amount */}
          <div className="mt-3 text-end">
            <h4 className="fw-bold text-danger">Total: ₹{order.totalAmount}</h4>
          </div>

        </div>
      ))}

    </div>
  );
}

export default Order;
