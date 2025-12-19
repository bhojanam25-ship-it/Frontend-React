import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeProducts, addToCart } from "./Store";
import { toast } from "react-toastify";
import "./next.css";

function Home() {
  const dispatch = useDispatch();

  // ---------------- REDUX STATE ----------------
  const { homeItems, loading, error } = useSelector(
    (state) => state.home
  );

  // ---------------- HERO SLIDER ----------------
  const images = [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXFh0bFxcYFxseHhgdGhodGh4XHR8gHSggGx8lHRgaITEhJSkrLi4uGR8zODMtNygtLisBCgoKDg0OGxAQGy0lICUyMDAtLy0rLS8tLS0tNy0tLysvLy0tLS0tLS0tLS0tLTUtLS0tLS0tLS0tLS0tLS0tLf/AABEIAK8BIAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAgMEBQcBAAj/...",
    "https://img-cdn.publive.online/fit-in/960x720/filters:format(webp)/elle-gourmet-india/media/media_files/2025/04/30/L0Vlj0mMLb4ql52oACX0.png",
    "https://cdn6.singleinterface.com/files/enterprise/coverphoto/34404/KFC-Micro-Cover-1-15-09-25-12-16-24.png",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  // ---------------- FETCH HOME PRODUCTS ----------------
  useEffect(() => {
    dispatch(fetchHomeProducts());
  }, [dispatch]);

  // ---------------- STATIC DATA (COMMENTED) ----------------
  /*
  const dishes = [
    {
      name: "Chicken Dum Biryani",
      img: "...",
      price: "₹249",
    },
  ];
  */

  /*
  const categories = [
    { title: "Biryani", img: "..." },
    { title: "Pizza", img: "..." },
  ];
  */

  // ---------------- UI STATES ----------------
  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center" }}>{error}</h2>;

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-container">
        <img
          src={images[index]}
          className={`hero-img ${fade ? "fade-in" : "fade-out"}`}
          alt="banner"
        />

        <div className="hero-overlay"></div>

        <div className="hero-text">
          <h1>Welcome to Janasena Restaurant</h1>
          <p>Authentic • Fresh • Fast Delivery</p>
          <button className="order-btn">Order Now</button>
        </div>
      </div>

      {/* POPULAR DISHES FROM DB */}
      <div className="section">
        <h2 className="section-title">Popular Dishes</h2>

        <div className="dish-grid">
          {homeItems.map((item) => (
            <div className="dish-card" key={item._id || item.id}>
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <p className="price">{item.price}</p>

              <button
                className="btn btn-success btn-sm mt-auto"
                onClick={() => {
                  dispatch(addToCart(item));
                  toast.success(`${item.name} added to cart!`);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
