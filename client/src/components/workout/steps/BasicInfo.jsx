import { Box } from "@mui/material";
import { m } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { Field } from "../../../common/form";
import { Form } from "../../../common/form/form-provider";

const BasicInfo = ({ formData, setFormData, calculateTotalInches, errors }) => {
  const methods = useForm({
    defaultValues: {
      age: formData.age || "",
      weight: formData.weight || "",
      heightFt: formData.height.ft || "",
      heightIn: formData.height.in || "",
    },
  });

  const { watch } = methods;

  // Watch height changes to update parent state
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.includes("height")) {
        const totalInches = calculateTotalInches(
          value.heightFt,
          value.heightIn
        );
        setFormData((prev) => ({
          ...prev,
          height: {
            ft: value.heightFt,
            in: value.heightIn,
          },
          heightInInches: totalInches,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value[name],
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form methods={methods}>
        <Box sx={{ display: "grid", gap: 3 }}>
          <Field.Text
            name="age"
            label="Age"
            type="number"
            helperText={errors.age}
            error={!!errors.age}
          />

          <Field.Text
            name="weight"
            label="Weight (lbs)"
            type="number"
            helperText={errors.weight}
            error={!!errors.weight}
          />

          <Box sx={{ display: "flex", gap: 3 }}>
            <Field.Text
              name="heightFt"
              label="Height (ft)"
              type="number"
              helperText={errors.height}
              error={!!errors.height}
              InputProps={{ inputProps: { min: 3, max: 8 } }}
            />

            <Field.Text
              name="heightIn"
              label="Height (in)"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 11 } }}
            />
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

export default BasicInfo;
