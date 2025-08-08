import React from "react";
import MDEditor from "@uiw/react-md-editor";
import './MarkDownEditor.css'
export default function MarkDownEditor({ value, handleChange, disabled }) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(value) => handleChange({ target: { name: "content", value } })}
        height={400}
        disabled={disabled}
      />
    </div>
  );
}