import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const OtpVerification = ({ email, onVerify, onResend, loading = false }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.trim().length !== 6) {
      setError('Please enter the 6-digit OTP sent to your email.');
      return;
    }

    setError('');
    await onVerify(otp.trim());
  };

  const handleResend = async () => {
    if (!onResend) return;

    setResending(true);
    try {
      await onResend();
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded" style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <h3 className="form-title mb-2">Verify your email</h3>
      <p className="mb-3" style={{ color: '#555' }}>
        Enter the 6-digit OTP sent to <strong>{email || 'your email'}</strong>.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter OTP"
            maxLength={6}
          />
          <label>One Time Password</label>
          {error && <small className="text-danger">{error}</small>}
        </div>

        <div className="login-btn">
          <button type="submit" className="signup" disabled={loading}>
            {loading ? <CircularProgress color="inherit" size={26} /> : 'Verify OTP'}
          </button>
        </div>
      </form>

      {onResend && (
        <div className="d-flex justify-content-end mt-2">
          <button type="button" className="btn btn-link p-0" onClick={handleResend} disabled={resending}>
            {resending ? 'Sending...' : 'Resend OTP'}
          </button>
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
