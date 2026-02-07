class ApiResponse {

  /**
   * Success Response (200 default)
   * Used for: GET, PUT, PATCH, DELETE success
   */
  static success(res, message = "Request Successful", data = {}, status = 200) {
    return res.status(status).json({
      success: true,   
      message,         
      data,            
    });
  }

  /**
   * Generic Error Response (500 default)
   * Used for: server errors, unexpected failures
   */
  static error(res, message = "Something went wrong", status = 500, errors = null) {
    return res.status(status).json({
      success: false,  
      message,         
      errors,          
    });
  }

  /**
   * Created Response (201)
   * Used for: POST when new resource created
   */
  static created(res, message = "Created successfully", data = {}) {
    return this.success(res, message, data, 201);
  }

  /**
   * No Content Response (204)
   * Used for: DELETE success or empty response
   */
  static noContent(res) {
    return res.status(204).send(); 
  }

  /**
   * Bad Request (400)
   * Used for: missing fields, invalid input format
   */
  static badRequest(res, message = "Bad request", errors = null) {
    return this.error(res, message, 400, errors);
  }

  /**
   * Unauthorized (401)
   * Used for: invalid token, not logged in
   */
  static unauthorized(res, message = "Unauthorized") {
    return this.error(res, message, 401);
  }

  /**
   * Forbidden (403)
   * Used for: logged in but no permission (role restriction)
   */
  static forbidden(res, message = "Forbidden") {
    return this.error(res, message, 403);
  }

  /**
   * Not Found (404)
   * Used for: resource does not exist (user, product, etc.)
   */
  static notFound(res, message = "Not found") {
    return this.error(res, message, 404);
  }

  /**
   * Conflict (409)
   * Used for: duplicate data (email already exists, etc.)
   */
  static conflict(res, message = "Conflict") {
    return this.error(res, message, 409);
  }

  /**
   * Validation Error (422)
   * Used for: form validation failures
   */
  static validation(res, message = "Validation failed", errors = []) {
    return this.error(res, message, 422, errors);
  }
}

module.exports = ApiResponse;
