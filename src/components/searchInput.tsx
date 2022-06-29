import React from 'react';
import { styled } from '@mui/material/styles';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export type SearchInputProps = {
  onChange: any;
  onKeyDown: any;
  value: string;
  label?: string;
  bordered?: boolean;
};

const SearchInput = styled((props: SearchInputProps) => (
  <TextField
    variant="outlined"
    onChange={props.onChange}
    placeholder="به دنبال چه شغلی هستید؟"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    {...props}
  />
))(({ bordered }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    background: '#fff',
    borderRadius: '8px',
  },
  '& fieldset': {
    border: bordered ? '1px solid rgba(0, 0, 0, 0.23)' : 'none',
  },
  '& input': {
    height: '1em',
  },
  '& input::placeholder': {
    fontWeight: 700,
  },
}));

export default SearchInput;
