declare const window : any;
declare const document : any;
declare const action : any;
declare const fetch : Function;
declare const Headers : any;
declare const BASE_URL : any;


async function performAction() {
  const body : any = {};
  const params : any = {};
  const headers : any = new Headers();
  let url : string = action.url;


  for (let field in action.bodyFields) {
    if (action.bodyFields[field].isArray) {
      body[field] = document
        .querySelectorAll(`input[name=body-${field}]`)
        .map((input : any) => input.value);
    } else {
      body[field] = document.querySelector(`input[name=body-${field}]`).value;
    }
  }

  for (let param in action.queryParams) {
    if (action.queryParams[param].isArray) {
      params[param] = document
        .querySelectorAll(`input[name=query-${param}]`)
        .map((input : any) => input.value);
    } else {
      let value = document.querySelector(`input[name=query-${param}]`).value;

      if (url.indexOf(`/:${param}`) > -1) {
        url = url.replace(`:${param}`, value);
      } else {
        params[param] = value;
      }
    }
  }

  headers.append('Content-Type', 'application/json');

  for (let header of action.headers) {
    headers.append(header, document.querySelector(`input[name=header-${header}]`).value);
  }

  const options : any = {
    method: action.method.toUpperCase(),
    headers: headers
  };

  if (options.method != 'GET' && options.method != 'HEAD') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(BASE_URL + url, options);

  document.querySelector('#status').innerHTML = `Status: ${response.status} ${response.statusText}`;
  document.querySelector('#code').innerHTML = JSON.stringify(await response.json(), null, 4);
}
