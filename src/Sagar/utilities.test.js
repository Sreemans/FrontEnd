import {
  DATE,
  INSPECTION_STATUS,
  SQRFT,
  CMS_GENERAL,
  inspectionTypeTranslation,
  translateTieDownType,
  feetToHydrantGetter,
  translateYesNo,
  translateSSN,
  translateKeyedValue,
  translateIdentifer,
  getCountyCode,
  translateByStateLineCompany,
} from "./utilities";

describe("testing utilities", () => {
  it("testing translateDate", () => {
    expect(DATE("-")).toEqual(null);
    expect(DATE("12/12/20")).toBe("12/20/12");
  });
  it("testing inspection status", () => {
    const obj = {
      A: "Acceptable",
      C: "Cancelled",
      E: "Error",
      L: "Accepted with conditions",
      N: "Unable to locate",
      O: "Ordered",
      X: "Ordered, not received",
      B: "Inspection not ordered",
      R: "Reorder",
      S: "Geo Code error",
      U: "Unacceptable",
      W: "Waived",
      K: "Unable to work",
      D: "D",
    };
    Object.keys(obj).forEach((s) => {
      expect(INSPECTION_STATUS(s)).toBe(obj[s]);
    });
  });
  it("SQRFT ", () => {
    expect(SQRFT()).toBe(null);
    expect(SQRFT(10)).toBe("10 Sq. Ft");
  });
  it("CMS_GENERAL", () => {
    expect(
      CMS_GENERAL("-", {
        getGeneralDetails: () => ({ ALNC_DESC: "" }),
      })
    ).toBe("-");
    expect(
      CMS_GENERAL("value", {
        getGeneralDetails: () => ({ ALNC_DESC: "DESC" }),
      })
    ).toBe("DESC");

    expect(
      CMS_GENERAL("value", {
        getGeneralDetails: () => "",
      })
    ).toBe("value");
  });
  it("inspectionTypeTranslation ", () => {
    const obj = {
      V: "Virtual",
      M: "Interior",
      E: "Exterior",
      F: "Exterior Full",
      H: "High Value",
      B: "Brush Only",
      P: "Exterior Full & Brush",
      G: "High Value & Brush",
      Y: "Exterior Full & Yard&Garden",
      X: "High Value & Yard&Garden",
      Def: "Def",
    };
    Object.keys(obj).forEach((s) => {
      expect(inspectionTypeTranslation(s)).toBe(obj[s]);
    });
  });
  it("translateTieDownType ", () => {
    const obj = {
      CH: "Chassis",
      FU: "Full",
      NO: "None",
      D: "D",
    };
    Object.keys(obj).forEach((s) => {
      expect(translateTieDownType(s)).toBe(obj[s]);
    });
  });
  it("feetToHydrantGetter", () => {
    const obj = {
      250: "1 - 500 feet",
      750: "501 - 1000 feet",
      1250: "1001 - 1500 feet",
      1750: "1501 - 2000 feet",
      2001: "over 2000 feet",
      0: "0",
    };
    Object.keys(obj).forEach((s) => {
      expect(feetToHydrantGetter(s)).toBe(obj[s]);
    });
  });
  it("translateYesNo", () => {
    const obj = {
      Y: "Yes",
      N: "No",
      X: "X",
    };
    Object.keys(obj).forEach((s) => {
      expect(translateYesNo(s)).toBe(obj[s]);
    });
  });
  it("translateKeyedValue", () => {
    expect(
      translateKeyedValue(
        { KeyedValue: [{ KeyName: "C", KeyValue: ["V"] }] },
        "C"
      )
    ).toBe("V");
  });
  it("translateIdentifer", () => {
    expect(
      translateIdentifer(
        {
          Identifier: [
            {
              IdTypeCd: {
                SrcCd: "ID",
              },
              Id: "123",
            },
          ],
        },
        "ID"
      )
    ).toBe("123");
  });
  it("getCountyCode", () => {
    expect(getCountyCode("AL", "009")).toBe("CHAMBERS");
  });
  it("translateByStateLineCompany", () => {
    translateByStateLineCompany(
      {
        code: [
          {
            state: "AL",
          },
        ],
      },

      [
        {
          state: "AL",
        },
      ],
      [
        {
          state: "AL",
        },
      ]
    );
  });
});
