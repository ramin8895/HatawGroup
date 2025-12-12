"use client";
import styles from "./AwardHero.module.css";
import { useEffect, useState } from "react";

export default function AwardHero() {
  const [time, setTime] = useState({
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 23
  });

  const [code, setCode] = useState("");

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (!code.trim()) return alert("Please enter your code.");
    alert("Your code: " + code);
    setCode("");
  };

  return (
    <div className={styles.hero}>
      <div className={styles.content}>

        <h1>🏆 Hataw Award Challenge</h1>

        <div className={styles.prize}>$900</div>

        <p>
          Watch 180 educational videos over 30 days, collect hidden codes, 
          earn points, and compete for cash prizes!
        </p>

        {/* Countdown */}
        <div className={styles.timer}>
          <div className={styles.item}>
            <span className={styles.number}>{time.days}</span>
            <span className={styles.label}>Days</span>
          </div>

          <div className={styles.item}>
            <span className={styles.number}>{time.hours}</span>
            <span className={styles.label}>Hours</span>
          </div>

          <div className={styles.item}>
            <span className={styles.number}>{time.minutes}</span>
            <span className={styles.label}>Minutes</span>
          </div>

          <div className={styles.item}>
            <span className={styles.number}>{time.seconds}</span>
            <span className={styles.label}>Seconds</span>
          </div>
        </div>

        <p className={styles.bonus}>
          🎁 First 500 participants get 3,000 bonus points!
        </p>

        {/* 🔵 Code Input Section */}
        <div className={styles.codeBox}>
          <input
            type="text"
            placeholder="Enter your code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.codeInput}
          />
          <button onClick={handleSubmit} className={styles.submitBtn}>
            Submit Code
          </button>
        </div>

      </div>
    </div>
  );
}
