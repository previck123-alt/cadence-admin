import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiDollarSign, FiSave, FiRefreshCw } from "react-icons/fi";
import styles from "./TransferFee.module.css";
import DashboardHeader from "../../../component/userscreencomp/dashboardNav";
import DashboardDrawer from "../../../component/userscreencomp/Drawer";
import Sidebar from "../../../component/adminscreencomp/sidebar";

const API_URL = "http://localhost:8082";

const TransferFee = () => {
  const { adminToken, color } = useSelector((state) => state.userAuth);
  const [fee, setFee] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const headers = {
    "Content-Type": "application/json",
    header: `${adminToken}`,
  };

  const loadFee = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/transfer-fee`, { headers });
      const data = await response.json();
      if (!response.ok) throw new Error(data.response || "Unable to load transfer fee.");
      setFee(Number(data.response?.transferFee ?? 0).toFixed(2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveFee = async (e) => {
    e.preventDefault();
    const value = Number(fee);
    if (!Number.isFinite(value) || value < 0) {
      setError("Enter a valid fee greater than or equal to $0.00.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/transfer-fee`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ transferFee: value }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.response || "Unable to update transfer fee.");
      const saved = Number(data.response?.transferFee ?? value);
      setFee(saved.toFixed(2));
      setMessage(`Transfer fee updated to $${saved.toFixed(2)}. New transfers will use this fee.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const showmenuHandler = () => {
    const drawer = document.querySelector(".drawerCon");
    if (drawer) drawer.classList.toggle("showdrawer");
  };

  return (
    <div className={styles.dashboard} style={{ background: color?.background }}>
      <div className={styles.sidebar}><Sidebar status="Transfer Fee" /></div>
      <div className={styles.main}>
        <DashboardDrawer showmenuHandler={showmenuHandler} />
        <DashboardHeader showmenuHandler={showmenuHandler} headerTitle="Transfer Fee" />

        <main className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.icon}><FiDollarSign /></div>
            <div>
              <h1>Transfer Fee</h1>
              <p>Set the fee charged on every successful transfer.</p>
            </div>
          </div>

          <form className={styles.card} onSubmit={saveFee}>
            <div className={styles.info}>
              <span>Current transfer fee</span>
              <strong>{loading ? "Loading…" : `$${Number(fee || 0).toFixed(2)}`}</strong>
            </div>

            <label>Fee amount (USD)</label>
            <div className={styles.inputWrap}>
              <span>$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                placeholder="5.00"
                disabled={loading || saving}
              />
            </div>

            <p className={styles.example}>
              Example: a $1,000.00 transfer with a $5.00 fee deducts $1,005.00 from the sender's account.
            </p>

            {error && <div className={styles.error}>{error}</div>}
            {message && <div className={styles.success}>{message}</div>}

            <div className={styles.actions}>
              <button type="button" className={styles.refresh} onClick={loadFee} disabled={loading || saving}>
                <FiRefreshCw /> Refresh
              </button>
              <button type="submit" className={styles.save} disabled={loading || saving}>
                <FiSave /> {saving ? "Saving…" : "Save Transfer Fee"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default TransferFee;
