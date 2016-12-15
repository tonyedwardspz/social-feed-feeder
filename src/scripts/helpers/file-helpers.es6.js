'use strict';

/**
* Adds  a listener for the post attachment file inputs change event
*/
let setupAttachmentChangeListener = () => {
  console.log('[Attachment] Setup change listener');
  app.shell.addEventListener('change', e => {
    if (e.target.id === 'attachment') {
      if (e.target.files[0]){
        displayImagePreview(e.target.files[0]);
      }
    }
  });
};

/**
* Updates the image preview of a post. Called when an image is selected using
* the file picker.
* @param {String} file The image to preview
*/
let displayImagePreview = (file) => {
  let image = readImageFile(file, (image) => {
    if (image){
      document.getElementById('image-preview').src = image;
    } else {
      document.getElementById('image-preview').src =
        'placeholder-image-not-available.jpg';
    }
  });
};

/**
* Takes the passed string and reads the image for displaying in the image
* preview on a post screen.
* @param {String} file The file to read in
* @callback Update the dom with the read file
*/
let readImageFile = (file, cb = null) => {
  try {
    var reader = new FileReader();
    reader.onload = (e) => {
      cb(e.target.result);
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.log('There was an issue getting the image', error);
    cb(null);
  }
};
