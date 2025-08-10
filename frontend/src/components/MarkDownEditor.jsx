import React from "react";
import MDEditor from "@uiw/react-md-editor";
import './MarkDownEditor.css'
export default function MarkDownEditor({ value, handleChange, disabled }) {
  const isDark = localStorage.getItem('theme')
  return (
    <div data-color-mode={isDark === 'dark'? 'dark' : 'light'}>
      <MDEditor
        value={value}
        onChange={(value) => handleChange({ target: { name: "content", value } })}
        height={400}
        disabled={disabled}
      />
    </div>
  );
}