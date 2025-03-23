import React from "react";

const Newsitem = ({ title, description, imageurl, newsurl, author, date, source }) => {
  return (
    <div>
      <div className="card mb-4">
        <span
          className="badge text-bg-danger position-absolute top-0 end-0 m-2 p-1"
          style={{ fontSize: "0.75rem", zIndex: 1 }}
        >
          {source}
        </span>

        <img
          src={imageurl ? imageurl : "https://via.placeholder.com/150"}
          className="card-img-top"
          alt="News" style={{height:"150px",objectFit:"cover"}}
        />
        <div className="card-body">
          <h5 className="card-title">{title.slice(0,19)}...</h5>
          <p className="card-text">{description.slice(0,49)}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              Author:{author ? author : "Unknown"} <br /> Updated on {new Date(date).toLocaleDateString()}
            </small>
          </p>
          <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
