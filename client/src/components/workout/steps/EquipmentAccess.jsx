import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const EquipmentAccess = ({ formData, handleInputChange, errors }) => {
  return (
    <FormControl component="fieldset" error={!!errors.gymAccess}>
      <FormLabel component="legend">Do you have access to a gym?</FormLabel>
      <RadioGroup
        value={formData.gymAccess}
        onChange={handleInputChange("gymAccess")}
      >
        <FormControlLabel
          value="full-gym"
          control={<Radio />}
          label="Yes, full gym access"
        />
        <FormControlLabel
          value="home-gym"
          control={<Radio />}
          label="Home gym equipment"
        />
        <FormControlLabel
          value="none"
          control={<Radio />}
          label="No equipment"
        />
      </RadioGroup>
      {errors.gymAccess && <FormHelperText>{errors.gymAccess}</FormHelperText>}
    </FormControl>
  );
};

export default EquipmentAccess;
