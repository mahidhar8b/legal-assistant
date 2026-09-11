from fastapi import FastAPI
import joblib
import os
import pandas as pd

app = FastAPI(
    title="Legal Case Prediction API",
    description="Machine Learning API for legal case outcome prediction",
    version="1.0"
)


# =========================================================
# LOAD TRAINED MODEL
# =========================================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "models",
    "legal_case_outcome_model.pkl"
)

model = joblib.load(MODEL_PATH)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Legal Case Prediction API is running"
    }


# =========================================================
# PREDICTION
# =========================================================

@app.post("/predict")
def predict_case(case: dict):

    # Create input DataFrame
    input_data = pd.DataFrame([{
        "case_type": case["caseType"],
        "legal_category": case["legalCategory"],
        "court": case["court"],
        "year": case["year"],
        "case_duration_months": case["caseDurationMonths"],
        "previous_status": case["previousStatus"]
    }])


    # Make prediction
    prediction = model.predict(input_data)

    predicted_outcome = str(prediction[0])


    # =====================================================
    # CALCULATE CONFIDENCE
    # =====================================================

    confidence = None

    if hasattr(model, "predict_proba"):

        probabilities = model.predict_proba(input_data)

        confidence = float(probabilities.max() * 100)


    # =====================================================
    # RESPONSE
    # =====================================================

    return {
        "predictedOutcome": predicted_outcome,
        "confidence": round(confidence, 2) if confidence is not None else None
    }