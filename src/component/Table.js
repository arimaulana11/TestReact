import React, { Component } from 'react';
import './Table.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data:null
    };
  }

  componentDidMount(){
    fetch(`https://apiapps.bareksa.com/web/v1/mutualfund/products`)
    .then(response => {
      if (response.status === 200) {
        // if we get the result, return json
        return response.json()
      } else {
        // if the status is not OK, return empty array
        return []
      }
    })
    .then(responseJson => {
      if(responseJson.success){
        this.setState({
          data:responseJson.data
        })
      }
    }, fail => console.log(fail))
    .catch(error => {
      console.error(error)
    })
  }

  removeRow(k){
    let dataRow = this.state.data
    delete dataRow[k]
    this.setState({data:dataRow})
  }

  render() {
    return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">isin_code</th>
              <th scope="col">nav_date</th>
              <th scope="col">nav_value</th>
              <th scope="col">return.oneday</th>
              <th scope="col">aum.value_idr</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            { this.state.data ? this.state.data.map((value, k) => 
              <tr key={value['id']}>
                <th scope="row">{k}</th>
                <td>{value['isin_code']}</td>
                <td>{value['nav_date']}</td>
                <td>{value['nav_value']}</td>
                <td className={Number(value['return']['oneday']) < 0 ? "merah" : "hijau" }> {Number(value['return']['oneday']) }</td>
                <td>{value['aum']['value_idr']}</td>
                <td><button type="button" className="btn btn-danger" onClick={() => this.removeRow(k)}>Delete</button></td>
              </tr>
              ) : null}
          </tbody>
        </table>
    );
  }
}

export default Table;
