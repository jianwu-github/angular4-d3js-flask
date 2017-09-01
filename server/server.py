from flask import Flask, request, send_from_directory

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/<path:path>')
def send_angularapp(path):
    return send_from_directory("angularapp/dist", path)

if __name__ == "__main__":
    app.run(host='0.0.0.0')