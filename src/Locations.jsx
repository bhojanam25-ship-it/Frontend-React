import React from "react";

function Locations() {
  const locations = [
    {
      name: "PITHAPURAM MLA GARI RUCHULU - Ameerpet",
      address: "Ameerpet, Hyderabad",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.620734803374!2d78.44374387472176!3d17.43751308345107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c3e52d5a13%3A0xbad623fbb7a58bd!2sAmeerpet%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1700000000000"
    },
    {
      name: "PITHAPURAM MLA GARI RUCHULU - Gachibowli",
      address: "Gachibowli, Hyderabad",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.949226231222!2d78.34980737471993!3d17.440082183446035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e3b8379f3f%3A0x7c8fddc5e7f1b1b9!2sGachibowli%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1700000000001"
    }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-2">Our Locations</h2>
      <p className="text-center text-muted mb-4">
        Find our outlets near you.
      </p>

      <div className="row g-4">
        {locations.map((loc, index) => (
          <div className="col-md-6" key={index}>
            <div className="card shadow border-0 h-100">
              <div className="card-body">
                <h4 className="card-title fw-semibold">{loc.name}</h4>
                <p className="card-text text-muted">{loc.address}</p>

                {/* Google Map Embed */}
                <div className="ratio ratio-16x9 mt-3">
                  <iframe
                    src={loc.map}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                    title={loc.name}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Locations;
