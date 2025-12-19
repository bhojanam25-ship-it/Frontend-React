// src/About.jsx
import React from "react";
 function About() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 10px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#C1007E",
          }}
        >
          About PITHAPURAM MLA GARI RUCHULU
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "18px",
            color: "#444",
            marginBottom: "30px",
          }}
        >
          Serving authentic Biryanis & Indian delicacies since 1ST CENTURY.
        </p>

        {/* Image */}
        <img
          src="https://e7.pngegg.com/pngimages/884/997/png-clipart-connemara-community-radio-j-f-schwarzlose-rausch-eau-de-parfum-perfume-radio-electronics-text-thumbnail.png"
          alt="PITHAPURAM MLA GARI RUCHULU History"
          style={{
            width: "120px",
            maxWidth: "250px",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            marginBottom: "21px",
          }}
        />

        {/* About text */}
        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.6",
            color: "#333",
            padding: "0 10px",
          }}
        >
          PITHAPURAM MLA GARI RUCHULU is one of the most loved food brands known for its rich,
          aromatic Hyderabadi Dum Biryani and traditional Indian flavors.
          Founded over two decades ago, we have stayed committed to serving
          fresh, flavorful, and hygienic food at affordable prices.
          <br /><br />
          Our chefs follow traditional dum-cooking methods, using the finest
          basmati rice, herbs, spices, and fresh ingredients to ensure every
          dish carries an authentic touch of Hyderabad.
        </p>

        {/* Highlights Section */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "260px",
              padding: "20px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            <h3 style={{ margin: "0 0 10px", color: "#C1007E" }}>20+ Years</h3>
            <p style={{ margin: 0 }}>Of serving authentic taste</p>
          </div>

          <div
            style={{
              width: "260px",
              padding: "20px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            <h3 style={{ margin: "0 0 10px", color: "#C1007E" }}>50+ Dishes</h3>
            <p style={{ margin: 0 }}>Veg & Non-veg specialties</p>
          </div>

          <div
            style={{
              width: "260px",
              padding: "20px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            <h3 style={{ margin: "0 0 10px", color: "#C1007E" }}>10+ Branches</h3>
            <p style={{ margin: 0 }}>Growing across Hyderabad</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
