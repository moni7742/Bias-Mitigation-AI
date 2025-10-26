from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.responses import HTMLResponse
import pandas as pd
import os
import traceback

from app.models import train_model, predict_model
from app.bias_metrics import calculate_fairness
from app.explainability import generate_shap

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Upload dataset
@app.post("/upload-data")
async def upload_data(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)
    df.to_csv("uploaded_dataset.csv", index=False)
    return {"message": "Dataset uploaded successfully", "rows": len(df)}

# Train model
@app.post("/train-model")
def train():
    try:
        model, metrics = train_model("uploaded_dataset.csv")
        return {"message": "Model trained", "accuracy": metrics["accuracy"]}
    except Exception as e:
        print(traceback.format_exc())
        return {"error": str(e)}

# Predict
@app.post("/predict")
def predict(data: dict):
    try:
        prediction = predict_model(data)
        fairness = calculate_fairness(prediction)
        explanation = generate_shap(data)
        return {"prediction": prediction, "fairness": fairness, "explanation": explanation}
    except Exception as e:
        print(traceback.format_exc())
        return {"error": str(e)}

# Serve SHAP plot
@app.get("/get-shap-plot")
def get_shap_plot():
    shap_plot_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "shap_plots", "shap_summary.png")
    if os.path.exists(shap_plot_path):
        return FileResponse(shap_plot_path, media_type="image/png")
    else:
        return {"error": "SHAP plot not found. Run a prediction first."}
    

# Home route with styled HTML
@app.get("/", response_class=HTMLResponse)
def home():
    return """
    <html>
        <head>
            <title>Bias Mitigation AI Backend</title>
            <style>
                body { 
                    background: linear-gradient(to right, #74ebd5, #acb6e5); 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding-top: 50px;
                    color: #333;
                }
                h1 { color: #fff; font-size: 48px; }
                p { color: #fff; font-size: 24px; }
                a { color: #ffd700; text-decoration: none; font-weight: bold; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <h1>🚀 Bias Mitigation in AI</h1>
            <p>Backend is running successfully!</p>
            <p>Test the API using <a href="/docs">Swagger UI</a></p>
        </body>
    </html>
    """
# Health check route
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is healthy"}

