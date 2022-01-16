from flask import Flask, request, jsonify
from flask import send_from_directory

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, cast, or_, case
from sqlalchemy.dialects import postgresql
from sqlalchemy import create_engine
import os
import pandas as pd
from werkzeug.security import generate_password_hash, check_password_hash

from datetime import datetime
from datetime import timedelta
import jwt
import uuid

from functools import wraps

db = SQLAlchemy()
app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iucms'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://xgbua_happy_life:ez4aaz27kyz@195.234.4.56:5432/xgbua_happy_life'
db.init_app(app)

# user's table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    phone = db.Column(db.String(15))
    email = db.Column(db.String(100))
    address = db.Column(db.String(500))
    emarketTitle = db.Column(db.String(500))
    emarketKeywords = db.Column(db.String(500))
    admin = db.Column(db.Boolean)

class Settingscms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    projectName = db.Column(db.String(50))
    backgroundColor = db.Column(db.String(50))

with app.app_context():
        db.create_all()
    

@app.route('/api/flask/', methods=['GET'])
def index():
    return "FLASK API is activated!"

def signup_admin(username, password):
    with app.app_context():
        db.create_all()
        name = username
        password = password
        phone = '2'
        email='grushko.kpi@gmail.com'
        user = User.query.filter_by(admin=True).first() # if this returns a user, then the email already exists in database
        if user: 
            return 'alreadyExists'
        new_user = User(public_id=str(uuid.uuid4()), name=name, password=generate_password_hash(password, method='sha256'),phone=phone, email=email, admin=True)
        db.session.add(new_user)
        db.session.commit()
        return 'ok' 
        
signup_admin('admin2','2')

@app.route('/api/flask/login', methods=['GET', 'POST'])
#@cross_origin()
def login():
    auth = request.authorization
    email=auth.username
    if not auth or not email or not auth.password:
        return jsonify({'data' : 'No email or password'})
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'data' : 'user not found'})
    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.utcnow() + timedelta(minutes=300)}, app.config['SECRET_KEY'])
        isAdmin = user.admin
        return jsonify({'data' : token.decode('UTF-8'), 'username':user.name, 'isAdmin':isAdmin})
    return jsonify({'data' : 'Could not verify'})


def token_required_for_downloads(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # get x-access-token
        token = request.args['x-access-token']
        # if there is no token
        if not token:
            return (jsonify({'message' : 'Token is missing!'}), 401)
        try: 
            # decode token
            data = jwt.decode(token, app.config['SECRET_KEY'])
            # get current user
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return (jsonify({'message' : 'Token is invalid!'}), 401)
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/api/flask/excelProjectSettings', methods=['GET', 'POST'])
def excelToDatabaseProducts():
    client_xlsx_file = request.files['file']
    data_df = pd.read_excel(client_xlsx_file, engine='openpyxl')
    for index, item in data_df.iterrows():
        projectName = item['cms_name']
        backgroundColor = item['background_color']
    
    new_settings = Settingscms(projectName=projectName, backgroundColor=backgroundColor)
    db.session.add(new_settings)
    db.session.commit()

    # # start bash that rebild frontend    
    # subprocess.call(['sh', './sh-scripts-admin/front-r.sh'])
    
    return jsonify({'cmsName':projectName, 'backgroundColor':backgroundColor})


@app.route('/api/flask/favicon', methods=['GET', 'POST'])
def saveFavicon():
    favicon = request.files['file']
    current_directory=os.path.realpath(__file__)
    completeName = os.path.abspath(os.path.join(current_directory, '../../public'))
    completeName=os.path.join(completeName, 'favicon.ico')
    favicon.save(completeName)

    return jsonify({'status':200})

@app.route('/api/flask/bgImage', methods=['GET', 'POST'])
def saveBackground():
    bgImage = request.files['file']
    current_directory=os.path.realpath(__file__)
    completeName = os.path.abspath(os.path.join(current_directory, '../../public/images'))
    completeName=os.path.join(completeName, 'background.png')
    bgImage.save(completeName)

    return jsonify({'status':200})

@app.route('/api/flask/setupDownload', methods=['GET', 'POST'])
@token_required_for_downloads
# #@cross_origin()
def SetupDownload(name):
    # get cureent file directory
    basedir = os.path.abspath(os.path.dirname(__file__))
    # path = os.path.join(basedir, "../public/")
    # sqlalchemy connection to postgres db
    # sql_engine = create_engine('postgres://xgbua_smdb:aebb56257nm@postgres17.1gb.ua:5432/xgbua_smdb')
    sql_engine = create_engine('postgres://xgbua_happy_life:ez4aaz27kyz@195.234.4.56:5432/xgbua_happy_life')
    # let's make sql query with py pandas
    results = pd.read_sql_query('select * from Settingscms', sql_engine)

    results.to_excel( os.path.join(basedir, 'SettingsCMS.xlsx'))
    return send_from_directory(basedir, 'SettingsCMS.xlsx', attachment_filename='SettingsCMS.xlsx')


if __name__ == '__main__':
     app.run(debug = True)