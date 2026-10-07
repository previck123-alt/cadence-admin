import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiDollarSign, FiSave, FiShield } from "react-icons/fi";
import styles from "./FeeSettings.module.css";
import { fetchTransferFee, updateTransferFee } from "../../../store/action/userAppStorage";

const FeeSettings = () => {
  const dispatch = useDispatch();
  const { color, transferFee } = useSelector((state) => state.userAuth);

  const [fee, setFee] = useState(
    Number.isFinite(Number(transferFee)) ? Number(transferFee) : 5
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const result = await dispatch(fetchTransferFee());

      if (result?.bool) {
        setFee(Number(result.message.transferFee));
      } else {
        setError(result?.message || "Unable to load transfer fee.");
      }

      setLoading(false);
    };

    load();
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const numericFee = Number(fee);

    if (!Number.isFinite(numericFee) || numericFee <= 0) {
      setError("Transfer fee must be greater than $0.00.");
      return;
    }

    setSaving(true);

    const result = await dispatch(updateTransferFee(numericFee));

    if (result?.bool) {
      const updatedFee = Number(result.message.transferFee);
      setFee(updatedFee);
      setMessage(`Transfer fee updated to $${updatedFee.toFixed(2)}.`);
    } else {
      setError(result?.message || "Unable to update transfer fee.");
    }

    setSaving(false);
  };

  return (
    <div
      className={styles.page}
      style={{ backgroundColor: color.background }}
    >
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <FiShield />
            Banking controls
          </div>
          <h1 style={{ color: color.importantText }}>Transfer Fee</h1>
          <p>
            Set the fee charged to a customer whenever a new transfer is
            submitted. The server applies this value automatically.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.cardIcon}>
            <FiDollarSign />
          </div>

          <div className={styles.cardHeading}>
            <h2>Transaction fee</h2>
            <p>
              This fee is added to the transfer amount and deducted from the
              customer's source account.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className={styles.label}>Fee amount (USD)</label>

            <div className={styles.moneyInput}>
              <span>$</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={loading ? "" : fee}
                onChange={(event) => setFee(event.target.value)}
                disabled={loading || saving}
                placeholder="5.00"
              />
            </div>

            <div className={styles.preview}>
              <div>
                <span>Customer sends</span>
                <strong>$1,000.00</strong>
              </div>
              <div>
                <span>Fee</span>
                <strong>${Number(fee || 0).toFixed(2)}</strong>
              </div>
              <div className={styles.total}>
                <span>Total deducted</span>
                <strong>${(1000 + Number(fee || 0)).toFixed(2)}</strong>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {message && <div className={styles.success}>{message}</div>}

            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading || saving}
            >
              <FiSave />
              {saving ? "Saving..." : "Save Transfer Fee"}
            </button>
          </form>
        </section>

        <aside className={styles.infoCard}>
          <span className={styles.infoLabel}>CURRENT FEE</span>
          <strong>${Number(fee || 0).toFixed(2)}</strong>
          <p>
            New transfers use the current value at the moment the customer
            confirms the transaction. Customers cannot submit their own fee
            amount from the frontend.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default FeeSettings;
