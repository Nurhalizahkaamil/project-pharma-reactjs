import { IconButton, InputAdornment, Stack, SxProps, TextField } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useState } from 'react';

interface SearchProps {
  fullWidth?: boolean;
  size: 'small';
  sx?: SxProps;
}

const Search = ({ fullWidth, size }: SearchProps) => {
  const [value, setValue] = useState('');
  return (
    <Stack
      direction="row"
      sx={{
        position: 'relative',
        alignItems: 'right',
        justifyContent: 'right',
        width: 1,
      }}
    >
      <TextField
        fullWidth={fullWidth}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for something"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit" sx={{ padding: 0 }}>
                <IconifyIcon
                  icon="mingcute:search-line"
                  color="text.secondary"
                  width={20} // Ubah ukuran ikon
                  height={20}
                />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            '& .MuiFilledInput-input': {
              fontSize: '14px', // Ubah ukuran teks input
            },
          },
        }}
        inputProps={{
          style: { padding: '10px 0', fontSize: '14px' }, // Ubah ukuran teks placeholder di sini
        }}
        variant="filled"
        size={size}
        sx={{
          '& .MuiFilledInput-root': {
            borderRadius: 40,
            paddingLeft: '10px', // Menambah padding kiri agar teks tidak terlalu dekat dengan ikon
          },
          '&::placeholder': {
            fontSize: '14px',
          },
        }}
      />
    </Stack>
  );
};

export default Search;
