from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

app = Flask(__name__)

# Initialize Groq client
client = Groq(api_key=os.getenv('GROQ_API_KEY'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/book-test')
def book_test():
    return render_template('book-test.html')



@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/chatbot')
def chatbot():
    return render_template('test_chat.html')

@app.route('/test')
def test():
    return render_template('test_chat.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Create chat completion with Groq
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant for Manya Diagnostic Center. Provide helpful, concise responses about medical services, appointments, and general healthcare information."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=1024,
            temperature=0.7,
        )
        
        response = completion.choices[0].message.content
        
        return jsonify({'response': response})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to generate response'}), 500

if __name__ == '__main__':
    # Use context context for local dev, though app runs on 5000 by default
    app.run(debug=True)
