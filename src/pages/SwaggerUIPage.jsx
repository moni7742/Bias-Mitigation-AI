import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function SwaggerUIPage() {
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: 20 }}>API Documentation</h2>
      <SwaggerUI url="http://localhost:8080/docs" /> {/* Replace with your backend Swagger URL */}
    </div>
  );
}

export default SwaggerUIPage;
