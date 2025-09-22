import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        axios.post('http://localhost:8002/cream/upload', formData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    };
    
    return (
        <div>
            <input type="file" onChange={handleFileInput} />
            <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImageUpload;
