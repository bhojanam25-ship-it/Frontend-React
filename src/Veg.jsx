import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchVegProducts } from "./Store";
import { toast } from "react-toastify";

function Veg() {
  const dispatch = useDispatch();

  // Fetch veg products
  useEffect(() => {
    dispatch(fetchVegProducts());
  }, [dispatch]);

  // Redux state
  const { vegItems, loading, error } = useSelector((state) => state.veg);

  const items = Array.isArray(vegItems) ? vegItems : [];

  // Pagination
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">Veg Menu</h2>

      {loading && (
        <p className="text-center text-info">Loading products...</p>
      )}

      {error && (
        <p className="text-danger text-center">{error}</p>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {currentItems.map((item) => {
          const discountValue =
            parseInt(item.discount?.replace("%", "")) || 0;

          const finalPrice =
            item.price - (item.price * discountValue) / 100;

          return (
            <div className="col d-flex" key={item.id}>
              <div className="card flex-fill shadow-sm">
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: 160, objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>

                  <p className="text-muted small">{item.desc}</p>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-decoration-line-through text-muted">
                      ₹{item.price}
                    </span>

                    <span className="fw-bold text-success">
                      ₹{finalPrice}
                    </span>

                    <span className="badge bg-danger">
                      {discountValue}% OFF
                    </span>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    className="btn btn-success btn-sm mt-auto"
                    onClick={() => {
                      dispatch(addToCart(item));

                      toast.success(
                        `🛒 ${item.name} added to cart!`,
                        {
                          position: "top-right",
                          autoClose: 2000,
                          pauseOnHover: true,
                          closeOnClick: true,
                        }
                      );
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Veg;
