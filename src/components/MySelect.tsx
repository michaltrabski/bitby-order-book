import * as React from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import { CodesList } from "../App";

interface Props {
  codesList: CodesList;
  code: string;
  changeCode: (newCode: string) => void;
}
export default function MySelect(props: Props) {
  const { code, codesList } = props;

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    props.changeCode(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">CodesList</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={code}
          label="CodesList"
          onChange={handleChange}
        >
          {codesList.map((codeItem) => (
            <MenuItem value={codeItem}>{codeItem}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
