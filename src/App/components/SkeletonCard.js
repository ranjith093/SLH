import React from "react";
import { Col } from "react-bootstrap";
import SkeletonLoader from "tiny-skeleton-loader-react";

function SkeletonCard() {
  return Array.apply(null, { length: 3 }).map((e, i) => (
    <Col key={i} md={6} xl={4} className="mb-4" style={{ marginTop: "20px" }}>
      <SkeletonLoader height={125} width="100%" />
    </Col>
  ));
}

export default SkeletonCard;
