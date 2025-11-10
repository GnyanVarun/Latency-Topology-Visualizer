"use client";
import React from "react";

export default function Legend() {
  const legendItems = [
    { color: "orange", label: "AWS Cloud / Exchange" },
    { color: "lightgreen", label: "GCP Cloud / Exchange" },
    { color: "skyblue", label: "Azure Cloud / Exchange" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        background: "rgba(0,0,0,0.6)",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        fontSize: "0.9rem",
      }}
    >
      <strong>Legend</strong>
      {legendItems.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "4px",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: item.color,
            }}
          ></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
