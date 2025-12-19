import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchNonVegProducts } from "./Store";
import { toast } from "react-toastify";

function Nonveg() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNonVegProducts());
  }, [dispatch]);

  const { nonVegItems, loading, error } = useSelector(
    (state) => state.nonveg
  );

  const items = Array.isArray(nonVegItems) ? nonVegItems : [];

  // Pagination
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">Non-Veg Menu</h2>

      {loading && (
        <p className="text-center text-info">Loading products...</p>
      )}

      {error && (
        <p className="text-danger text-center">{error}</p>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {currentItems.map((item) => {
          const discountValue =
            parseInt(item.discount?.toString().replace("%", "")) || 0;

          const finalPrice =
            item.price - (item.price * discountValue) / 100;

          return (
            <div className="col d-flex" key={item._id}>
              <div className="card card-hover flex-fill">
                <img
                  src={item.img}
                  className="card-img-top img-fluid"
                  alt={item.name}
                  style={{ height: 160, objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">{item.name}</h5>
                  <p className="card-text text-muted small mb-2">
                    {item.desc}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted text-decoration-line-through">
                      ₹{item.price}
                    </span>

                    <span className="fw-bold text-primary">
                      ₹{finalPrice}
                    </span>

                    <span className="badge bg-danger">
                      {discountValue}% OFF
                    </span>
                  </div>

                  <button
                    className="btn btn-success btn-sm mt-auto"
                    onClick={() => {
                      dispatch(addToCart(item));
                      toast.success(`🛒 Product ${item.name} added successfully!`, {
                                      position: "top-right",
                                      autoClose: 2000,
                                       closeOnClick: true,
                                      pauseOnHover: true,
                                    });
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

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination pagination-md">
            <li
              className={`page-item ${
                currentPage === 1 ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={prevPage}>
                Previous
              </button>
            </li>

            {[...Array(totalPages).keys()].map((num) => (
              <li
                key={num}
                className={`page-item ${
                  currentPage === num + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(num + 1)}
                >
                  {num + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={nextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Nonveg;
