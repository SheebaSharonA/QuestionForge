import google.generativeai as genai
from flask import Flask, jsonify,request


app = Flask(__name__)

# Configure the API key
#genai.configure(api_key="AIzaSyDpgK_d96krbbWf38abC1RnHyMUMMHTVS0")



def generate(data):
    # Initialize the model
    model = genai.GenerativeModel('gemini-pro')  # Or 'gemini-1.5-flash'

    # Generate content
    prompt = f"generate only one short interview question for{data}"
    response = model.generate_content(prompt)
    return response.text if response else "No response from Gemini"

def analyseAnswer(question,answer):
    # Initialize the model
    model = genai.GenerativeModel('gemini-pro')  # Or 'gemini-1.5-flash'

    # Generate content
    prompt = f"analyse this {answer} given for this {question} and give a brief review of it"
    response = model.generate_content(prompt)
    return response.text if response else "No response from Gemini"


@app.route('/getQuestion', methods=['POST'])
def getQuestion():
    data = request.get_json(force=True)

    if "job" not in data:
        return jsonify({"error": "Job field is required"}), 400
    data = data.get("job","")
    res = generate(data)
    return jsonify({"generated":res}),201

@app.route('/analyse',methods=['POST'])
def analyse():
    data = request.get_json(force=True)
    question = data.get("question","")
    answer = data.get("answer","")
    if "question" not in data or "answer" not in data:
        return jsonify({"error": "Question and answer fields are required"}), 400
    res = analyseAnswer(question,answer)
    return jsonify({"analysis":res}),200
@app.route('/')
def hello_world():
    return jsonify({"generated": generate("doctor")})


if __name__ == '__main__':
    app.run()
