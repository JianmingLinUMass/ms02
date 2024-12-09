class Base64Converter {
    constructor() {
      // Nothing interesting at the moment.
    }
  
    async convertFileToBase64(blob) {
      let buffer = Buffer.from(await blob.arrayBuffer());
      // return "data:" + blob.type + ';base64,' + buffer.toString('base64');
      return buffer.toString('base64');
    }
  
    convertBase64ToFile(base64, mimetype, filename = "unknown-name") {
      try {
        // atob() is used to convert base64 encoded string to byte string. This
        // is needed to create a blob from the base64 string. It is included in
        // the browser's window object which is why it is not imported.
        const byteString = atob(base64);
  
        // The next two lines create a byte array from the byte string. This is
        // needed to create a blob from the byte array. The ArrayBuffer and
        // Uint8Array are used for this.
        const buffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(buffer);
  
        // The for loop iterates through each character in the byte string and
        // adds it to the Uint8Array. This is needed to create a blob from the
        // Uint8Array.
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
  
        // The Blob constructor is used to create a blob from the Uint8Array.
        const blob = new Blob([uint8Array], { type: mimetype });
  
        // The File constructor is used to create a file from the blob.
        const file = new File([blob], filename, { type: mimetype });
  
        // Resolve the promise with the file.
        return file;
      } catch (error) {
        throw error;
      }
    }
  }
  
module.exports = Base64Converter;