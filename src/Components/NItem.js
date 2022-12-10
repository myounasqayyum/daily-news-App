import React from "react";

const NItem = (props) => {
  let { title, discription, imageurl, newsurl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <span
          className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
          style={{ left: "80%", zIndex: 1 }}
        >
          {source}
        </span>
        <img
          src={
            !imageurl
              ? "https://media.istockphoto.com/vectors/breaking-news-background-vector-id1264074047?k=20&m=1264074047&s=612x612&w=0&h=uMWPkMBKIIx3NdCbvGkfOY0oYXULdpU_-1ggACLAx7A= "
              : imageurl
          }
          className="card-img-top"
          alt="This News Has No Photos"
        />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{discription}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknow" : author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsurl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NItem;
