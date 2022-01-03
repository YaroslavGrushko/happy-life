from flask import Flask, request, jsonify

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, cast, or_, case
from sqlalchemy.dialects import postgresql
from sqlalchemy import create_engine
import os
import pandas as pd

db = SQLAlchemy()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://xgbua_happy_life:ez4aaz27kyz@195.234.4.56:5432/xgbua_happy_life'
db.init_app(app)

class ProjectSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    projectName = db.Column(db.String(50))
    newProjectName = db.Column(db.String(50))

with app.app_context():
        db.create_all()
    

@app.route('/api/flask/', methods=['GET'])
def index():
    return "FLASK API is activated!"


@app.route('/api/flask/getProjectPath')
def getProjectPath():
    newProjectName='happy-life2'
    dir_path = os.path.dirname(os.path.realpath(__file__))
    projectPath = os.path.abspath(os.path.join(dir_path, '../'))
    newProjectPath = os.path.abspath(os.path.join(dir_path, '../../', newProjectName))
    new_project_settings = ProjectSettings(projectName=projectPath, newProjectName=newProjectPath)
    db.session.add(new_project_settings)
    db.session.commit()

    return jsonify({'projectPath':projectPath, 'newProjectPath':newProjectPath})


@app.route('/api/flask/renameProjectPath')
def rename():
    projectSettings = ProjectSettings.query.one()
    projectPath = projectSettings.projectName
    newProjectPath = projectSettings.newProjectName
    os.rename(projectPath, newProjectPath)
    
    return jsonify({'status': 200})


@app.route('/api/flask/excelProjectSettings', methods=['GET', 'POST'])
def excelToDatabaseProducts():
    client_xlsx_file = request.files['file']
    data_df = pd.read_excel(client_xlsx_file, engine='openpyxl')
    for index, item in data_df.iterrows():
        projectName = item['cms_name']
 
    # # start bash that rebild frontend    
    # subprocess.call(['sh', './sh-scripts-admin/front-r.sh'])
    
    return jsonify({'cmsName':projectName})


@app.route('/api/flask/favicon', methods=['GET', 'POST'])
def saveFavicon():
    favicon = request.files['file']
    current_directory=os.path.realpath(__file__)
    completeName = os.path.abspath(os.path.join(current_directory, '../../public'))
    completeName=os.path.join(completeName, 'favicon.ico')
    favicon.save(completeName)

    return jsonify({'status':200})


if __name__ == '__main__':
     app.run(debug = True)