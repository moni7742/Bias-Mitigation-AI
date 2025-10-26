import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os
from app.explainability import generate_shap  # ✅ absolute import

# Central path to save model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "trained_model.pkl")

def train_model(csv_path):
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"{csv_path} not found. Upload dataset first.")
    
    df = pd.read_csv(csv_path)

    if "target" not in df.columns:
        raise ValueError("CSV must contain a 'target' column for training.")

    X = df.drop("target", axis=1)
    y = df["target"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    joblib.dump(model, MODEL_PATH)
    print("✅ Trained model saved at:", MODEL_PATH)

    return model, {"accuracy": accuracy}

def predict_model(data):
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("trained_model.pkl not found. Train the model first.")

    model = joblib.load(MODEL_PATH)
    df = pd.DataFrame([data])

    prediction = model.predict(df)[0]

    try:
        shap_info = generate_shap(data)
        print("✅ SHAP plot generated at:", shap_info["shap_plot_path"])
    except Exception as e:
        print("⚠️ SHAP generation failed:", e)
        shap_info = None

    return {"prediction": int(prediction), "explainability": shap_info}
