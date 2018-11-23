import {flatten} from 'lodash';

export const obtainGoogleSuggest = (options) => {
  const answer = {};
  const {address_components} = options.gmaps;
  const types = flatten(address_components.map(a => a.types));

  for (let i in address_components) {
    let data = address_components[i];
    let locTypes = data.types;

    answer.lan = options.location.lat;
    answer.lng = options.location.lng;

    if (locTypes.includes("street_number")) {
      answer.house = data.long_name;
    }
    if (locTypes.includes("route")) {
      answer.street = data.long_name;
    }
    if (locTypes.includes("administrative_area_level_2") && locTypes.includes("political")) {
      answer.city = data.long_name;
    }
    if (locTypes.includes("political") && locTypes.includes("locality")) {
      answer.city = data.long_name;
    }
    if (locTypes.includes("country") && locTypes.includes("political")) {
      answer.country = data.long_name;
    }
    if (locTypes.includes("postal_code")) {
      answer.postal = data.long_name;
    }
  }

  return answer;
}

export const locationLabel = (options) => {
  const sep = s => s ? ", " : "";
  let str = "";
  let meta = options || {}
  if (meta.street)
    str += meta.street;
  if (meta.house)
    str += `${sep(str)}${meta.house}`;
  if (meta.city)
    str += `${sep(str)}${meta.city}`;
  if (meta.country)
    str += `${sep(str)}${meta.country}`;
  return str;
}
