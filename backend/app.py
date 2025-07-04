from flask import Flask, request, jsonify
import fitz  # PyMuPDF
import spacy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(file):
    doc = fitz.open(stream=file.read(), filetype="pdf")
    return " ".join([page.get_text() for page in doc])

@app.route("/analyze", methods=["POST"])
def analyze_resume():
    resume_file = request.files["resume"]
    job_description = request.form["job_description"]

    resume_text = extract_text_from_pdf(resume_file)
    resume_doc = nlp(resume_text.lower())
    job_doc = nlp(job_description.lower())

    resume_tokens = {token.text for token in resume_doc if token.is_alpha}
    job_tokens = {token.text for token in job_doc if token.is_alpha}

    matched = resume_tokens & job_tokens
    match_score = round(len(matched) / len(job_tokens) * 100, 2) if job_tokens else 0

    return jsonify({
        "match_score": match_score,
        "common_keywords": sorted(matched),
        "missing_keywords": sorted(job_tokens - matched)
    })

if __name__ == "__main__":
    app.run(debug=True)
