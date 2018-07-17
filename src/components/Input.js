import React from 'react';

const Input = (props) => {
    return (
            <div className="input-group input-group-sm mb-3">
                <select  onChange={props.input} className="custom-select mr-sm-2">
                    {props.allLines.map((line, index) => {
                        return  <option key={index} value={line.code}>{line.name}</option>
                    })}
                </select>
                <select  onChange={props.input2} className="custom-select mr-sm-2">
                    {props.allStation.map((station, index) => {
                        return <option key={index} value={station.name}>{station.name}</option>
                    })}
                </select>
                <button onClick={props.btnF} className="btn btn-primary">GO !</button>
            </div>
    )
}

export default Input;