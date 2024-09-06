import { useState } from "react";
import React from "react";

const InputField = ({ type, placeholder, icon }) => {
  // State to toggle password visibility
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? 'text' : type}
        placeholder={placeholder}
        className="input-field"
        required
      />
      <i className="material-symbols-rounded">{icon}</i>
      {type === 'password' && (
        <i onClick={() => setIsPasswordShown(prevState => !prevState)} className="material-symbols-rounded eye-icon">
          {isPasswordShown ? 'visibility' : 'visibility_off'}
        </i>
      )}
    </div>
  )
}

export default InputField;