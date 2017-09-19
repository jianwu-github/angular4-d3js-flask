import logging, sys
from logging import StreamHandler
from time import strftime

from flask import Flask, request, send_from_directory

stdout_handler = StreamHandler(sys.stdout)
app_logger = logging.getLogger('__angular4_d3js_flask__')
app_logger.setLevel(logging.INFO)
app_logger.addHandler(stdout_handler)

app = Flask(__name__)

@app.route('/')
def hello_world():
    ts = strftime('[%Y-%b-%d %H:%M]')
    app_logger.info('%s default request received, path: /', ts)
    return 'Flask Server with Angular4 + D3.js v4 is up and running!'

@app.route('/<path:path>')
def send_angularapp(path):
    ts = strftime('[%Y-%b-%d %H:%M]')
    app_logger.info('%s request received, path: /%s', ts, path)
    return send_from_directory("angularapp/dist", path)

if __name__ == "__main__":
    app_logger.info("Starting app ...")
    app.run(host='0.0.0.0', debug = False)