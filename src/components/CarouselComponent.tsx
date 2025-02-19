import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./CarouselComponent.module.css";

const CarouselComponent: React.FC = () => {
  useEffect(() => {
    import("bootstrap").then((bootstrap) => {
      const carouselElement = document.getElementById("authCarousel");
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 3000,
          ride: "carousel",
        });
      }
    });
  }, []);

  return (
    <div id="authCarousel" className={`carousel slide carousel-fade ${styles.carousel}`} data-bs-ride="carousel">
      <div className="carousel-indicators">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#authCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {["/images/carousel-1.png", "/images/carousel-1.png", "/images/carousel-1.png"].map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""} ${styles.carouselItem}`}>
            <img src={image} alt={`Carousel Slide ${index + 1}`} className="d-block w-100" />
            <div className={styles.overlay}>
              <h1 className={styles.title}>AGAM HIVE</h1>
              <p className={styles.subtitle}>
                Lorem ipsum dolor sit amet consectetur. Lorem posuere at odio nulla pulvinar enim consequat at vitae.
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#authCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#authCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
