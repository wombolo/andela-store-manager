import bcrypt from 'bcrypt';
// import formidable from 'formidable';
import fs from 'fs';

class helpers {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static isNumber(number) {
    return !isNaN(number);
  }

  static validateBodyParamsForUpdating(requestBody) {
    const errors = [];
    // if (!requestBody.id) {
    // Id cannot be missing for update
    // errors.push('Id is missing. Product not created');
    // return errors;
    // }

    if (!requestBody.title) {
      errors.push('Title is missing. Product not created');
    }

    if (!requestBody.description) {
      errors.push('Description is missing. Product not created');
    }

    if (!requestBody.price) {
      errors.push('Price is missing. Product not created');
    } else if (!helpers.isNumber(requestBody.price)) { errors.push('Price is not a number.'); }

    if (!requestBody.quantity) {
      errors.push('Quantity is missing. Product not created');
    } else if (!helpers.isNumber(requestBody.quantity)) { errors.push('Price is not a number.'); }

    if (errors.length >= 4) { return errors; }
    return false;
  }

  static validateBodyParamsForCreating(requestBody) {
    const errors = [];
    if (!requestBody.title) {
      errors.push('Title is missing. Product not created');
    }

    if (!requestBody.description) {
      errors.push('Description is missing. Product not created');
    }

    if (!requestBody.price) {
      errors.push('Price is missing. Product not created');
    } else if (!helpers.isNumber(requestBody.price)) { errors.push('Price is not a number.'); }

    if (!requestBody.quantity) {
      errors.push('Quantity is missing. Product not created');
    } else if (!helpers.isNumber(requestBody.quantity)) { errors.push('Price is not a number.'); }

    if (errors.length > 0) { return errors; }
    return false;
  }

  static uploadImageInForms(requestBodyImage, folderName = 'products') {
    // const form = new formidable.IncomingForm();

    // form.parse(requestBodyImage, (err, fields, files) => {
    // console.log('1st');
    const fileSize = requestBodyImage.size;
    console.log('requestBodyImage: ', requestBodyImage);
    const fileType = requestBodyImage.type.toLowerCase();

    // If file is too large or file type is unsupported
    if (fileSize < 250000 || fileType === 'image/png' || fileType === 'image/jpg') {
      const oldpath = requestBodyImage.path;
      const newpath = `${__dirname}../../../frontend/assets/img/${folderName}/${requestBodyImage.name}`;

      console.log('newpath: ', newpath);

      fs.rename(oldpath, newpath, (errr) => {
        if (errr) return null;
        return newpath;
      });
    } else {
      console.log('hereIns');
      return { error: 'file is too large or file is unsupported' };
    }

    // });
  }
}

export default helpers;
