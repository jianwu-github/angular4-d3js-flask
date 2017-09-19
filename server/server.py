import logging, sys
import json
from logging import StreamHandler

from flask import Flask, send_from_directory

app = Flask(__name__)
app.config.update(DEBUG=False, TESTING=False)

@app.route('/')
def server_root():
    app.logger.info("received default request")
    return 'Flask Server with Angular4 + D3.js v4 is up and running!'

@app.route('/hello')
def hello_world():
    app.logger.info("received REST API call")
    return json.dumps({'hello': 'world'})

@app.route('/<path:path>')
def send_angularapp(path):
    app.logger.info("received front-end page request")
    return send_from_directory("angularapp/dist", path)

if __name__ == "__main__":
    stdout_handler = StreamHandler(sys.stdout)
    stdout_handler.setLevel(logging.INFO)

    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    stdout_handler.setFormatter(formatter)

    app.logger.addHandler(stdout_handler)

    app.run(host='0.0.0.0')