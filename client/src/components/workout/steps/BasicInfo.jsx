import { Box, TextField } from "@mui/material";
import React from "react";

const BasicInfo = ({
  formData,
  setFormData,
  calculateTotalInches,
  handleInputChange,
  errors,
}) => {
  return (
    <>
      <TextField
        label="Age"
        type="number"
        value={formData.age}
        onChange={handleInputChange("age")}
        error={!!errors.age}
        helperText={errors.age}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Weight (lbs)"
        type="number"
        value={formData.weight}
        onChange={handleInputChange("weight")}
        error={!!errors.weight}
        helperText={errors.weight}
        margin="normal"
        fullWidth
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <TextField
          label="Height (ft)"
          type="number"
          margin="normal"
          value={formData.height.ft}
          onChange={(e) => {
            const newFt = e.target.value;
            const totalInches = calculateTotalInches(newFt, formData.height.in);
            setFormData({
              ...formData,
              height: {
                ft: newFt,
                in: formData.height.in,
              },
              heightInInches: totalInches,
            });
          }}
          error={!!errors.height}
          helperText={errors.height}
          slotProps={{ input: { inputProps: { min: 3, max: 8 } } }}
          fullWidth
        />
        <TextField
          label="Height (in)"
          type="number"
          margin="normal"
          value={formData.height.in}
          onChange={(e) => {
            const newIn = e.target.value;
            const totalInches = calculateTotalInches(formData.height.ft, newIn);
            setFormData({
              ...formData,
              height: {
                ft: formData.height.ft,
                in: newIn,
              },
              heightInInches: totalInches,
            });
          }}
          error={!!errors.height}
          slotProps={{ input: { inputProps: { min: 0, max: 11 } } }}
          fullWidth
        />
      </Box>
    </>
  );
};

export default BasicInfo;
