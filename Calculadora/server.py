from flask import Flask, request, jsonify
import statcalc as sc
import simulator as sim

testarr2:list = [5,5,5,5,5]
testarr3:list = [[8,8.9,8.1,8.6,8.2], [5,5.6,6.1,5.9,5.2], [4.1,4.6,3.1,3.9,4.2]]
unbarr:list = [0.1, 0.01, 0.01]
optiontest:int = 3
timetest:float = 1000

app = Flask(__name__)

@app.route('/stat', methods=['POST'])
def receive_data():
    data = request.json
    statobj = sc.StatCalc(data["eq"], data["unb"], data["data"], data["lb"], data["ub"])
    # Process the received data
    print(f"Received data: {data}")
    simdata = statobj.send()
    response_data = {
        "stats": simdata,
    }
    return jsonify(response_data)

@app.route('/sim', methods=['POST'])
def receive_data():
    data = request.json
    simobj = sim.Simulator(data["har"], data["wave"], data["t"], data["nrg"], data["op"])
    # Process the received data
    print(f"Received data: {data}")
    sympy_plot = simobj.send()

    response_data = {
        "sympy_plot": sympy_plot
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
