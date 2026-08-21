import React from "react";
import { Studio } from "sanity";
import config from "../../../sanity.config";

export default function SanityStudioEmbed() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Studio config={config} />
    </div>
  );
}
