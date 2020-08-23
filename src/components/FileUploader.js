
  
import React,{Component} from 'react'; 

  
class FileUploader extends Component { 

    constructor(props){
        super(props);

        this.state = {

          selectedFile: null

        };
    }
   
     
    // On file select (from the pop up) 
    onFileChange = event => { 
     
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
     
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = (e) => { 

        if(this.state.selectedFile != null){

          var fileReader = new FileReader();
          fileReader.readAsArrayBuffer(this.state.selectedFile);



          const body = {
            'fileName':this.state.selectedFile.name,
            'fileType':this.state.selectedFile.type,
            'data': fileReader.result

          }

          this.props.handleFileUpload(body);
     
        }
    }; 
     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
     
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } 
    }; 
     
    render() {
      

      return ( 
        <div> 
            <div> 
                <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
            </div> 
          {this.fileData()} 
        </div> 
      ); 

      
    } 
} 

export default FileUploader;