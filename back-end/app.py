from flask import Flask, request, jsonify, make_response, Response, abort
from flask import redirect, url_for
app = Flask(__name__)

def App():
    print('hello from flask!')

@app.route('/api/flask/test', methods=['GET', 'POST'])
def test():
    return jsonify({'status':'ok'})
    
@app.route('/api/flask/', methods=['GET'])
def index():
    return "FLASK API is activated!"


if __name__ == '__main__':
     app.run(debug = True)