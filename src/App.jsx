import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
import './App.css'
import Component from './Component';

function App() {
  const [uppy, setUppy] = useState(null);

  useEffect(() => {
    const uppyInstance = new Uppy({
      id: 'uppy',
      autoProceed: true,
      restrictions: {
        maxFileSize: 100 * 1024 * 1024, // 100MB
        maxNumberOfFiles: 1,
        allowedFileTypes: ['video/*'],
      },
    }).use(AwsS3Multipart, {
      limit: 4, // 4 concurrent uploads
      companionUrl: 'http://localhost:3000', // Your companion server URL
    });

    setUppy(uppyInstance);

    return () => uppyInstance.close();
  }, []);

  return (
    <div>
      <Component/>
    </div>
  );
}

export default App
