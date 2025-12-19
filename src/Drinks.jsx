// src/Drinks.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchDrinks } from "./Store";
import { toast } from "react-toastify";

function Drinks() {
  const dispatch = useDispatch();

  // Fetch drinks from backend
  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  // Get drinks state from Redux
  const { drinkItems, loading, error } = useSelector((state) => state.drinks);

  // Ensure we always have an array
  const items = Array.isArray(drinkItems) ? drinkItems : [];

  // Pagination setup
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const prevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">Cool Drinks</h2>

      {/* Loading & Error */}
      {loading && <p className="text-center text-info">Loading drinks...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Drinks Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {currentItems.map((item) => (
          <div className="col d-flex" key={item._id || item.id}>
            <div className="card card-hover flex-fill">
              <img
                src={item.img}
                className="card-img-top img-fluid"
                alt={item.name}
                style={{ height: 160, objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted small">{item.desc}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="fw-bold text-success">₹{item.price}</span>
                  <button
                    className="btn btn-primary btn-sm"
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
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination pagination-md">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={prevPage}>
                Previous
              </button>
            </li>

            {[...Array(totalPages).keys()].map((num) => (
              <li
                key={num}
                className={`page-item ${currentPage === num + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(num + 1)}>
                  {num + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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

export default Drinks;
