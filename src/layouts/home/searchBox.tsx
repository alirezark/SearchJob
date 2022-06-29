import React, { useState } from 'react';
import { Box, Stack, Grid, Typography } from '@mui/material';
import SearchInput from '@/components/searchInput';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';

const SearchBox = () => {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnClick = () => {
    if (q.length < 2) {
      return;
    }
    setLoading(true);
    router.push('/search/' + q);
  };

  return (
    <Box
      sx={{
        p: ['24px 16px 16px', 4],
        background: '#D8F4EF',
        width: 770,
        maxWidth: '90%',
        minHeight: 113,
        boxSizing: 'border-box',
        borderRadius: 4,
        mx: 'auto',
        boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid alignItems="center" justifyContent="center" spacing={[2, 4]} container>
        <Grid item xs={12} sm>
          <SearchInput
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleOnClick();
              }
            }}
          />
        </Grid>
        <Grid item sx={{ textAlign: 'center' }}>
          <LoadingButton
            variant="contained"
            color="primary"
            size="small"
            loading={loading}
            sx={{ fontWeight: 700, minWidth: 120, borderRadius: 2, height: 40 }}
            onClick={handleOnClick}
          >
            جستجوی شغل
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBox;
