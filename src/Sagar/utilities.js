import get from "lodash/get";
// import CountyCodes from '~shared/non_cms_codes/counties';
const CountyCodes = {
  "": {},
  undefined: {},
  null: {},
  AL: {
    "001": "AUTAUGA",
    "002": "BALDWIN",
    "003": "BARBOUR",
    "004": "BIBB",
    "005": "BLOUNT",
    "006": "BULLOCK",
    "007": "BUTLER",
    "008": "CALHOUN",
    "009": "CHAMBERS",
  },
};
export const translateDate = (date) => {
  if (!date || date === "-") {
    return null;
  }

  const dateSplit = date.split(/-|\//);

  return `${dateSplit[1]}/${dateSplit[2].substring(0, 2)}/${dateSplit[0]}`;
};

export const translateInspectionStatus = (status) => {
  switch (status) { 
    case "A":
      return "Acceptable";
    case "C":
      return "Cancelled";
    case "E":
      return "Error";
    case "L":
      return "Accepted with conditions";
    case "N":
      return "Unable to locate";
    case "O":
      return "Ordered";
    case "X":
      return "Ordered, not received";
    case "B":
      return "Inspection not ordered";
    case "R":
      return "Reorder";
    case "S":
      return "Geo Code error";
    case "U":
      return "Unacceptable";
    case "W":
      return "Waived";
    case "K":
      return "Unable to work";
    default:
      return status;
  }
};

export const squarefoot = (value) => {
  if (!value) {
    return null;
  }
  return `${value} Sq. Ft`;
};

export const cmsGeneralHomeDetailsTranslation = (value, cmsMapper) => {
  if (value === "-") {
    return value;
  }
  const cmsObject = cmsMapper.getGeneralDetails(value);

  if (cmsObject) {
    return cmsMapper.getGeneralDetails(value).ALNC_DESC;
  }

  return value;
};

export const inspectionTypeTranslation = (inspectionType) => {
  switch (inspectionType) {
    case "V":
      return "Virtual";
    case "M":
      return "Interior";
    case "E":
      return "Exterior";
    case "F":
      return "Exterior Full";
    case "H":
      return "High Value";
    case "B":
      return "Brush Only";
    case "P":
      return "Exterior Full & Brush";
    case "G":
      return "High Value & Brush";
    case "Y":
      return "Exterior Full & Yard&Garden";
    case "X":
      return "High Value & Yard&Garden";
    default:
      return inspectionType;
  }
};

export const translateTieDownType = (tieDownType) => {
  switch (tieDownType) {
    case "CH":
      return "Chassis";
    case "FU":
      return "Full";
    case "NO":
      return "None";
    default:
      return tieDownType;
  }
};

export const feetToHydrantGetter = (feet) => {
  switch (`${feet}`) {
    case "250":
      return "1 - 500 feet";
    case "750":
      return "501 - 1000 feet";
    case "1250":
      return "1001 - 1500 feet";
    case "1750":
      return "1501 - 2000 feet";
    case "2001":
      return "over 2000 feet";
    default:
      return feet;
  }
};

export const translateYesNo = (value) => {
  switch (value) {
    case "Y":
      return "Yes";
    case "N":
      return "No";
    default:
      return value;
  }
};

export function translateSSN(value) {
  const pattern = /\d{5}(\d{4})/;
  if (pattern.test(value)) {
    return value.replace(pattern, "***-**-$1");
  }
  return null;
}

export function translateKeyedValue(node, keyName) {
  let keyValue = null;
  const keyedValue = get(node, "KeyedValue", []).find(
    ({ KeyName }) => KeyName === keyName
  );
  if (keyedValue) {
    keyValue = keyedValue.KeyValue[0];
  }
  return keyValue;
}

export function translateIdentifer(node, idType) {
  let value = null;
  const targetIdentifier = get(node, "Identifier", []).find(
    (identifier) => get(identifier, "IdTypeCd.SrcCd") === idType
  );
  if (targetIdentifier) {
    value = targetIdentifier.Id;
  }
  return value;
}

function getScore(configuration, value) {
  if (!configuration || configuration.length === 0) {
    return 1;
  }
  if (configuration.includes(value)) {
    return 2;
  }
  return 0;
}

export function translateByStateLineCompany(translations, metaData, code) {
  let maxScore = 0;
  let description = code;
  get(translations, code, []).forEach((translation) => {
    let score = 0;
    for (const [condition, weightage] of [
      ["state", 128],
      ["line", 64],
      ["company", 32],
      ["product", 2],
    ]) {
      const matchScore = getScore(translation[condition], metaData[condition]);
      if (matchScore === 0) {
        score = 0;
        break;
      }
      score += matchScore * weightage;
    }

    if (score > maxScore) {
      maxScore = score;
      description = translation.value;
    }
  });

  return description;
}

export const DATE = translateDate;
export const INSPECTION_STATUS = translateInspectionStatus;
export const CMS_GENERAL = cmsGeneralHomeDetailsTranslation;
export const SQRFT = squarefoot;

export function getCountyCode(state, county) {
  const insuredState = CountyCodes[state];

  return insuredState && insuredState[county];
}
