import { Box, Typography, Button, Paper } from '@mui/material';
import { useAppDispatch } from '../store/store';
import { setOpenDeleteModal } from '../layout/uiSlice';

interface Props {
  message?: string;
  handleYesAction: (
    id: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '8px',
  p: 4,
};
const ModalComponent = ({
  message = 'Are you Sure?',
  handleYesAction,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <Paper elevation={4}>
      <Box sx={style}>
        <Typography
          id='modalComponent'
          variant='h4'
          component='h2'
          sx={{ textAlign: 'center', mb: 4 }}
        >
          {message}
        </Typography>
        <Box
          display={'flex'}
          justifyContent={'space-around'}
          alignItems={'center'}
        >
          <Button
            color='error'
            variant='contained'
            size='large'
            onClick={(id) => handleYesAction(id)}
          >
            Yes
          </Button>
          <Button
            color='success'
            variant='contained'
            size='large'
            onClick={() => dispatch(setOpenDeleteModal(false))}
          >
            No
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
export default ModalComponent;
