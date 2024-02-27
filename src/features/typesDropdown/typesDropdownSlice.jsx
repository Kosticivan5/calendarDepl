import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: "Направление",
  isOpen: false,
  typeValue: "",
};

const typesDropdownSlice = createSlice({
  name: "typesDropdown",
  initialState,
  reducers: {
    initialDirectionRender: (state, action) => {
      state.info = action.payload;
      const dropDownTypes = new Map(
        Object.entries({
          "Персональная эффективность": "person_effect",
          "Лидерские навыки": "lead_skill",
          "Digital & IT": "digital_it",
          "Проектные и продуктовые технологии": "design_prod_tech",
          "Банки и финансы": "bank_finance",
          Клиентоцентричность: "customer_orient",
        })
      );
      if (dropDownTypes.has(action.payload)) {
        const type = dropDownTypes.get(action.payload);
        state.typeValue = type;
      }
    },
    toggleDropdown: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    selectType: (state, action) => {
      state.info = action.payload;
      state.isOpen = !state.isOpen;
      const dropDownTypes = new Map(
        Object.entries({
          "Персональная эффективность": "person_effect",
          "Лидерские навыки": "lead_skill",
          "Digital & IT": "digital_it",
          "Проектные и продуктовые технологии": "design_prod_tech",
          "Банки и финансы": "bank_finance",
          Клиентоцентричность: "customer_orient",
        })
      );
      if (dropDownTypes.has(action.payload)) {
        const type = dropDownTypes.get(action.payload);
        state.typeValue = type;
      }
    },
    resetType: (state) => initialState,
  },
});

export const { toggleDropdown, selectType, resetType, initialDirectionRender } =
  typesDropdownSlice.actions;

export default typesDropdownSlice.reducer;
