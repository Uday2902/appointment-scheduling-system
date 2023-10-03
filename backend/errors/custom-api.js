class CustomAPIError extends Error {

  constructor(message) {
  
    super(message);
    this.isValid = false
  
  }

}

module.exports = CustomAPIError
