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
import json


app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iucms'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://xgbua_happy_life:ez4aaz27kyz@195.234.4.56:5432/xgbua_happy_life'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:yjhlbxtcrbq@178.63.27.189:5432/admin'

db = SQLAlchemy()

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
    cmsName = db.Column(db.String(50))
    cmsBackgroundColor = db.Column(db.String(50))
    titleBackgroundColor = db.Column(db.String(50))
    titleTextColor = db.Column(db.String(50))
    cardBackgroundColor = db.Column(db.String(50))



with app.app_context():
    db.init_app(app)
    db.create_all()
    

@app.route('/api/flask/', methods=['GET'])
def index():
    return "FLASK API is activated!"

def signup_admin(username, password):
    with app.app_context():
        db.create_all()
        name = username
        password = password
        phone = '1'
        email='grushko.kpi@gmail.com'
        user = User.query.filter_by(admin=True).first() # if this returns a user, then the email already exists in database
        if user: 
            return 'alreadyExists'
        new_user = User(public_id=str(uuid.uuid4()), name=name, password=generate_password_hash(password, method='sha256'),phone=phone, email=email, admin=True)
        db.session.add(new_user)
        db.session.commit()
        return 'ok' 
        
signup_admin('grushko.kpi@gmail.com','1')

def signup_user(username,password):
     with app.app_context():
        db.create_all()
        name = username
        password = password
        phone = '2'
        email=username
        user = User.query.filter_by(name=name).first() # if this returns a user, then the email already exists in database
        if user: 
            return 'Already Exists'
        
        new_user = User(public_id=str(uuid.uuid4()), name=name, password=generate_password_hash(password, method='sha256'),phone=phone, email=email, admin=False)
        db.session.add(new_user)
        db.session.commit()
        return 'ok' 

signup_user('dumerion@gmail.com', '2')

@app.route('/api/flask/signup', methods=['GET', 'POST'])
#@cross_origin()
def signup():
    auth = request.authorization

    name=auth.username
    password=auth.password

    status = signup_user(name,password)
    return jsonify({'data' : status})

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
        isAdmin=False
        if not user.admin:
            isAdmin = False
        else:
            isAdmin = user.admin
        
        return jsonify({'data' : token.decode('UTF-8'), 'username':user.name, 'isAdmin':isAdmin})
    return jsonify({'data' : 'Could not verify'})


def token_required_for_downloads(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        token = request.args['x-access-token']
        if not token:
            return (jsonify({'message' : 'Token is missing!'}), 401)
        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return (jsonify({'message' : 'Token is invalid!'}), 401)
        return f(current_user, *args, **kwargs)
    return decorated
    
def saveExcelToDb(client_xlsx_file):
    data_df = pd.read_excel(client_xlsx_file, engine='openpyxl')
    for index, item in data_df.iterrows():
        cmsName = item['cmsName']
        cmsBackgroundColor = item['cmsBackgroundColor']
        titleBackgroundColor = item['titleBackgroundColor']
        titleTextColor = item['titleTextColor']
        cardBackgroundColor=item['cardBackgroundColor']

    settings={
        "CMS_NAME":cmsName,
        "CMS_BACKGROUND_COLOR":cmsBackgroundColor,
        "TITLE_BACKGROUND_COLOR":titleBackgroundColor, 
        "TITLE_TEXT_COLOR": titleTextColor,
        "CARD_BACKGROUND_COLOR":cardBackgroundColor,  }

    json_string = json.dumps(settings)
    current_directory=os.path.realpath(__file__)
    completeName = os.path.abspath(os.path.join(current_directory, '../../'))
    completeName=os.path.join(completeName, 'settings.json')
    
    with open(completeName, 'w') as outfile:
        outfile.write(json_string)
    
    new_settings = Settingscms(cmsName=cmsName, cmsBackgroundColor=cmsBackgroundColor, titleBackgroundColor=titleBackgroundColor, titleTextColor=titleTextColor, cardBackgroundColor=cardBackgroundColor)
    
    db.session.add(new_settings)
    db.session.commit()

    # # start bash that rebild frontend    
    # subprocess.call(['sh', './sh-scripts-admin/front-r.sh'])
    
    return jsonify({'cmsName':cmsName, 'cmsBackgroundColor':cmsBackgroundColor, 'titleBackgroundColor':titleBackgroundColor, 'titleTextColor':titleTextColor, 'cardBackgroundColor':cardBackgroundColor})

@app.route('/api/flask/excelCmsSettings', methods=['GET', 'POST'])
def excelToDatabase():
    client_xlsx_file = request.files['file']
    response = saveExcelToDb(client_xlsx_file)
    return response

@app.route('/api/flask/resetToFactorySettings', methods=['GET', 'POST'])
def resetToFactorySettings():
    current_directory=os.path.realpath(__file__)
    completeName = os.path.abspath(os.path.join(current_directory, '../../public'))
    completeName=os.path.join(completeName, 'DefaultSettingsCMS.xlsx')
    response = saveExcelToDb(completeName)
    return response

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

# @app.route("/")
# def home():
#     return "Hello, Flask!"

if __name__ == '__main__':
     app.run(debug = True)







# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:yjhlbxtcrbq@178.63.27.189:5432/admin'
# db = SQLAlchemy(app)


# class Usernew(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String, unique=True, nullable=False)
#     email = db.Column(db.String, unique=True, nullable=False)


# db.session.add(Usernew(username="Flask", email="example@example.com"))
# db.session.commit()

# users = Usernew.query.all()   







# from flask import Flask
# app = Flask(__name__)

# @app.route("/")
# def home():
#     return "Hello, Flask!"