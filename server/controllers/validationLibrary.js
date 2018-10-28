class validationLibrary {
  static isNumber(number) {
    return !isNaN(number);
  }

  static validateBodyParamsForUpdating(requestBody) {
    const errors = [];
    if (!requestBody.id) {
      // Id cannot be missing for update
      errors.push('Id is missing. Product not created');
      return errors;
    }

    if (!requestBody.title) {
      errors.push('Title is missing. Product not created');
    }

    if (!requestBody.description) {
      errors.push('Description is missing. Product not created');
    }

    if (!requestBody.price) {
      errors.push('Price is missing. Product not created');
    } else if (!validationLibrary.isNumber(requestBody.price)) { errors.push('Price is not a number.'); }

    if (!requestBody.quantity) {
      errors.push('Quantity is missing. Product not created');
    } else if (!validationLibrary.isNumber(requestBody.quantity)) { errors.push('Price is not a number.'); }


    if (errors.length >= 4) // If all is empty
    { return errors; }

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
    } else if (!validationLibrary.isNumber(requestBody.price)) { errors.push('Price is not a number.'); }

    if (!requestBody.quantity) {
      errors.push('Quantity is missing. Product not created');
    } else if (!validationLibrary.isNumber(requestBody.quantity)) { errors.push('Price is not a number.'); }


    if (errors.length > 0) // If 1 parameter is empty
    { return errors; }

    return false;
  }

}

export default validationLibrary;
