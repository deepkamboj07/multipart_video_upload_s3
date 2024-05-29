import React, { useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import {Dashboard} from '@uppy/react';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
import GoogleDrive from '@uppy/google-drive';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';


function Component() {
	// IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.

    const [uppy, setUppy] = useState(() => null);
  useEffect(() => {
    const uppyInstance = new Uppy({
      autoProceed: true,
      restrictions: {
        maxFileSize: 100 * 1024 * 1024, // 100MB
        maxNumberOfFiles: 1,
        allowedFileTypes: ['video/*'],
      },
    }).use(AwsS3Multipart, {
      companionUrl: 'http://localhost:3000/courseVideoUploadAws', // Your companion server URL
    })

    uppyInstance.on('file-added', (file) => {
      file.meta.sectionId = '353353'; // Add any custom metadata
    });

    setUppy(uppyInstance);

    return () => uppyInstance.close();
  }, []);

  if (!uppy) return null;
	return (
        <>
            {uppy && 
                <Dashboard
                    uppy={uppy}
                    open={true}    
            />}
        </>
    )
}

export default Component