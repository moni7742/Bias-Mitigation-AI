import shap
import pandas as pd
import joblib
import matplotlib.pyplot as plt
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "trained_model.pkl")
SHAP_DIR = os.path.join(BASE_DIR, "shap_plots")
os.makedirs(SHAP_DIR, exist_ok=True)

def generate_shap(input_data):
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("trained_model.pkl not found. Train model first.")

    model = joblib.load(MODEL_PATH)
    df = pd.DataFrame([input_data])

    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(df)

    shap_plot_path = os.path.join(SHAP_DIR, "shap_summary.png")
    shap.summary_plot(shap_values, df, plot_type="bar", show=False)
    plt.savefig(shap_plot_path, bbox_inches="tight")
    plt.close()
    print("SHAP plot saved at:", shap_plot_path)

    feature_importances = dict(zip(df.columns, shap_values[0][0]))
    top_features = sorted(feature_importances.items(), key=lambda x: abs(x[1]), reverse=True)[:3]

    return {"top_influential_features": top_features, "shap_plot_path": shap_plot_path}
