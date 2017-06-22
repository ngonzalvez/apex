import {Router} from 'express';


class RequestHandler {
  private fn : any;

  constructor(
    endpoint : any,
    methodName : string,
    httpVerb : string,
    url : string
  ) {
    this.fn = endpoint[methodName].bind(endpoint);

    const handler : any = this.handle = this.handle.bind(this);
    const validations = endpoint[methodName].validations || {};

    handler.description = endpoint[methodName].description || 'No description available.';
    handler.actionName = methodName || 'N/A';
    handler.requiredScope = endpoint[methodName].requiredScope || null;
    handler.errorMessage = endpoint[methodName].errorMessage || null;
    handler.headers = endpoint[methodName].headers || [];
    handler.httpVerb = httpVerb || 'N/A';
    handler.url = url ? url.replace(/\/$/, '') : '';
    handler.queryParams = validations.query || null;
    handler.bodyFields = validations.body || null;

    if (handler.requiredScope) {
      handler.headers.push('Authorization');
    }
  }

  /**
   * Handle the incomming request.
   */
  public handle(req : any, res : any, next : Function) : void {

    try {
      // Access control.
      if (this.fn.requiredScope) {
        if (req.user === undefined)
          return res.boom.unauthorized();

        if (!req.user.scopes.includes(this.fn.requiredScope))
          return res.boom.forbidden();
      }

      const validationError = (
        this.validateQueryParams(req.params) || this.validateBodyFields(req.body)
      );

      if (validationError)
        return res.boom.badRequest(validationError);

      this.fn(
        req,
        (data : any) => res.send(data || {}),
        res.boom,
        next
      );
    } catch (err) {
      console.error(err);
      res.boom.internal(this.fn.errorMessage);
    }
  }

  /**
   * Validate the query-string params.
   */
  private validateQueryParams(params : any) : any {
    const validations = this.fn.validations;

    if (validations) {
      for (let param in validations.query) {
        let  error = this.validate(
          param,
          params[param],
          validations.query[param]
        );

        if (error)
          return error;
      }
    }
  }

  /**
   * Validate the body of the request.
   */
  private validateBodyFields(fields : any) : any {
    const validations = this.fn.validations;

    if (validations) {
      for (let field in validations.body) {
        let  error = this.validate(
          field,
          fields[field],
          validations.body[field]
        );

        if (error)
          return error;
      }
    }
  }

  /**
   * Validate the given value according to the given options.
   */
  private validate(name : string, value : any, options : any) : any {
    // Required fields.
    if (options.required && value === undefined) {
      return `Query param "${name}" is required`;
    }

    // Skip not required fields.
    if (!options.required && value === undefined)
      return null;

    // Type validation.
    if (options.type && (typeof value !== options.type)) {
      return `Query param "${name}" must be of type "${options.type}"`
    }

    return null;
  }
}

export function registerEndpoint(
  httpVerb : string,
  url : string,
  endpoint : any,
  methodName : string
) : any {
  const ctrl = new RequestHandler(endpoint, methodName, httpVerb, url);

  endpoint.routes = endpoint.routes || Router();
  endpoint.routes[httpVerb](url, ctrl.handle);
}
