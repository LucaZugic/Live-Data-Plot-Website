from flask import Flask, render_template, jsonify, request, make_response
import json
import requests
from time import sleep
from flask_apscheduler import APScheduler
from random import randint
from datetime import datetime


class Config:
    SCHEDULER_API_ENABLED = True


app = Flask(__name__)
app.config.from_object(Config())

scheduler = APScheduler()

scheduler.init_app(app)

global data
global timestamp
global x_range
global growth_rate
global data_usd


data = [1]
timestamp = [datetime.now().strftime("%H:%M")]


@scheduler.task('interval', id='update_data', seconds=1)
def update_data():
    data.append(data[-1]+1)
    current_time = datetime.now().strftime("%H:%M")
    timestamp.append(current_time)


scheduler.start()


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/update_plot', methods=['POST', 'GET'])
def update_plot():
    return jsonify(timestamp=timestamp, data=data)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=48000, debug=True)
