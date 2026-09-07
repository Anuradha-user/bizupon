
import { useRef } from "react";

const OtpInput = ({
  value,
  setValue,
  length = 4,
  disabled = false,
}) => {
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const input = e.target.value.replace(/\D/g, "");

    const otp = [...value];

    if (!input) {
      otp[index] = "";
      setValue(otp);
      return;
    }

    otp[index] = input[0];
    setValue(otp);

    // Move to next input
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace
    if (e.key === "Backspace") {
      if (value[index]) {
        const otp = [...value];
        otp[index] = "";
        setValue(otp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    // Arrow Left
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Arrow Right
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pastedData) return;

    const otp = Array(length).fill("");

    pastedData.split("").forEach((digit, index) => {
      otp[index] = digit;
    });

    setValue(otp);

    // Focus last pasted input
    const focusIndex =
      Math.min(pastedData.length, length) - 1;

    if (focusIndex >= 0) {
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
    >
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="mx-2"
        >
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            value={value[index] || ""}
            disabled={disabled}
            maxLength={1}
            inputMode="numeric"
            autoComplete="one-time-code"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="form-control text-center otp-input"
            style={{
              width: "46px",
              height: "52px",
              borderRadius: "12px",
              fontSize: "20px",
              fontWeight: 700,
              padding: 0,
              color: "#33363D",
              border: "1px solid #D9D9D9",
              transition: "all 0.2s ease",
              boxShadow: "none",
            }}
          />
        </div>
      ))}

      {/* OTP Input Styles */}
      <style>
        {`
          .otp-input:hover {
            border-color: #2AAA31 !important;
          }

          .otp-input:focus {
            border-color: #2AAA31 !important;
            border-width: 2px !important;
            background-color: #F7FFF8 !important;
            box-shadow: none !important;
            outline: none !important;
          }

          .otp-input:disabled {
            background-color: #F5F5F5 !important;
            border-color: #D9D9D9 !important;
            cursor: not-allowed;
          }

          .otp-input:disabled:hover {
            border-color: #D9D9D9 !important;
          }

          @media (max-width: 576px) {
            .otp-input {
              width: 42px !important;
              height: 48px !important;
              font-size: 18px !important;
            }

            .otp-input + * {
              margin-left: 4px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default OtpInput;

