import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import memoApi from '../api/memoApi'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createMemo = async() => {
    setLoading(true);
    try {
      const res = await memoApi.create();
      console.log(res);
      navigate(`/memo/${res._id}`);
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <LoadingButton variant="outlined" color="success" loading={loading} onClick={createMemo}>最初のメモを作成</LoadingButton>
    </Box>
  )
}

export default Home