import React from "react";

import SkeletonLoader from "tiny-skeleton-loader-react";

function SkeletonCard({ col }) {
  return Array.apply(null, { length: 3 }).map((e, i) => (
    <tr key={i}>
      {Array.apply(null, { length: col }).map((e, i) => (
        <td key={i}>
          <SkeletonLoader />
        </td>
      ))}
    </tr>
  ));
}

export default SkeletonCard;
