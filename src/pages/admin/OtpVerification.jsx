
import { useEffect, useState } from "react";
import OtpInput from "./OtpInput";

const OtpVerification = ({
  email,
  onVerify,
  onResend,
  loading = false,
}) => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (seconds === 0) {
      setError("OTP has expired. Please resend the code.");
      return;
    }

    if (!otpValue) {
      setError("Please enter the verification code.");
      return;
    }

    if (otpValue.length !== 4) {
      setError("OTP must be 4 digits.");
      return;
    }

    setError("");
    onVerify(otpValue);
  };

  const handleResend = async () => {
    setResending(true);

    try {
      await onResend();

      setOtp(Array(4).fill(""));
      setError("");
      setSeconds(60);
    } finally {
      setResending(false);
    }
  };

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  const progress = (seconds / 60) * 100;

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="d-flex flex-column gap-3">

        {/* ================= HEADER ================= */}
        <div className="d-flex align-items-center justify-content-center gap-3">
          
          {/* Email Icon */}
          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: "42px",
              height: "42px",
              backgroundColor: "#EAF8EE",
            }}
          >
            <i
              className="bi bi-envelope-check-fill"
              style={{
                fontSize: "21px",
                color: "#2AAA31",
              }}
            />
          </div>

          <h2
            className="m-0 text-center"
            style={{
              fontWeight: 700,
              fontSize: "26px",
              color: "#33363D",
            }}
          >
            Verify your email
          </h2>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div>
          <p
            className="mb-0"
            style={{
              fontSize: "14px",
              lineHeight: "1.5",
              color: "#6B7280",
            }}
          >
            Enter the 4-digit verification code sent to{" "}
            <strong style={{ color: "#33363D" }}>
              {email}
            </strong>
          </p>
        </div>

        {/* ================= TIMER ================= */}
        <div className="d-flex flex-column align-items-center gap-1">

          <div
            className="position-relative"
            style={{
              width: "56px",
              height: "56px",
            }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              className="position-absolute top-0 start-0"
              style={{
                transform: "rotate(-90deg)",
              }}
            >
              {/* Background */}
              <circle
                cx="28"
                cy="28"
                r="23"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="5"
              />

              {/* Progress */}
              <circle
                cx="28"
                cy="28"
                r="23"
                fill="none"
                stroke="#2AAA31"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 23}
                strokeDashoffset={
                  2 *
                  Math.PI *
                  23 *
                  (1 - progress / 100)
                }
                style={{
                  transition: "stroke-dashoffset 1s linear",
                }}
              />
            </svg>

            {/* Timer Text */}
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#333",
                }}
              >
                {minutes}:{remainingSeconds}
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: "11px",
              lineHeight: "1",
              color: "#6B7280",
            }}
          >
            Time Left
          </span>
        </div>

        {/* ================= OTP ================= */}
        <OtpInput
          value={otp}
          setValue={(value) => {
            setOtp(value);
            setError("");
          }}
          disabled={seconds === 0}
        />

        {/* ================= ERROR ================= */}
        {error && (
          <div
            className="text-danger"
            style={{
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* ================= DIGIT COUNTER ================= */}
        {seconds > 0 && (
          <div
            style={{
              fontSize: "14px",
              color: "#6B7280",
            }}
          >
            {otp.join("").length} / 4 digits entered
          </div>
        )}

        {/* ================= VERIFY BUTTON ================= */}
        {seconds > 0 && (
          <button
            type="submit"
            disabled={loading}
            className="btn w-100 d-flex align-items-center justify-content-center gap-2 border-0"
            style={{
              marginTop: "8px",
              height: "56px",
              borderRadius: "12px",
              fontSize: "17px",
              fontWeight: 700,
              color: "#fff",
              background:
                loading
                  ? "#CFCFCF"
                  : "linear-gradient(90deg,#29b410,#38c21d)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  style={{
                    width: "24px",
                    height: "24px",
                    borderWidth: "3px",
                  }}
                />
              </>
            ) : (
              <>
                <i className="bi bi-check-circle fs-5" />
                Verify Email
              </>
            )}
          </button>
        )}

        {/* ================= RESEND ================= */}
        {seconds === 0 && (
          <div className="d-flex flex-column gap-2">

            <p
              className="mb-0"
              style={{
                fontSize: "14px",
                color: "#6B7280",
              }}
            >
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="btn p-0 border-0 bg-transparent d-flex align-items-center gap-2"
              style={{
                width: "fit-content",
                color: "#2AAA31",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {resending ? (
                <span
                  className="spinner-border spinner-border-sm"
                  style={{
                    width: "18px",
                    height: "18px",
                    color: "#2AAA31",
                  }}
                />
              ) : (
                <i className="bi bi-arrow-repeat fs-5" />
              )}

              {!resending && "Resend Code"}
            </button>
          </div>
        )}

        {/* ================= EXPIRED ALERT ================= */}
        {seconds === 0 && (
          <div
            className="alert alert-warning mb-0 w-100"
            style={{
              borderRadius: "8px",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            Your verification code has expired. Please click{" "}
            <strong>Resend Code</strong> to receive a new OTP.
          </div>
        )}
      </div>
    </form>
  );
};

export default OtpVerification;

