import React from 'react';
import { Box, Typography, Container, Divider, Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useQueryClient } from 'react-query';
import { useLoadNotification, useSeeNotification } from '@/services/notification.service';

function createData(title, description, date, isNew) {
  return {
    title,
    description,
    date,
    isNew,
  };
}

function Row(props) {
  const queryClient = useQueryClient();
  const { mutate: setSeen, isLoading } = useSeeNotification({
    onSuccess: () => {
      queryClient.invalidateQueries('notifications');
      queryClient.invalidateQueries('notificationCount');
    },
  });
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const openRow = () => {
    if (!open && !row.seen) {
      setSeen(row.id);
    }
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }} onClick={() => openRow()}>
        <TableCell>
          {row.title}
          {!row.seen && (
            <Box
              sx={{
                display: 'inline',
                color: 'red',
              }}
            >
              *
            </Box>
          )}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 300 }}>
          {row.description}
        </TableCell>
        {/*<TableCell sx={{ maxWidth: 100 }} align="right">*/}
        {/*  {row.date}*/}
        {/*</TableCell>*/}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: '#f6f6f6', border: 'none' }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box py={2}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" gutterBottom sx={{ fontWeight: 500 }}>
                  عنوان:
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {row.title}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Typography variant="body2" gutterBottom sx={{ fontWeight: 500 }}>
                  متن:
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {row.description}
                </Typography>
              </Stack>

              {/*<Stack direction="row" spacing={1} sx={{ mt: 1 }}>*/}
              {/*  <Typography variant="body3" gutterBottom sx={{ fontWeight: 500 }}>*/}
              {/*    تاریخ:*/}
              {/*  </Typography>*/}
              {/*  <Typography variant="body2" gutterBottom>*/}
              {/*    {row.date}*/}
              {/*  </Typography>*/}
              {/*</Stack>*/}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Notifications() {
  const { data: notifications } = useLoadNotification({});
  console.log(notifications);
  return (
    <Container maxWidth="md" sx={{ m: 1 }}>
      <Typography variant="h4" sx={{ py: 2, fontWeight: 500 }}>
        اطلاعیه ها
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ '&& > *': { background: '#eee', borderBottomColor: '#aaa', fontWeight: 700 } }}>
              <TableCell>عنوان</TableCell>
              <TableCell>متن</TableCell>
              {/*<TableCell align="right">تاریخ</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications?.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Notifications;
