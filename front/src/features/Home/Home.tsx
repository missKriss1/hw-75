import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDecode, selectEncode } from './homeSlice';
import { encodeFetch, decodeFetch } from './homeThunk';

const Home = () => {
  const encode = useAppSelector(selectEncode);
  const decode = useAppSelector(selectDecode);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    decodeText: '',
    encodeText: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (encode) {
      setForm((prevState) => ({ ...prevState, encodeText: encode }));
    }
  }, [encode]);

  useEffect(() => {
    if (decode) {
      setForm((prevState) => ({ ...prevState, decodeText: decode }));
    }
  }, [decode]);

  const handleEncodeClick = async () => {
    setIsLoading(true);
    const messageData = {
      message: form.decodeText,
      password: form.password,
    };
    await dispatch(encodeFetch(messageData));
    setIsLoading(false);
  };

  const handleDecodeClick = async () => {
    setIsLoading(true);
    const messageData = {
      message: form.encodeText,
      password: form.password,
    };
    await dispatch(decodeFetch(messageData));
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Typography variant="h4" gutterBottom>
          Cipher Vigenere
        </Typography>

        <Grid>
          <TextField
            name="decodeText"
            value={form.decodeText}
            onChange={handleInputChange}
            fullWidth
            label="Enter text to encode"
          />
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid>
            <TextField
              type="text"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              fullWidth
              label="Password"
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              sx={{ marginRight: 2 }}
              onClick={handleEncodeClick}
              disabled={!form.password || !form.decodeText || isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <ArrowDownwardIcon />
              )}
            </Button>
            <Button
              variant="contained"
              onClick={handleDecodeClick}
              disabled={!form.password || !form.encodeText || isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <ArrowUpwardIcon />
              )}
            </Button>
          </Grid>
        </Grid>

        <Grid>
          <TextField
            name="encodeText"
            value={form.encodeText}
            onChange={handleInputChange}
            fullWidth
            label="Enter encoded text"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
