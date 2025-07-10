import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://threatmorph-ai.onrender.com/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#2d2246] to-[#B095FF]">
      <div className="bg-black/80 border border-[#B095FF] p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Glow effect */}
        <div
          className="absolute -inset-2 rounded-2xl pointer-events-none blur-2xl opacity-40 z-0"
          style={{
            background: 'radial-gradient(circle, #B095FF55 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10">
          <h2
            className="text-3xl font-extrabold text-center mb-6 text-[#B095FF] drop-shadow-[0_2px_16px_rgba(176,149,255,0.18)]"
            style={{
              fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
              letterSpacing: '0.06em',
            }}
          >
            Sign in to ThreatMorph.ai
          </h2>
          <p className="text-center text-gray-300 mb-8 text-sm">
            Secure, AI-powered cloud threat detection. Enter your credentials to
            access your dashboard.
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-[#B095FF] bg-black/60 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B095FF] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-[#B095FF] bg-black/60 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B095FF] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#B095FF] text-black font-bold p-3 rounded-full hover:bg-[#a57eff] transition-all shadow-md hover:shadow-[#B095FF]/30"
            >
              Login
            </button>
          </form>
          <div className="mt-8 text-center text-gray-400 text-xs">
            <span>
              By logging in, you agree to our{' '}
              <a
                href="/terms"
                className="text-[#B095FF] underline"
              >
                Terms
              </a>{' '}
              and{' '}
              <a
                href="/privacy"
                className="text-[#B095FF] underline"
              >
                Privacy Policy
              </a>
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
