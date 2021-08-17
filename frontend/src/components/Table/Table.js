import React,{Component} from 'react';

class Table extends Component{

    state={
        presentage:'',
        input:0,
        databaseNum:0
    }

    resultHandeler(){
        const {input,databaseNum} = this.state;
        let resul;
        console.log(input,databaseNum,resul)
        if(input>databaseNum){
            resul = (databaseNum/input)*100
        }else{
            resul = (input/databaseNum)*100
        }

        this.setState({
            presentage:resul
        })
    }
    
    selectHandler = async(e)=>{
        await this.setState({
            databaseNum: e.target.value
        })
        this.resultHandeler()
    }

    inputHandler= async(e)=>{
        await this.setState({
            input: e.target.value
        })
        this.resultHandeler()
    }

   
    render(){
        return(
            <div className="container mt-5 text-uppercase">
                <h2>percentage table</h2>
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Input</th>
                        <th scope="col">Choose</th>
                        <th scope="col">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td > <input onChange={this.inputHandler} type="number" className="form-control"></input> </td>
                        <td> 
                            <select onChange={this.selectHandler} className="form-control">
                                <option defaultValue>Choose...</option>
                                {this.props.numpers.map(numper=>(
                                    <option key={numper.id} value={numper.num}>{numper.num}</option>
                                ))}
                            </select>
                        </td>
                        <td>%{this.state.presentage}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.props.logoutHandling} className="btn btn-danger" style={{float: 'right'}}>Logout</button>
            </div>
        );
    }
}

export default Table;