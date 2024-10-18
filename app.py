from config import create_app
from database import db
from routes import init_routes

app = create_app()
db.init_app(app)

with app.app_context():
    db.create_all() 

init_routes(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7070, debug=True)
