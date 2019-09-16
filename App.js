import React, { Component } from 'react';
import './App.css';

import {OutTable, ExcelRenderer} from 'react-excel-renderer';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null,
      errs: ''
    }
    this.fileuploder = this.fileuploder.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.InputFiles = React.createRef();
  }

  fileuploder(e){    
    if(e.target.files.length){
      let fileObj = e.target.files[0];
      let fileName = fileObj.name;
       if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
        this.setState({
          uploadedFileName: <span>{fileName}</span>,
          isFormInvalid: false,
          errs: ''
          });
          alert('File Upload Successfully')
        this.renderFile(fileObj)
      }    
      else{
        this.setState({
          errs: <span>Please Upload .xsls File Format</span>,
          uploadedFileName: ""
        })
      }
    }               
  }

  renderFile = (fileObj) => {
      //just pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          this.setState({
            dataLoaded: true,
            cols: resp.cols,
            rows: resp.rows
          });
        }
      }); 
  }

 

 
  render() {
    return (
      <div className="MainContent">
      <h2>Upload excel File and get data</h2>
          <div className="inputWidgets"> <input type="file" onChange={this.fileuploder} ref={this.InputFiles} />
          </div>
          <div className="Filename">{this.state.uploadedFileName} </div>   
          <div className="Errors">{this.state.errs} </div>

          <div className="DisplayData">
             {this.state.dataLoaded && <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="xslxData" /> }
           
          </div>

      </div>
    );
  }
}

export default App;