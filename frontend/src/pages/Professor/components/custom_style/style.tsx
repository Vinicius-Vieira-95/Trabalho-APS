import { styled } from '@mui/system';
import { Box, Button, TableCell } from '@mui/material';


export const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    width: '8rem',
    height: '2rem',
};

// Estilizando o Box e TableCell
export const CustomBox = styled(Box)({
    borderRadius: '16px',
    backgroundColor: '#DAF8E6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const CustomTableCell = styled(TableCell)({
    color: '#1A8245',
    textAlign: 'center',
});

export const CustomButton = styled(Button)({
    borderRadius: '30px',
    justifyContent: 'center',
    alignItems: 'center'
});
